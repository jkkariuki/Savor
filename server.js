const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

//Controllers
const savorController = require("./controllers/savorController");
const users = require('./client/src/utils/usersAPI');

// Authentication Packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure body parser for axios requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Cookie Parser middleware initialization
app.use(cookieParser());
// Initialize express session
app.use(require('express-session')({
  secret: 'lskjklfsj',
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(savorController);
app.use(users);

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up promises with mongoose
mongoose.Promise = Promise;
// Connect to the Mongo DB

const dbURI = process.env.MONGOD_URI || 'mongodb://localhost/savordb';

mongoose.connect(dbURI)
  .then(() => console.log('connected to DB!'))
  .catch((err) => console.log(err));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});