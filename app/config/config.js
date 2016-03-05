'use strict';

let config = {};
config.db = {};

if (process.env.PRIVATE_KEY && process.env.USER && process.env.PASSWORD) {

  config.privateKey = process.env.PRIVATE_KEY;

  config.db.user = process.env.USER,
  config.db.password = process.env.PASSWORD,
  config.db.connectString = 'mongodb://' + config.db.user +
  ':' + config.db.password +
  '@ds049945.mongolab.com:49945/sondage';

}

// Local development
else {
  config.privateKey = 'hkjfs676sf9(*#&kh';
  config.db.connectString = 'mongodb://localhost/sondage';
}

module.exports = config;
