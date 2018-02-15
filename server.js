import { setInterval } from "timers";

const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 3001;
const app = express();
const LocalStrategy = require('passport-local').Strategy;
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
// var store = new MongoDBStore(
//   {
//     // uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
//     // collection: 'mySessions'
//   });

// Catch errors

//***************************** */
// store.on('error', function(error) {
//   assert.ifError(error);
//   assert.ok(false);
// });
//***************************** */


// Initialize express session
app.use(session({
  secret: 'keyboard cat',
  // store: store,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(savorController, authRoutes);

const User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("login username: " + username)
    console.log("login password: " + password)
      // When a user tries to sign in this code runs
      User.findOne({
        
          username: username
        }
      ).then(function(dbUser) {
        console.log("DBUSER : " + dbUser)
        // If there's no user with the given email
        if (!dbUser) {
          console.log("wrong username/password")
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(dbUser.password)) {
          console.log("incorrect pass")
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        console.log("success")
        // If none of the above, return the user
        return done(null, dbUser);
      });
    
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Set up promises with mongoose
mongoose.Promise = Promise;
// Connect to the Mongo DB

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/savordb';

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