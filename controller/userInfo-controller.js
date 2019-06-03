const userInfo = require('../models/userInfo');
const config = require('../config/config');

exports.getUserInfo = (req, res) => {
    let query = {};
    if (req.query.transaction_id) {
        query.transaction_id = req.query.transaction_id;
    }
    userInfo.findOne(query)
        .populate('package user')
        .exec(function(err, cb) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: 'Unable to get Transactions'
                });
            }
            if (cb) {
                return res.status(200).json({
                    message: 'Transaction information successfully fetched',
                    status: true,
                    data: cb
                });
            }
            if (!cb) {
                return res.status(400).json({
                    message: 'Record doesn\'t exist',
                    status: false
                })
            }
        });
}


exports.postUserInfo = (req, res) => {
    userInfo.findOne({ reference_number: req.body.reference_number }, (err, info) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occured',
                code: 400,
                status: false,
                data: err
            });
        }
        if (info) {
            return res.status(400).json({
                message: 'Information already exists'
            });
        }

        let newInfo = new userInfo(req.body);
        newInfo.save((err, info) => {
            if (err) {
                console.log('err:', err);
                return res.status(400).json({
                    message: err.message,
                    status: false
                });
            }
            if (info) {
                console.log('data:', info);
                return res.status(201).json({
                    message: 'Information successfully registered',
                    status: true,
                    data: info
                });
            }
        });
    });
}