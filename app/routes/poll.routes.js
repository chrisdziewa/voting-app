'use strict';
const Poll = require('../models/poll');
const _ = require('underscore');

module.exports = function(express, app) {
  let router = express.Router();

  // Get all posts
  router.get('/', (req, res) => {
    Poll.find({}, (err, polls) => {
      if (err) {
        return res.status(500).send('There was an error processing your request');
      }
      else {
        res.json(polls);
      }
    });
  });

  // Create Post
  router.post('/', (req, res) => {
    let validAttributes = {};
    
    if (typeof req.body.choices !== 'object' || req.body.choices.length < 2) {
      return res.status(400).send('A poll must have at least 2 options');
    }
    else if (typeof req.body.choices !== 'object' || req.body.choices.length > 40) {
      return res.status(400).send('A poll can have a maximum of 40 options');
    }

    else if (typeof req.body.question !== 'string') {
      return res.status(400).send('Invalid question');
    }

    validAttributes.question = req.body.question.trim();

    let choices = {};

    req.body.choices.forEach((choice) => {
      choices[choice] = 0;
    });

    validAttributes.choices = choices;

    let poll = new Poll(validAttributes);

    poll.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(poll);
    });
  });

  // Get single poll 
  router.get('/:id', (req, res) => {
    let pollId = req.params.id;

    Poll.findById({_id: pollId}, (err, poll) => {
      if (err) {
        return res.status(500).send('There was an error completing your request');
      }
      if (!poll) {
        // No poll found 
        res.status(404).json({message: 'No poll with that id found'});
      }
        res.json(poll);
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
      if (poll.choices.hasOwnProperty(choice)) {
        poll.choices[choice] = poll.choices[choice] + 1;
      } else {
        poll.choices[choice] = 1;
      }
      Poll.update({_id: pollId}, poll, (err, obj) => {
        if (err || obj.n !== 1) {
          return res.status(500).send('Could not cast your vote');
        } 
        res.json(poll);
      });
    });
  });

  // Delete a poll
  router.delete('/:id', (req, res) => {
    let pollId = req.params.id;

    Poll.remove({_id: pollId}, (err, obj) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Could not delete poll');
      }
      if (obj.result.n === 0) {
        return res.status(404).send('Poll with that id was not found');
      }
      else {
        res.send('Poll has been deleted');
      }
    });
  });

  return router;
}