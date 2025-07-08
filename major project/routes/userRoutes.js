const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
router.get('/', (req, res) => {
  res.redirect('/user/login');
});

// ✅ Each route must use a valid function!
router.get('/register', userController.showRegister);
router.post('/register', userController.registerUser);
router.get('/login', userController.showLogin);
router.post('/login', userController.loginUser);
router.get('/dashboard', userController.userDashboard);
router.get('/product/:id', userController.viewProduct);
router.post('/add-to-cart/:id', userController.addToCart);
router.get('/cart', userController.viewCart);
router.post('/place-order', userController.placeOrder);
router.get('/my-orders', userController.viewOrders);
router.get('/logout', userController.logout);
router.get('/notification', userController.notification);

module.exports = router;
