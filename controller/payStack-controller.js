const config = ('../config/config.js');
const jwt = require('jsonwebtoken');

exports.payBills = (req, res) => {
    // Require the library

    // Download library from https://github.com/kehers/paystack
    var paystack = require('paystack')('SECRET_KEY');

    paystack.transactions.verify('7PVGX8MEk85tgeEpVDtD', function(error, body) {
        console.log(error);
        console.log(body);
    });

};