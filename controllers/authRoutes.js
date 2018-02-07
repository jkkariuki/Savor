const path = require("path");
const router = require("express").Router();
const db = require("../models");
//const User = require("../models/user")
const axios = require("axios");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Request user info
const userFunction = {

    authenticate: function (req, res, next) {
        db.User.findOne({
            'username': req.body.user.username,
            'password': req.body.user.password
        }, (err, userMatch) => {
            if (userMatch) {
                console.log(`Welcome: ${req.body.user.username}`)
            }else{
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
router.post('/api/login', userFunction.authenticate)

// router.get('/user', userFunction.getUser)

router.use(function (req, res) {
    console.log("something is on");
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});



module.exports = router;