'use strict';
const User = require('../models/user');
const _ = require('underscore');
const authenticateRoute = require('../middleware/auth-middleware');

// All routes are starting at /api/users/

module.exports = function(express, app) {
  let router = express.Router();

  // => GET /api/users
  router.get('/', (req,res) => {
    User.find({}, (error, users) => {
      if (error) {
        console.log(error);
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
  router.post('/', (req,res) => {
    let validAttributes = _.pick(req.body, 'username', 'email', 'password');
    let newUser = new User(validAttributes);

    newUser.save((error, user) => {
      if (error) {
        // Duplicate database value
        if (error.code == 11000) {
          if (/username/.test(error.message)) {
            return res.status(500).json({success: false, message: 'User with that name already exists'});
          }
            return res.status(500).json({success: false, message: 'Email is already taken'});
        } else {
           return res.status(500).json({success: false, message: error});
         }
      } else {
        // Prevent password field from being returned in response
        let displayUser = _.pick(user, '_id', 'username', 'email');
        res.json(displayUser);
      }
    });
  });

  // => GET /api/users/:id
  router.get('/:id', authenticateRoute,(req, res) => {
    let userId = req.params.id
    User.findById({_id: userId}, (err, user) => {
      if (err) {
        res.status(500).send('Error completing your request');
        return console.error(err);
      } else {
        if (user) {
          res.json(user);
        } else {
          res.status(404).send("User not found");
        }
      }
    });
  });

  // => PUT /api/users/:id
  router.put('/:id', authenticateRoute,(req, res) => {
    let userId = req.params.id;
    let validAttributes = _.pick(req.body, 'username', 'email', 'password');
    User.findById({_id: userId}, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('There was an error completing your request');
      }
      if (user) {
        // If user found, set only the new attributes
        if (validAttributes.username) user.username = validAttributes.username;
        if (validAttributes.email) user.email = validAttributes.email;
        if (validAttributes.password) user.password = validAttributes.password;
      } else {
        return res.status(404).send('Could not find user with that id');
      }

      // All is well, now save user
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Could not update user');
        } else {
          res.json({success: true, message: 'User has been updated!'});
        }
      });
    });
  });

  // => DELETE /api/users/:id
  router.delete('/:id', authenticateRoute,(req, res) => {
    let userId = req.params.id;

    User.remove({_id: userId}, (err, obj) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Could not delete user');
      }
      if (obj.result.n === 0) {
        return res.status(404).send('User with that id was not found');
      }
      else {
        res.send('User has been deleted');
      }
    });
  });

   return router;
};


