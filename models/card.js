const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    card_number: {
        type: String,
        unique: true,
        required: true
    },
    cvv: {
        type: String,
        unique: true,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    }
}, { timeStamps: true });

module.exports = mongoose.model('Card', schema)