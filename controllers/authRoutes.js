const path = require("path");
const router = require("express").Router();
const db = require("../models");
//const User = require("../models/user")
const axios = require("axios");
<<<<<<< HEAD
const passport = require('../passport');
const LocalStrategy = require('passport-local').Strategy;


=======
const passport = require('../Passport')
>>>>>>> 31764f73c8b7645df184161a8b57cfb54f09f004
// Request user info
const userFunction = {

    authenticate: function (req, res, next) {
<<<<<<< HEAD
        db.User.findOne({
            'username': req.body.user.username,
            'password': req.body.user.password
        }, (err, userMatch) => {
=======
        db.User.findOne({'username': req.body.user.username, 'password': req.body.user.password }, (err, userMatch) => {
>>>>>>> 31764f73c8b7645df184161a8b57cfb54f09f004
            if (userMatch) {
                console.log(`Welcome: ${req.body.user.username}`);
                const loggedInUser = req.body.user.username;
                console.log(loggedInUser)
                res.json(loggedInUser);
<<<<<<< HEAD
                passport.authenticate('local-strategy',)
=======
                return loggedInUser
>>>>>>> 31764f73c8b7645df184161a8b57cfb54f09f004

            }
            else{
                console.log(`Invalid Username and/or password`)
            }
            

        })
    },


    create: function (req, res) {
        console.log("create has been hit")
        console.log(req.body)
        const {
            username,
            password,
            email
        } = req.body.user
        db.User.findOne({
            'username': username
        }, (err, userMatch) => {
            if (userMatch) {
                console.log(`Sorry, already a user with the username: ${username}`)
            }
            const newUser = req.body.user
            console.log(newUser)
            db.User
                .create(newUser)

        })
    }
}


// Fetch current user from session
// router.get('/api/currentuser', db.getCurrentUser);
router.post("/api/signup", userFunction.create)

router.post('/api/login', function(req, res, next) {
        console.log(req.body.user.username)
    passport.authenticate(req.body.user.username, req.body.user.password),
    (request, result) => {
        console.log("loggeed in" + request)

    }
}

)

// router.get('/user', userFunction.getUser)

router.use(function (req, res) {
    console.log("something is on");
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

<<<<<<< HEAD


module.exports = router;

// router.post(
//     '/login',
//     function (req, res, next) {
//         console.log('routes/user.js, login, req.body: ');
        
//         console.log(req.body)
//         next()
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('logged in', req.user);
//         var userInfo = {
//             username: req.user.username
//         };
//         res.send(userInfo);
//     }
// )
=======
module.exports = router;
>>>>>>> 31764f73c8b7645df184161a8b57cfb54f09f004
