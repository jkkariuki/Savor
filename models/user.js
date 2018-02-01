const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema for database

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String
});

// Compare password with value in database. model method

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }
            // replace a password string with has h value
            user.password = hash;

            return next();
        });
    });
});



module.exports = mongoose.model('User', UserSchema);