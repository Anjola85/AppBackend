const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    biller: {
        type: mongoose.Types.ObjectId,
        ref: 'Biller',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    transaction_id: {
        type: String
    }
});

module.exports = mongoose.model('Transaction', schema);