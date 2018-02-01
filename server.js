const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const savorController = require("./controllers/savorController");
const app = express();
const PORT = process.env.PORT || 3001;
const User = require("./models/user");
// Authentication Packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authentication = require("./controllers/authentication")

// connect to the database and load models
require('./models/user');


// Configure body parser for axios requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Serve up static assets

app.use(require('express-session')({
  secret: "random string",
  sesave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("client/build"));
app.use('/api/authentication', authentication);

// Add routes, both API and view
app.use(savorController);


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Passport middleware

// Passport strategies
// const localSignupStrategy = require('./controllers/userController');
// const localLoginStrategy = require('./controllers/loginController');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// pass authentication checker middleware
// const authCheckMiddleware = require('./ser') 

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