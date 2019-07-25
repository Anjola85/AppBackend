const Transaction = require('../models/transaction');

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