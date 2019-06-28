const userInfo = require('../models/userInfo');
const config = require('../config/config');
const _ = require('underscore');

exports.getUserInfo = (req, res, next) => {
    let query = {};
    if (req.query.transaction_id) {
        query.transaction_id = req.query.transaction_id;
    }
    console.log('query:', query);
    if (req.query.hasOwnProperty('transaction_id') && !_.isEmpty(query)) {
        console.log("function here");
        userInfo.findOne(query)
            .populate('user')
            .exec(function(err, transaction) {
                if (err) {
                    return res.status(400).json({
                        message: 'Unable to get Transactions',
                        status: fasle
                    });
                }
                if (transaction) {
                    return res.status(200).json({
                        message: 'Transaction information successfully fetched',
                        status: true,
                        data: transaction
                    });
                }
                if (!transaction) {
                    return res.status(404).json({
                        message: 'INVALID!! Record doesn\'t exist',
                        status: false,
                        data: err,
                        code: 404
                    });
                }
            });
    } else {
        return res.json({
            message: 'Field cannot be empty',
            status: false,
            code: 400
        });
    }
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

// exports.putUserInfo = (req, res) => {
//     let id = req.params.id;
//     userInfo.findById(id, (err, info) => {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Unable to get user information'
//             });
//         }

//         info.transaction_id = req.body.transaction_id;

//         info.save((err, updateInfo) => {
//             if (err) {
//                 return res.status(500).json({
//                     status: false,
//                     message: 'Unable to update information'
//                 });
//             }
//             if (updateInfo) {
//                 return res.status(200).json({
//                     status: true,
//                     message: 'Information successfully fetched',
//                     data: updateInfo
//                 })
//             }
//         })
//     })
// }