const express = require('express');
const router = require('express').Router();
const db = require('../models/user');
const passport = require('passport');
const path = require('path');

// Request user info
const userFunction = {

    create: (req, res, next) => {
        console.log('create route being hit');
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

        // passport.authenticate('local'), (req, res) => {
        //     console.log('POST to /login')
        //     const user = JSON.parse(JSON.stringify(req.user))
        //     const cleanUser = Object.assign({}, user)
        //     if (cleanUser.local) {
        //         console.log('Deleting ${cleanUser.local.password}')
        //         delete cleanUser.local.password
        //     }
        //     res.json({
        //         user: cleanUser
        //     })
        // });

    router.post((req, res) => {
        if (req.user) {
            req.session.destroy()
            res.clearCookie('connect.sid')
            return res.json({
                msg: 'logging you out '
            })
        } else {
            return res.json({
                msg: 'no user to log out!'
            })
        }
    },

    router.post('/signup', (req, res) => {
        const {
            username,
            password
        } = req.body
        // ADD VALIDATION
        User.findOne({
            'local.username': username
        }, (err, userMatch) => {
            if (userMatch) {
                return res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            const newUser = new User({
                'local.username': username,
                'local.password': password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                return res.json(savedUser)
            });
        });
    });

};

router.post('/auth/signup', userFunction.create);

router.use(function (req, res) {
    console.log("no user end point hit");
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});



module.exports = router;