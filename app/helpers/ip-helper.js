'use strict';

const axios = require('axios');

// This checks the ip address to make sure a person can't vote more than once

module.exports = function() {
  return new Promise(function(resolve, reject) {
    axios.get('http://ipinfo.io/').then(response => {
      if (response.data.ip) {
        resolve(response.data.ip);
      }

      else {
        reject('There was an error casting your vote');
      }
    });
  });
}
