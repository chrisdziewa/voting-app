'use strict';

let config = {};

config.privateKey = "sdiufIU&#@G&8";

config.db = {};

config.db.user = 'db_user',
config.db.password = 'db_password',
config.db.connectString = 'mongodb://' + config.db.user +
                                          ':' + config.db.password +
                                          'mongo-connect-url-here';

module.exports = config;
