const Biller = require('../models/biller');
const Package = require('../models/package');
const config = require('../config/config');


exports.registerBiller = (req, res, next) => {
    console.log('req body:', req.body.biller_name);
    Biller.findOne({ biller_name: req.body.biller_name }, (err, biller) => {
        if (err) {
            return res.status(400).json({
                message: "oops an error occured",
                status: false,
                code: 400,
                data: err,
            });
        }
        if (biller) {
            return res.status(400).json({ 'msg': 'Biller already exists' });
        }

        let newBiller = new Biller(req.body);
        newBiller.save((err, biller) => {
            if (err) {
                console.log('err:', err);
                return res.status(400).json({
                    message: err.message,
                    status: false
                });
            }
            if (biller) {
                console.log("data:", biller);
                return res.status(201).json({
                    'message': 'Biller successfully created!',
                    status: true,
                    data: biller
                });
            }
        });
    });
}

exports.getBiller = (req, res) => {
    let query = {};
    if (req.query.types) {
        query.types = req.query.types;
    }
    Biller.find(query, (err, biller) => {
        if (err) {
            return res.status(500).json({
                status: false,
                code: 500,
                message: 'Unable to fetch billers'
            });
        }
        if (biller) {
            return res.status(200).json({
                status: true,
                message: 'Billers successfully fetched',
                code: 200,
                data: biller
            });
        }
    });
}

exports.getBillerById = (req, res) => {
    Biller.findById(req.params.id, (err, biller) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to fetch biller by id',
                data: err
            });
        }
        if (biller) {
            return res.status(200).json({
                status: true,
                message: 'biller successfully fetched',
                data: biller
            });
        }
    });
}


exports.updateBiller = (req, res, next) => {
    id = req.params.id
    Biller.findById(id, (err, biller) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to update biller'
            });
        }

        console.log('id', id);
        console.log('Body:', req.body);

        // biller.price = req.body.price;

        biller.save((err, updateBiller) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to update biller'
                });
            }
            if (updateBiller) {
                return res.status(200).json({
                    status: true,
                    message: 'Biller successfully updated',
                    data: updateBiller
                });
            }
        });
    });
};

exports.deleteBiller = (req, res) => {
    Biller.findOne({ _id: req.params.id }, (err, biller) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to delete'
            });
        }
        biller.remove();
        return res.status(200).json({
            status: true,
            message: 'Biller successfully removed'
        });
    });
};