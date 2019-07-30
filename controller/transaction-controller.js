const Transaction = require('../models/transaction');
const moment = require('moment');
const helper = require('../helper/util');

exports.registerTransaction = (req, res) => {
    Transaction.findOne({ transaction_ref: req.body.transaction_ref }, (err, transaction) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occured',
                status: false,
                code: 400,
                data: err
            });
        }
        if (!transaction) {
            return res.status(404).json({
                message: 'Could not perform payment',
                code: 404
            });
        }

        let newTransaction = new Transaction(req.body);
        newTransaction.save((err, cb) => {
            if (err) {
                console.log('err:', err);
                return res.status(400).json({
                    message: err.message,
                    status: false
                });
            }
            if (cb) {
                console.log('data:', cb);
                return res.status(201).json({
                    message: 'Transaction record has been created',
                    status: true,
                    data: cb
                })
            }
        })
    })
}

exports.getTransaction = (req, res) => {
    let query = {};
    if (req.query.user_id) {
        query.user_id = req.query.user_id
    }
    Transaction.find(query)
        .sort({ createdAt: -1 })
        .populate('user_id card package')
        .exec(function(err, cb) {
            if (err) {
                return res.status(400).json({
                    message: 'cannot get transactions',
                    status: false,
                    code: 400
                });
            }
            if (cb) {
                return res.status(200).json({
                    message: 'Transaction History successfully fetched',
                    status: true,
                    data: cb
                })
            } else {
                return res.status(404).json({
                    message: 'user does not exist or has no record',
                    status: false,
                    code: 404
                })
            }
        })
}

exports.getTransactionByDate = (req, res) => {
    let query = {};
    if (req.query.start_date && req.query.end_date) {
        let obj = { start_date: req.query.start_date, end_date: req.query.end_date };
        query.createdAt = helper.get24HoursDateRange(obj);
    }
    if (req.query.id) {
        query._id = req.query.id;
        Transaction.findOne(query).exec((err, cb) => {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                    status: false
                })
            }
            if (cb) {
                return res.status(200).json({
                    message: 'One transaction successfully fetched',
                    status: true,
                    data: cb
                })
            }
        })
    } else {
        Transaction.find(query).exec((err, transaction) => {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                    status: false
                })
            }
            if (transaction) {
                return res.status(200).json({
                    message: 'Transactions successfully fetched',
                    status: true,
                    data: transaction
                })
            }
        })
    }
}

exports.getTransactionById = (req, res) => {
    Transaction.findById(req.params.id, (err, transaction) => {
        if (err) {
            return res.status(500).json({
                message: 'Unable to fetch transaction',
                status: false
            });
        }
        if (transaction) {
            return res.status(200).json({
                status: true,
                message: 'transaction data successfully fetched',
                data: transaction
            });
        }
    })
}