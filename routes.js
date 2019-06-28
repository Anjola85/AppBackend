const express = require('express');
route = express.Router();
const userController = require('./controller/user-controller');
const billerController = require('./controller/biller-controller');
const packageController = require('./controller/package-controller');
const payController = require('./controller/payStack-controller');
const cardController = require('./controller/card-controller');
const passport = require('passport');
const userInfo = require('./controller/userInfo-controller');
const transactionController = require('./controller/transaction-controller');

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
route.get('/biller/:id', billerController.getBillerById);
route.put('/biller/:id', billerController.updateBiller);
route.delete('/biller/:id', billerController.deleteBiller);


// Packages routes
route.post('/registerPackage', packageController.registerPackage);
route.get('/packages', packageController.getPackages);
route.get('/package/:id', packageController.getPackageById);
route.delete('/package/:id', packageController.deletePackage);
route.put('/package/:id', packageController.updatePackage);

// User information
route.post('/createInfo', userInfo.postUserInfo);
route.get('/userInfo', userInfo.getUserInfo);
// route.put('/updateInfo/:id', userInfo.putUserInfo);

// card routes
route.post('/createCard', cardController.createCard);
route.post('/cardValidation', cardController.validateCard);

// transaction routes
route.get('/transactions', transactionController.getTransaction);
route.post('/createTransaction', transactionController.registerTransaction);
route.get('/transaction/:id', transactionController.getTransactionById);

module.exports = route;