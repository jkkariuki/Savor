const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');


// const bcrypt = require('bcryptjs');

const User = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

User.plugin(passportLocalMongoose);
User.methods.validPassword = function(pwd) {
    // EXAMPLE CODE!
    return bcrypt.compareSync(pwd, this.password);
};


module.exports =  mongoose.model('User', User);
