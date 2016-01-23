'use strict';
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = function(req, token) {

  // decode the token
  if (token) {
    // verify token and exp not reached
    jwt.verify(token, config.privateKey, (err, decoded) => {
      if (err) {
        return false;
      } else {
        // everything is good, return decoded token
        return decoded;
      }
    });
  };
}
