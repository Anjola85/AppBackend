const express = require('express');
route = express.Router();
const userController = require('./controller/user-controller');
const billerController = require('./controller/biller-controller');
const packageController = require('./controller/package.controller');
const payController = require('./controller/payStack-controller');
const passport = require('passport');

route.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

// user routes
route.post('/registerUser', userController.registerUser);

route.post('/login', userController.loginUser);

route.get('/users', userController.getUsers);

route.get('/user/:id', userController.getUserById);

route.put('/user/:id', userController.updateUser);

route.delete('/user/:id', userController.deleteUser);

route.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Welcome ${req.user.email}!` });
});

route.post('/pay', payController.payBills);

// Biller routes
route.post('/registerBiller', billerController.registerBiller);

route.get('/billers', billerController.getBiller);

route.get('/biller:/id', billerController.getBillerById);

route.put('/biller/:id', billerController.updateBiller);

route.delete('/biller/:id', billerController.deleteBiller);

// Packages routes
route.post('/registerPackage', packageController.registerPackage);
route.get('/packages', packageController.getPackages);
route.get('/packages/:id', packageController.getPackageById);
route.delete('/package/:id', packageController.deletePackage);
route.put('/package/:id', packageController.updatePackage);

module.exports = route;