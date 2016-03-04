'use strict';

const http = require('http');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    http.get('http://ipinfo.io/', function(res) {
      if (res.ip) {
        resolve(ip);
      }

      else {
        reject('There an error casting your vote');
      }
    });
  });
}
