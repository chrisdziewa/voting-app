'use strict';

let config = {};

config.privateKey = process.env.PRIVATE_KEY;

config.db = {};

config.db.user = process.env.USER,
config.db.password = process.env.PASSWORD,
config.db.connectString = 'mongodb://' + config.db.user +
                                          ':' + config.db.password +
                                          '@ds049945.mongolab.com:49945/sondage';

module.exports = config;
