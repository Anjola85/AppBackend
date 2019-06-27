const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400
    });
}

exports.registerUser = (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        res.status(400).json({
            status: false,
            message: 'Password don\'t match'
        })
    } else {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "oops an error ",
                    status: false,
                    code: 400,
                    data: err
                });
            }

            if (user) {
                return res.status(400).json({ 'msg': 'The user already exists' });
            }

            let newUser = new User(req.body);
            newUser.save((err, user) => {
                if (err) {
                    console.log('err:', err);
                    return res.status(400).json({
                        message: err.message,
                        status: false
                    });
                }
                if (user) {
                    console.log("data", user);
                    return res.status(201).json({
                        message: 'User successfully created!',
                        status: true,
                        data: user
                    });
                }
            });
        })
    }
};

exports.loginUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to fill in the required fields' });
    }

    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user),
                    message: 'User logged in successfully!',
                    status: true,
                    data: user
                });
            } else {
                return res.status(400).json({ msg: 'The username or password is incorrect' });
            }
        })
    });
};

exports.getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to fetch users'
            });
        }
        if (users) {
            return res.status(200).json({
                status: true,
                message: 'User successfully fetched',
                data: users
            });
        }
    });
};

exports.getUserById = (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to fetch list of transactions'
            });
        }
        if (user) {
            return res.status(200).json({
                status: true,
                message: 'User successfully fetched',
                data: user
            });
        }
    })
};

exports.updateUser = (req, res, next) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to find get user info'
            });
        }

        console.log('id', id);
        console.log('req body', req.body);

        user.lastname = req.body.lastname;

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to update user'
                });
            }
            if (updatedUser) {
                return res.status(200).json({
                    status: true,
                    message: 'User successfully updated',
                    data: updatedUser
                });
            }
        });
    });
};

exports.deleteUser = (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to find get user info'
            });
        }
        user.remove();
        return res.status(200).json({
            status: true,
            message: 'User successfully deleted',
        });
    });
};