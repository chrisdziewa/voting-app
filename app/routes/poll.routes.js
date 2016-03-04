'use strict';
const Poll = require('../models/poll');
const User = require('../models/user');
const _ = require('underscore');
const verifyIp = require('../helpers/ip-helper');
const authenticateRoute = require('../middleware/auth-middleware');

module.exports = function(express, app) {
  let router = express.Router();

  // Get all posts
  router.get('/', (req, res) => {
    Poll.find({}).sort({_id: 'desc'}).exec((err, polls) => {
      if (err) {
        return res.status(500).send('There was an error processing your request');
      } else {
        res.json(polls);
      }
    });
  });

  // Create Poll
  router.post('/', authenticateRoute, (req, res) => {
    let validAttributes = {};
    let currentUser = req.decoded.username;

    if (typeof req.body.choices !== 'object' || req.body.choices.length < 2) {
      return res.status(400).send('A poll must have at least 2 options');
    } else if (typeof req.body.choices !== 'object' || req.body.choices.length > 40) {
      return res.status(400).send('A poll can have a maximum of 40 options');
    } else if (typeof req.body.question !== 'string') {
      return res.status(400).send('Invalid question');
    }

    validAttributes.question = req.body.question.trim();

    let choices = {};

    req.body.choices.forEach((choice) => {
      choices[choice] = 0;
    });

    validAttributes.choices = choices;

    User.findOne({
      username: currentUser
    }, '_id', (err, user) => {
      if (err) {
        return res.status(500).send('An error prevented the server from completing your request');
      } else if (!user) {
        return res.status(500).send('Could not complete your request');
      }
      // Everything is good, create poll and put reference to user
      validAttributes.user_id = user._id;

      let poll = new Poll(validAttributes);
      poll.totalVotes = 0;
      poll.voter_ips = [];
      poll.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(poll);
      });
    });
  });

  // Get single poll
  router.get('/:id', (req, res) => {
    let pollId = req.params.id;

    Poll.findById({
      _id: pollId
    }, (err, poll) => {
      if (err) {
        return res.status(500).send('There was an error completing your request');
      }
      if (!poll) {
        // No poll found
        res.status(404).json({
          message: 'No poll with that id found'
        });
      }
      // Add Username to response
      User.findById(poll.user_id, (err, user) => {
        if (err) {
          return res.status(500).send('There was an error completing your request');
        }

        else if (!user) {
          return res.status(404).send('Could not find user for poll');
        }

        // User found now add it to response and send to user
        // turn query into object
        poll = poll.toJSON();
        poll.author = user.username;
        res.json(poll);
      });
    });
  });

  // Increment an existing poll choice or create a new one with 1 vote
  router.put('/:id', (req, res) => {
    let pollId = req.params.id;
    if (!typeof req.body.choice === 'string' || req.body.choice.trim().length === 0) {
      return res.status(400).send('Invalid data in request');
    }
    Poll.findById(pollId, (err, poll) => {
      if (err) {
        return res.status(500).send('There was an error completing your request');
      }
      if (!poll) {
        return res.status(404).send('No poll exists with that id');
      }
      // Poll found now update it
      let choice = req.body.choice.trim();

      verifyIp().then(response => {
        console.log('Ip ' + response + ' voted');
      });
      let newItem = true;
      Object.keys(poll.choices).forEach((propertyName) => {
        if (propertyName.toLowerCase() === choice.toLowerCase() && newItem) {
          poll.choices[propertyName] = poll.choices[propertyName] + 1;
          newItem = false;
        }
      });
      if (newItem) {
        poll.choices[choice] = 1;
      }

      poll.totalVotes = poll.totalVotes + 1;
      Poll.update({
        _id: pollId
      }, poll, (err, obj) => {
        if (err || obj.n !== 1) {
          return res.status(500).send('Could not cast your vote');
        }

        // Add Username to response
        User.findById(poll.user_id, (err, user) => {
          if (err) {
            return res.status(500).send('There was an error completing your request');
          }

          else if (!user) {
            return res.status(404).send('Could not find user for poll');
          }

          // User found now add it to response and send to user
          // turn query into object
          poll = poll.toJSON();
          poll.author = user.username;

          res.json(poll);
        });
      });
    });
  });

  // Delete a poll
  router.delete('/:id', authenticateRoute, (req, res) => {
    let currentUser = req.decoded.username;
    let pollId = req.params.id;

    User.findOne({
      username: currentUser
    }, '_id' ,(err, user) => {
      if (err) {
        return res.status(500).send('An error prevented your request from being made');
      } else if (!user) {
        return res.status(400).send('Bad data request');
      }
      // User was successfully found, now try to delete item
      Poll.remove({
        _id: pollId,
        user_id: user._id
      }, (err, obj) => {
        if (err) {
          return res.status(500).send('Could not delete poll');
        }
        if (obj.result.n === 0) {
          return res.status(404).send('Poll with that id was not found');
        } else {
          res.send('Poll has been deleted');
        }
      });
    });
  });

  return router;
}
