'use strict';
const User = require('../models/user');
const Poll = require('../models/poll');
const _ = require('underscore');
const authenticateRoute = require('../middleware/auth-middleware');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


// All routes are starting at /api/users/

module.exports = function(express, app) {
  let router = express.Router();

    // => GET /api/users/current (current logged in user)
  router.get('/current', authenticateRoute, (req, res) => {
    let loggedUser = req.decoded;
    User.findOne({username: loggedUser.username}, (err, user) => {
      if (err) {
        return res.status(500).send('There was an error completing your request');
      } else if (!user) {
        return res.status(404).send('No user with that id');
      }
      let currentUser = {
        username: user.username,
        email: user.email,
        _id: user._id,
        bio: user.bio
      };
      res.json(currentUser);
    });
  });

  // => GET /api/users
  router.get('/', (req, res) => {
    User.find({}, (error, users) => {
      if (error) {
        return res.status(500).send('There was an error processing your request');
      }
      if (users) {
        res.send(users);
      } else {
        res.status(404).send('No users were found');
      }
    });
  });

  // Create a new user => POST /api/users
  router.post('/', (req, res) => {
    let validAttributes = _.pick(req.body, 'username', 'email', 'password');
    let newUser = new User(validAttributes);

    newUser.save((error, user) => {
      if (error) {
        // Duplicate database value
        if (error.code == 11000) {
          if (/username/.test(error.message) || /lowercase_name/.test(error.message)) {
            return res.status(422).json({
              success: false,
              message: 'User with that name already exists'
            });
          } else {
            return res.status(422).json({
              success: false,
              message: 'Email is already taken',
              error: error.message
            });
          }
        } else {
          return res.status(500).json({
            success: false,
            message: error
          });
        }
      } else {
        // Prevent password field from being returned in response
        let displayUser = _.pick(user, '_id', 'username', 'email');
        res.json(displayUser);
      }
    });
  });

  // => GET /api/users/:id
  router.get('/:id', authenticateRoute, (req, res) => {
    let userId = req.params.id
    User.findById({
      _id: userId
    }, (err, user) => {
      if (err) {
        return res.status(500).send('Error completing your request');
      } else if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    });
  });

  // => PUT /api/users/:id
  router.put('/:id', authenticateRoute, (req, res) => {
    let userId = req.params.id;
    let validAttributes = _.pick(req.body, 'username', 'email', 'password', 'bio', 'currentPassword');
    User.findById({
      _id: userId
    }, 'username email password bio', (err, user) => {
      if (err) {
        return res.status(500).json({success: false, message: err});
      }
      if (user) {
        // If not the current logged in user
        if (user.username !== req.decoded.username) {
          return res.status(401).send('You may not update other profiles');
        }
        console.log(user);

        let correctPassword = user.comparePassword(validAttributes.currentPassword);
        if (!correctPassword) {
          return res.status(400).json({
            success: false,
            message: 'The password you entered does not match the current password for your account.'
          });
        }

        // If user found, set only the new attributes
        if (validAttributes.username) user.username = validAttributes.username;
        if (validAttributes.email) user.email = validAttributes.email;
        if (validAttributes.password) user.password = validAttributes.password;
        if (validAttributes.bio) user.bio = validAttributes.bio;
      } else {
        return res.status(404).send('Could not find user with that id');
      }

      // All is well, now save user
      user.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Could not update user');
        } else {
          // create new token
          let token = jwt.sign({
            username: user.username,
            email: user.email
          }, config.privateKey, {
            expiresIn: '7d'
          });
          // Update cookie to be correct username
          res.cookie('auth_token', false, {
            maxAge: 1,
            path: "/"
          });
          res.clearCookie('auth_token', {
            path: "/"
          });
          res.cookie('auth_token', token, {
              maxAge: 604800000,
              path: "/"
            })
            .json({
              success: true,
              message: 'User has been updated!'
            });
        }
      });
    });
  });

  // => DELETE /api/users/:id
  router.delete('/:id', authenticateRoute, (req, res) => {
    let userId = req.params.id;

    User.findOne({username: req.decoded.username}, (err, user) => {
      if (err) {
        return res.status(500).send('There was an error completing your request');
      } else if (!user) {
        return res.status(404).send('No user with that id');
      }
      // user found, check if it is the logged in user
      if (userId !=  user._id) {
        return res.status(401).send('You can only delete your own account');
      }

      // User is the valid user, now delete user
      User.remove({
        _id: userId
      }, (err, obj) => {
        if (err || obj.n < 1) {
          return res.status(500).send('Error removing account');
        }
        //  user removed,  now remove associated polls
        Poll.remove({
          user_id: userId
        }, (err, obj) => {
          if (err || obj.n >= 1) {
            return res.status(500).json({
              success: false,
              message: 'Could not delete polls'
            });
          }
           res.cookie('auth_token', false, {
            maxAge: 1,
            path: "/"
          });
          res.clearCookie('auth_token', {
            path: "/"
          });
          res.json({
            success: true,
            message: 'Account has been deleted'
          });
        });
      });
    });
  });


  //==== Joint routes ====//

  // => GET /api/users/:id/polls
  router.get('/:username/polls', (req, res) => {
    let username = req.params.username;
    if (typeof username !== 'string') {
      return res.status(400).send('Could not process your request');
    }
    User.findOne({
      lowercase_name: username.toLowerCase()
    }, (err, user) => {
      if (err) {
        return res.status(500).send('Could not process your request');
      } else if (!user) {
        return res.status(404).send('User does not exist');
      }
      // User found now find their polls
      Poll.find({
        user_id: user._id
      }).sort({_id: 'desc'}).exec((err, polls) => {
        if (err) {
          res.status(500).send('Could not process your request');
        }
        // send back polls to user
        res.json(polls);
      });
    });
  });

  // => GET /api/users/:username/polls/:question
  router.get('/:username/polls/:question', (req, res) => {
    let username = req.params.username.toLowerCase();
    let question = req.params.question;
    User.findOne({
      lowercase_name: username
    }, (err, user) => {
      if (err) {
        return res.status(500).send('Could not process your request');
      } else if (!user) {
        return res.status(404).send('User does not exist');
      }
      // user found, now look for the poll
      let likeQuestion = new RegExp(question, 'i');

      Poll.findOne({
        question: likeQuestion,
        user_id: user._id
      }, (err, poll) => {
        if (err) {
          return res.status(500).send('Could not process your request');
        } else if (!poll) {
          return res.status(404).send('Could not find poll with that name');
        }
        // User's poll found, not send it in response
        res.json(poll);
      });
    });
  });

  return router;
};
