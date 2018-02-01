// const path = require('path');
// const router = require('express').Router();
// const axios = require('axios');
// const passport = require('passport');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;

// Return Passport Local Strategy Object

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordfield: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) { return done (err); }
    
        return done(null);
    });
});