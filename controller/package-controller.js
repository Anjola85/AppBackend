const Package = require('../models/package');
const config = require('../config/config');

exports.registerPackage = (req, res) => {
    Package.findOne({ package_name: req.body.package_name }, (err, package) => {
        if (err) {
            return res.status(400).json({
                message: 'An error occured',
                code: 400,
                status: false,
                data: err
            });
        }
        if (package) {
            return res.status(400).json({
                message: 'Package already exists'
            });
        }

        let newPackage = new Package(req.body);
        newPackage.save((err, package) => {
            if (err) {
                console.log('err:', err);
                return res.status(400).json({
                    message: err.message,
                    status: false
                });
            }
            if (package) {
                console.log('data:', package);
                return res.status(201).json({
                    message: 'Package successfully created',
                    status: true,
                    data: package
                });
            }
        });
    });
}

exports.getPackages = (req, res) => {
    let query = {};
    if (req.query.biller_id) {
        query.biller_id = req.query.biller_id
    }
    Package.find(query)
        .populate('biller_id')
        .exec(function(err, cb) {
            if (err) {
                return res.status(400).json({
                    message: 'Can\'t get biller information',
                    status: false
                });
            }
            if (cb) {
                return res.status(200).json({
                    message: 'Biller inforomation successfully fetched',
                    status: true,
                    data: cb
                })
            } else {
                return res.status(404).json({
                    message: 'biller name does not exist',
                    status: false,
                    code: 404
                })
            }
        })
}

// exports.getPackages = (req, res) => {
//     Package.find({}, (err, package) => {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Unable to fetch packages'
//             });
//         }
//         if (package) {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Package successfully fetched',
//                 data: package
//             });
//         }
//     });
// }

exports.getPackageById = (req, res) => {
    Package.findById(req.params.id, (err, package) => {
        if (err) {
            return res.status(500).json({
                message: 'Unable to fetch package',
                status: false
            });
        }
        if (package) {
            return res.status(200).json({
                status: true,
                message: 'package successfully fetched!',
                data: package
            });
        }
    });
}

exports.updatePackage = (req, res) => {
    let id = req.params.id
    Package.findById(id, (err, package) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to update package'
            });
        }

        console.log('id:', id);
        console.log('body:', req.body);

        package.package_name = req.body.package_name;
        package.image = req.body.image;
        package.amount = req.body.amount;
        package.biller_id = req.body.biller_id;

        package.save((err, package) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to update package'
                });
            }
        })
        if (package) {
            return res.status(200).json({
                status: true,
                message: 'Package successfully updated',
                data: package
            });
        }
    });
}

exports.deletePackage = (req, res) => {
    Package.findById(req.params.id, (err, package) => {
        if (err) {
            return res.status(500).json({
                message: 'Unable to delete package',
                status: false
            });
        }
        if (package) {
            package.remove();
            return res.status(200).json({
                message: 'Package successfully deleted',
                status: true
            })
        }
    })
}