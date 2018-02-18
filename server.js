const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('cookie-session')
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




// Initialize express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(savorController, authRoutes);

const User = require('./models/user');

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




// Set up promises with mongoose
mongoose.Promise = Promise;
// Connect to the Mongo DB

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/savordb';

mongoose.connect(dbURI)
  .then(() => console.log('connected to DB!'))
  .catch((err) => console.log(err));



// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});