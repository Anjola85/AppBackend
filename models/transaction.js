const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: Schema.Types.ObjectId,
        ref: 'Packages',
        required: true
    },
    transaction_reference: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', schema);