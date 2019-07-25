const Purchase = require('../models/mobile_network');


exports.payAirtime = (req, res, next) => {
    console.log('body:', req.body);
    if (req.body.phone_number.length === 11) {
        let telephone = JSON.stringify(req.body.phone_number).substring(2, 12);
        req.body.phone_number = '+234' + telephone;
    }
    if (req.body.user_id === null || req.body.user_id === '') {
        return res.status(404).json({
            message: 'User_id not found',
            status: false
        })
    }
    if (req.body.amount === null || req.body.amount === '' || req.body.amount === 0) {
        return res.status(400).json({
            message: 'Amount cannot be zero!',
            status: false
        })
    }
    Purchase.findOne({ user_id: req.body.user_id }, (err, purchase) => {
        if (err) {
            return res.status(400).json({
                message: err,
                status: false,
                code: 400
            })
        }

        let newPurchase = new Purchase(req.body);
        newPurchase.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    message: err,
                    status: false
                })
            }
            if (success) {
                return res.status(201).json({
                    message: 'Purchase successful',
                    status: true,
                    datat: success
                });
            }
        });
    });
}