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
}, { timeStamps: true });

module.exports = mongoose.model('ub_information', schema);