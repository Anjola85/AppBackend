const Card = require('../models/card');
const config = require('../config/config');

exports.createCard = (req, res) => {
    Card.findOne({ card_number: req.body.card_number }, (err, card) => {
        if (err) {
            return res.status(400).json({
                message: "oops an error occured",
                status: false,
                code: 400,
                data: err
            })
        }
        if (card) {
            return res.status(400).json({
                message: 'Card already exists',
                status: false
            });
        }

        let newCard = new Card(req.body);
        newCard.save((err, card) => {
            if (err) {
                console.log('err:', err);
                return res.status(400).json({
                    message: err.message,
                    status: false
                });
            }
            if (card) {
                console.log("data:", card);
                return res.status(201).json({
                    'message': 'Card successfully created!',
                    status: true,
                    data: card
                });
            }
        });
    });
}

exports.validateCard = (req, res) => {
    Card.findOne({ card_number: req.body.card_number }, (err, card) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: 'Something went wrong'
            })
        }
        if (!card) {
            return res.status(404).json({
                message: 'Card not found',
                status: false,
                code: 404
            })
        } else {
            console.log(req.body);
            return res.status(200).json({
                msg: 'Card exists!',
                status: true,
                data: card
            })
        }

    })
}

exports.getCard = (req, res) => {
    Card.findOne({ card_number: req.body.card_number }, (err, card) => {
        if (err) {
            return res.status(404).json({
                message: 'Unable to fetch card',
                status: false
            });
        }
        if (card) {
            return res.status(200).json({
                status: true,
                message: 'Card successfully fetched',
                data: card
            });
        }
    })
}