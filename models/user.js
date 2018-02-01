const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require("passport-local-mongoose")

const User = new Schema ({
    email: String,
    password: {type: String, select: false}

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

