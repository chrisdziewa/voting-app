'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || "development";
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./app/config/config.js');
process.env.PWD = process.cwd();

// Establish connection with MongoDB
mongoose.connect(config.db.connectString);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('public'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to sondage database');
});

// ===== Import Routers ======
const userRouter = require('./app/routes/user.routes')(express, app);
const pollRouter = require('./app/routes/poll.routes')(express, app);
const authRouter = require('./app/routes/auth.routes')(express, app);
app.use('/api/users', userRouter);
app.use('/api/polls', pollRouter);
app.use('/api/', authRouter);

// For all other requests, use React Router
app.get('*', function (request, response){
  response.sendFile(process.env.PWD + '/public/index.html');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
