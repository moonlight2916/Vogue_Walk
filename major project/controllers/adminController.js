const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/Order');

// Show Admin Login Page
exports.showLogin = (req, res) => {
    res.render('admin/login');
};

// Handle Admin Login
exports.loginAdmin = (req, res) => {
    if (req.body.email === 'Vogue_Walk@123' && req.body.password === 'Vogue_Walk') {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
};

// Show Dashboard
exports.dashboard = (req, res) => {
    res.render('admin/dashboard');
};

// Show Add Product Page
exports.showAddProduct = (req, res) => {
    res.render('admin/addProduct');
};

// Add Product to DB
exports.addProduct = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/admin/dashboard');
};
exports.addProductPage = (req, res) => {
  res.render('admin/addProduct');
};

exports.addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  await Product.create({ name, description, price, image });
  res.redirect('/admin/dashboard');
};

// View All Orders
exports.viewOrders = async (req, res) => {
    const orders = await Order.find();
    res.render('admin/orders', { orders });
};

// View All Users
exports.viewCustomers = async (req, res) => {
    const users = await User.find();
    res.render('admin/customers', { users });
};

// Admin Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};
