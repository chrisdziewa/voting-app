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

app.use(sslRedirect());

app.use(cookieParser());

// Allowing X-domain request
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allowCrossDomain);

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
