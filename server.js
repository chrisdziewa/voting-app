'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./app/config/config.js');

//==== Webpack development setup ====//
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

//==== End Webpack Setup ==== //

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});