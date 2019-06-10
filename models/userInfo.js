const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    package: {
        type: mongoose.Types.ObjectId,
        ref: 'Packages',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transaction_id: {
        // eg: SMARTCARD NUMBER
        type: String,
        required: true
    },
    reference_number: {
        type: String,
        required: true
    },
    card: {
        type: mongoose.Types.ObjectId,
        ref: 'Card',
        required: true
    }
}, { timeStamps: true });

module.exports = mongoose.model('userInfo', schema);