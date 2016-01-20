'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./app/models/user');

// Establish connection with MongoDB
mongoose.connect('mongodb://127.0.0.1/sondage');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to Sondage database');
  var user = new User({username: 'joepossum', email: 'iplayintheroad@night.com', password: 'fuzzyducky'});

  user.save((error, user) => {
    if (error) {
      return console.error(error);
    }
    console.log('User created: ', user);
  });
});

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});