'use strict';
const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const authenticateRoute = require('../middleware/auth-middleware');

module.exports = function(express, app) {
  let router = express.Router();

  router.post('/authenticate', (req, res) => {
    if (!req.body.email || typeof req.body.email !== 'string') {
      res.status(400).send('Bad data request');
    }
    User.findOne({
      email: req.body.email.toLowerCase()
    }).select('username email password').exec((err, user) => {
      if (err) {
        return res.status(500).send('An error occurred while authenticating user');
      }
      else if (!user) {
        return res.status(404).json({success: false, message: 'Authentication failed. User not found'});
      }
      // user was found, now verify correct password
      let correctPassword = user.comparePassword(req.body.password);
      if (!correctPassword) {
       return res.status(401).json({success: false, message: 'Authentication failed. Incorrect password.'});
      }
      // Password was valid, now create a token
      let token = jwt.sign({
        username: user.username,
        email: user.email
      }, config.privateKey, {
        expiresIn: '7d'
      });
      let userResponse = {
        success: true,
        message: 'Successfully logged in!',
        id: user._id,
        email: user.email,
        username: user.username
      }
      // set cookie for 7 days
      res.cookie('auth_token', token, {maxAge: 604800000, path: "/"}).json(userResponse);
    });
  });

  // Logout route
  router.delete('/authenticate', authenticateRoute,(req, res) => {
    if (req.decoded) {
      res.cookie('auth_token', false, {maxAge: 1, path: "/"});
      res.clearCookie('auth_token', {path: "/"});
      res.send("You have successfully logged out");
    } else {
      res.status(400).send('There is no active session');
    }
  });

  return router;
};