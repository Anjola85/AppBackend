const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    biller_name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    types: {
        type: String,
        required: true
    }
}, { timeStamps: true });

module.exports = mongoose.model('Biller', schema);