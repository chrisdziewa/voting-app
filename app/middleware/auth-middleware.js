'use strict';
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    // check header or url params or post params for token
    let token = req.cookies.auth_token
    if (token && typeof token === 'string') {
      token = token.split(' ').join('');
    }
    else {
      return res.status(401).send('Authentication failed');
    }
    //decode the token
    if (token) {
      // verify token and exp not reached
      jwt.verify(token, config.privateKey, (err, decoded) => {
        if (err) {
          return res.status(401).send('Failed to authenticate token');
        }
        else {
          // everything is good, save to request for use in other routes.
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // there is no token
      return res.status(401).send({
        success: false,
        message: 'No token provided.'
      });
    }
  };