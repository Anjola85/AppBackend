const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    network_id: {
        type: Schema.Types.ObjectId,
        ref: 'Biller'
    },
    phone_number: {
        type: String
    },
    amount: {
        type: String
    },
    transaction_reference: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('mobile_network', mySchema);