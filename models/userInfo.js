const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    package: {
        type: mongoose.Types.ObjectId,
        ref: 'Packages',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    transaction_id: {
        // eg: SMARTCARD NUMBER
        type: String
    },
    reference_number: {
        type: String
    }
}, { timeStamps: true });

module.exports = mongoose.model('userInfo', schema);