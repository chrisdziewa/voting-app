'use strict';

let config = {};

config.privateKey = "LIiYOF11Fmo5j";

config.db = {};

config.db.user = 'sondage_control',
config.db.password = 'surveyapp',
config.db.connectString = 'mongodb://' + config.db.user + 
                                          ':' + config.db.password +  
                                          '@ds049945.mongolab.com:49945/sondage';

module.exports = config;