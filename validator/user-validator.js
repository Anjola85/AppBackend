const User = require('../models/user');

let Validator = require('validatorjs');

function validation(body) {
    let rules = {
        firstname: 'required',
        lastname: 'required',
        username: 'required',
        phoneNumber: 'required',
        email: 'required|email',
    };

    let validator = new Validator(body, rules);
    return validator;
}

module.exports.validation = validation;