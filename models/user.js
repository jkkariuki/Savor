const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false}

});

// Define schema methods

UserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.local.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

// Define hooks for pre-saving

UserSchema.pre('save', function(next) {
    if (!this.local.password) {
        console.log('No password provided')
        next()
    }else{
        this.local.password = this.hashPassword(this.local.password)
        next()
    }
});

const User = mongoose.model('User', UserSchema);

module.export = User;