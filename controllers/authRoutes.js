const path = require("path");
const router = require("express").Router();
const db = require("../models");
// const User = require("../models/user")

const axios = require("axios");
const passport = require('../Passport')

// Request user info
const userFunction = {

    getUser: function (req, res, next){
        console.log('====User====')
        console.log(req.user)
        if (req.user) {
            return res.json({
                user: req.user
            })
        } else {
            return res.json({
                user: null
            })
        }
    },
    authenticate: function (req, res, next) {
        console.log(req.body)
        console.log('===================')
        next()    
        passport.authenticate('local'), (req, res) => {
            console.log('POST to /login')
            const user = JSON.parse(JSON.stringify(req.user))
            const cleanUser = Object.assign({}, user)
            if (cleanUser.local) {
                console.log('Deleting ${cleanUser.local.password}')
                delete cleanUser.local.password
            }
            res.json({
                user: cleanUser
            })
        }
    },

    create: function(req, res){
        console.log("create has been hit")
        console.log(req.body)
            // db.user
            // .find(req.body.username)
            // .then(dbModel => res.json (dbModel))
            // .catch(err => {
            //     res.status(422).json(err)
            //     console.log("!*&!*!%!^&%!")
            // })
            // console.log(req.body)
            // // ADD VALIDATION
            // const { username, password, email } = req.body
            // db.user.findOne({ 'username': username }, (err, userMatch) => {
            //     if (userMatch) {
            //         return res.json({
            //             error: `Sorry, already a user with the username: ${username}`
            //         })
            //     }
        const newUser = req.body
        console.log(newUser)
        db.User
            .create(newUser) 
                   // console.log(savedUser)
                    // if (err) return res.json(err)
                    // return res.json(savedUser)
                
    }
            
}




// Fetch current user from session
// router.get('/api/currentuser', db.getCurrentUser);
router.post("/api/signup", userFunction.create)
router.post('/api/login', userFunction.authenticate) 
router.get('/user', userFunction.getUser)


router.use(function (req, res) {
    console.log("something is on");
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});



module.exports = router;