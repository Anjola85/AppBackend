const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        max: 10,
        unique: true,
        trim: true
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        trim: true
    }
}, { timeStamps: true });


UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(userPassword, cb) {
    bcrypt.compare(userPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema)