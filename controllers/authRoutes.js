const path = require("path");
const router = require("express").Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const passport = require('passport');
mongoose.Promise = global.Promise;



// Request user info
const userFunction = {


    getUser: function (req, res) {
        console.log("user route2 has been hit!!")

        db.User
            .findOne({ _id: -1 })
            .then(data => {

                console.log("hello")
                console.log("last signin" + data._id);
                res.json(data._id)
            })
            .catch(err => res.status(422).json(err))
    },



    //this route creates new users in the database
    create: function (req, res) {

        const { username, password, email } = req.body.user

        //if user exists in database this console log will notify developer in terminal
        db.User.findOne({ 'username': username }, (err, userMatch) => {
            if (userMatch) {
                console.log(`Sorry, already a user with the username: ${username}`)
            }
            const newUser = req.body.user

            //bcrypt hashes the password in the databse to protect user's password from hackers
            bcrypt.hash(password, saltRounds, function (err, hash) {
                //passing registration data to db to create new user
                db.User
                    .create({ "username": username, "password": hash, "email": email }, function (err, results) {
                        if (err) {
                            return err
                        }
                        //grabbing the most recently added user in the db
                        db.User.findOne().sort({ _id: -1 })
                            .then(data => {

                                const user_data = data

                                //********what is this doing? */
                                req.login(user_data, function (err) {
                                    res.json(req.user._id)
                                    console.log(req.user._id);
                                    console.log(req.isAuthenticated())

                                    return user_data
                                })
                            })
                            .catch(err)
                        if (err) return res.json(err)
                    })
            })


        })
    },

    logout: function (req, res) {
        console.log("logout hits backend")
        console.log(req.query)
        db.currentUser.deleteMany({ "userID": req.query.currentUser })
            .then(data => {
                res.json(data)
                console.log("delete: " + data)


            })

    }


}



passport.serializeUser((user_data, done) => {
    console.log('=== serialize ... called ===')
    console.log(user_data) // the whole raw user object!
    console.log('---------')
    done(null, user_data)
})

passport.deserializeUser((user_data, done) => {
    console.log('DEserialize ... called')
    db.User.findOne(
        { _id: user_data._id },
        'username password email',
        (err, user) => {
            console.log('======= DESERILAIZE USER CALLED ======')
            console.log(user)
            console.log('--------------')
            done(null, user)
        }
    )
})




// Fetch current user from session
// router.get('/api/currentuser', db.getCurrentUser);
router.get('/api/logout', userFunction.logout)
router.get('/api/currentuser', userFunction.getUser)
router.post("/api/signup", userFunction.create)
router.post('/api/login', passport.authenticate("local"), function (req, res) {
    console.log("auth")
    console.log("This is Authenticate :" + req.user)
    console.log("This is Authenticate 2: " + req.user._id)
    const currentUser = {
        userID: req.user._id
    }
    console.log("ID HERE: " + currentUser)
    db.currentUser.create(currentUser)
        .then(dbModel =>
            console.log(dbModel))
        //es.json(dbModel))
        .catch(err => console.log(err));

    res.json(req.user._id)
})



// router.use(function (req, res) {
//     console.log("something is on");
//     res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

module.exports = router;