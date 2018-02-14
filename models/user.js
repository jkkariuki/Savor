const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// const bcrypt = require('bcryptjs');

const User = new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

User.plugin(passportLocalMongoose);
User.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
// Define schema methods

// UserSchema.methods = {
//     checkPassword: function(inputPassword) {
//         return bcrypt.compareSync(inputPassword, this.local.password)
//     },
//     hashPassword: plainTextPassword => {
//         return bcrypt.hashSync(plainTextPassword, 10)
//     }
// };

// // Define hooks for pre-saving

// UserSchema.pre('save', function(next) {
//     if (!this.local.password) {
//         console.log('No password provided')
//         next()
//     }else{
//         this.local.password = this.hashPassword(this.local.password)
//         next()
//     }
// });


module.exports =  mongoose.model('User', User);
;