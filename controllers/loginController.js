const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;
// const axios = require('axios');


// Return local strategy object
module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    // Find a user by email address
    return User.findOne({ email: userData.email}, (err, user) =>{
        if (err) {return done(err);}

        if (!user) {
            const err = new Error('Incorrect email or password');
            error.name = 'IncorrectCrednetialsError';

            return done(error);
        }

        // Check if a hashed user's passwor is equal to a value saved in the database

        return userData.comparePassword(user.data, (passwordErr, isMatch) => {
            if (err) { return done (err); }
            
            if (!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }
            const payload = {
                sub: user._id
            };

            //creeate a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };

            return done(null, token, data);
        });
    });
});
