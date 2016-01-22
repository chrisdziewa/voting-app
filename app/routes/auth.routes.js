'use strict';
const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = function(express, app) {
  let router = express.Router();

  router.post('/authenticate', (req, res) => {
    User.findOne({
      email: req.body.email.toLowerCase()
    }).select('username email password').exec((err, user) => {
      console.log(user);
      if (err) {
        return res.status(500).send('An error occurred while authenticating user');
      }
      else if (!user) {
        return res.status(404).json({success: false, message: 'Authentication failed. User not found'});
      }
      // user was found, now verify correct password
      let correctPassword = user.comparePassword(req.body.password);
      if (!correctPassword) {
       return res.json({success: false, message: 'Authentication failed. Incorrect password.'});
      }
      // Password was valid, now create a token
      let token = jwt.sign({
        username: user.username,
        email: user.email
      }, config.privateKey, {
        expiresIn: '7d'
      });

      res.json({
        success: true,
        message: 'Successfully logged in',
        token: token
      });
    });
  });

  return router;
};