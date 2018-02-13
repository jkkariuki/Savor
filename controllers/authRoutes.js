const path = require("path");
const router = require("express").Router();
const db = require("../models");
 //const User = require("../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require("axios");
const passport = require('../Passport')
const LocalStrategy = require('../Passport/LocalStrategy')

// Request user info
const userFunction = {

    // getUser: function (req, res, next){
    //     console.log('====User====')
    //     console.log(req.user)
    //     if (req.user) {
    //         return res.json({
    //             user: req.user
    //         })
    //     } else {
    //         return res.json({
    //             user: null
    //         })
    //     }
    // },
    getUser : function(req, res){
        console.log("user route2 has been hit!!")
        db.User
        .findOne().sort({_id: -1})
            .then(data =>{
                
            console.log("hello")
            console.log("last signin" + data._id);
            res.json(data._id)
            })
            .catch(err => res.status(422).json(err))
    },
    

    authenticate: function(req,res){
            passport.authenticate(('passport-local'),function(req, user, info){
        // console.log("LOGIN ROUTE:" + req.user)
        console.log("LOGIN ROUTE: 2 " + user);
        // db.User.findOne(req.body.user)
        // .then(data =>{            
        //     console.log("hello")
        //     console.log("last signin" + data._id)
        //     const user_data = data

        //     req.login(user_data, function(err){
        //         res.json(req.user._id)
        //         console.log(req.user._id);
        //         console.log(req.isAuthenticated())
                
        //         return user_data
        //     })
        // })
            })
    },
        // .catch(err) 
        //     if (err) return res.json(err)        
   
        // console.log(req.body)
        // console.log('===================')
        // next();    
        // passport.authenticate('local'), (req, res) => {
        //     console.log('POST to /login')
        //     const user = JSON.parse(JSON.stringify(req.body.user))
        //     const cleanUser = Object.assign({}, user)
        //     if (cleanUser.local) {
        //         console.log('Deleting ${cleanUser.local.password}')
        //         delete cleanUser.local.password
        //     }
        //     res.json({
        //         user: cleanUser
        //     })
        // }
    

    create: function(req, res){
        console.log("create has been hit")
        console.log(req.body)
            // db.user
            // .find(req.body.user.username)
            // .then(dbModel => res.json (dbModel))
            // .catch(err => {
            //     res.status(422).json(err)
            //     console.log("!*&!*!%!^&%!")
            // })
            // ADD VALIDATION
            const { username, password, email } = req.body.user

            console.log(password)

            db.User.findOne({ 'username': username }, (err, userMatch) => {
                if (userMatch) {
                    console.log(`Sorry, already a user with the username: ${username}`)                    
                }
                const newUser = req.body.user
                
                console.log(newUser)
                bcrypt.hash(password, saltRounds, function(err, hash){
                    db.User
                    .create({"username": username, "password": hash, "email": email}, function(err, results){
                        console.log("here")
                        if (err){
                            return err
                        }
                        db.User.findOne().sort({_id: -1})
                            .then(data =>{
                                
                            console.log("hello")
                            console.log("last signin" + data._id)
                            const user_data = data

                            req.login(user_data, function(err){
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
                
                    // .catch(err) 
                        //    console.log(savedUser)
                        //     if (err) return res.json(err)
                        //     return res.json(savedUser)
                        
            })
        }
            
}



passport.serializeUser((user_data, done) => {
	console.log('=== serialize ... called ===')
	console.log(user_data) // the whole raw user object!
	console.log('---------')
	done(null,  user_data )
})

passport.deserializeUser((user_data, done) => {
	console.log('DEserialize ... called')
	db.User.findOne(
		{ _id: user_data._id},
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
router.get('/api/currentuser', userFunction.getUser)
router.post("/api/signup", userFunction.create)
router.post('/api/login', userFunction.authenticate) 
// router.get('/user', userFunction.getUser)


router.use(function (req, res) {
    console.log("something is on");
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;