const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session')
const PORT = process.env.PORT || 3001;
const app = express();

//Controllers
const {authRoutes, savorController  } = require('./controllers');

// Authentication Packages
const passport = require('passport');
require('dotenv').config();


// Configure body parser for axios requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

// Cookie Parser middleware initialization
app.use(cookieParser());

// Initialize express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(savorController, authRoutes);


// Set up promises with mongoose
mongoose.Promise = Promise;
// Connect to the Mongo DB

const dbURI = process.env.MONGOD_URI || 'mongodb://localhost/savordb';

mongoose.connect(dbURI)
  .then(() => console.log('connected to DB!'))
  .catch((err) => console.log(err));

app.use('/api', savorController);
app.use('/api', authRoutes);
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});