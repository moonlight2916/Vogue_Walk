const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/login', adminController.showLogin);
router.post('/login', adminController.loginAdmin);

router.get('/dashboard', adminController.dashboard);
router.get('/add-product', adminController.showAddProduct);
router.post('/add-product', adminController.addProduct);

router.get('/orders', adminController.viewOrders);
router.get('/customers', adminController.viewCustomers);

router.get('/logout', adminController.logout);

module.exports = router;
