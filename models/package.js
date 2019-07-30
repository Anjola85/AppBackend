const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    package_name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
    biller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Biller',
        required: true,
    },
}, { timeStamps: true });

module.exports = mongoose.model('Packages', schema);