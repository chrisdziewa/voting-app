'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Establish connection with MongoDB
mongoose.connect('mongodb://127.0.0.1/sondage');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to sondage database');
});

app.get('/', (req, res) => {
  res.send('Hello, world');
});

// ===== Import Routers ======
const userRouter = require('./app/routes/user.routes')(express, app);
const pollRouter = require('./app/routes/poll.routes')(express, app);
app.use('/api/users', userRouter);
app.use('/api/polls', pollRouter);


app.listen(port, () => {
  console.log('Server running on port ' + port);
});