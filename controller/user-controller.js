const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserValidation = require('../validator/user-validator');


function createToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, config.jwtSecret, {
        expiresIn: 86400
    });
}

exports.registerUser = (req, res, next) => {
    let validation = UserValidation.validation(req.body);
    if (validation.fails()) {
        return res.status(400).json({
            status: false,
            message: 'Invalid inputs',
            messages: validation.errors,
        });
    }
    if (req.body.phoneNumber.length === 11) {
        let telephone = JSON.stringify(req.body.phoneNumber).substring(2, 12);
        req.body.phoneNumber = '+234' + telephone;
    }
    if (req.body.password !== req.body.confirm_password) {
        res.status(400).json({
            status: false,
            message: 'Password don\'t match'
        })
    } else {
        User.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "oops an error ",
                    status: false,
                    code: 400,
                    data: err
                });
            }

            if (user) {
                return res.status(400).json({
                    'msg': 'The user already exists'
                });
            }

            let newUser = new User(req.body);
            newUser.save((err, user) => {
                if (err) {
                    console.log('err:', err);
                    return res.status(400).json({
                        message: err.message,
                        status: false
                    })
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
        return res.status(400).json({
            'msg': 'You need to fill in the required fields'
        });
    }

    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: err,
                code: 400,
                status: fasle
            });
        }

        if (!user) {
            return res.status(404).json({
                message: 'The user does not exist',
                code: 404,
                status: false
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user),
                    message: 'User logged in successfully!',
                    status: true,
                    data: user,
                    code: 200
                });
            }
            if (!isMatch) {
                return res.status(404).json({
                    message: 'Invalid username and password!',
                    status: false,
                    code: 404
                })
            } else {
                return res.status(400).json({
                    message: 'Something went wrong',
                    code: 400,
                    status: false
                });
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
                message: 'Unable to  get user info'
            });
        }

        console.log('id', id);
        console.log('req body', req.body);

        user.password = req.body.password;
        user.confirm_password = req.body.confirm_password;

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


exports.changePassword = (req, res) => {
    if (!req.body.old_password) {
        return res.status(400).json({
            'msg': 'You need to fill in the required fields'
        });
    }

    if (req.params.id) {
        User.findById(req.params.id, (err, user) => {
            user.comparePassword(req.body.old_password, (err, isMatch) => {
                if (isMatch && !err) {
                    if (req.body.new_password !== req.body.confirm_password) {
                        return res.status(400).json({
                            message: 'Passwords dont\' match',
                            status: false,
                            code: 400
                        })
                    }
                    user.password = req.body.new_password;
                    user.confirm_password = req.body.confirm_password;
                    user.save((err, updatedUser) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                message: 'Unable to update password',
                                code: 500
                            });
                        }
                        if (updatedUser) {
                            return res.status(200).json({
                                status: true,
                                message: 'Password successfully changed',
                                data: updatedUser,
                                code: 200
                            })
                        }
                    });
                }
                if (!isMatch) {
                    return res.status(404).json({
                        message: 'Invalid password!',
                        status: false,
                        code: 404
                    })
                }
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                        status: fasle,
                        code: 4000
                    })
                }
            })
        })
    }

};

exports.deleteUser = (req, res) => {
    let id = req.params.id;
    User.findOne({
        _id: id
    }, (err, user) => {
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