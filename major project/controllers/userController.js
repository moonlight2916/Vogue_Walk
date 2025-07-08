const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Show Register Page
exports.showRegister = (req, res) => {
  res.render('user/register');
};

// Handle Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send('User already exists');
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.redirect('/user/login');
};

// Show Login Page
exports.showLogin = (req, res) => {
  res.render('user/login');
};

// Handle Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.send("Invalid credentials");
  }

  req.session.user = user;
  res.redirect('/user/dashboard');
};

// Dashboard - Show all products
exports.userDashboard = async (req, res) => {
  const products = await Product.find({});
  res.render('user/dashboard', { products });
};

// View individual product
exports.viewProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('user/product', { product });
};

// Add product to cart
exports.addToCart = async (req, res) => {
  if (!req.session.user) return res.redirect('/user/login');

  const userId = req.session.user._id;
  const productId = req.params.id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity: 1 }]
    });
  } else {
  const existingItem = cart.products.find(
  item => item.productId && item.productId.toString() === productId
);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
  }

  await cart.save();
  res.redirect('/user/cart');
};

// View Cart
exports.viewCart = async (req, res) => {
  if (!req.session.user) return res.redirect('/user/login');

  const userId = req.session.user._id;
  const cart = await Cart.findOne({ userId }).populate('products.productId');

  res.render('user/cart', { cart });
};

// Place Order (Cash on Delivery)
exports.placeOrder = async (req, res) => {
  if (!req.session.user) return res.redirect('/user/login');

  const userId = req.session.user._id;
  const { address } = req.body;

  const cart = await Cart.findOne({ userId }).populate('products.productId');

  if (!cart || !cart.products || cart.products.length === 0) {
    return res.send("Cart is empty.");
  }

  // ✅ Filter out invalid items (like deleted products)
  const validProducts = cart.products.filter(item => item.productId && item.productId.price);

  if (validProducts.length === 0) {
    return res.send("All products in the cart are no longer available.");
  }

  // ✅ Calculate total
  const total = validProducts.reduce((sum, item) => {
    return sum + (item.productId.price * item.quantity);
  }, 0);

  const order = new Order({
    userId,
    products: validProducts,
    address,
    total
  });

  await order.save();
  await Cart.deleteOne({ userId });

  res.redirect('/user/notification');
};

// Order Notification
exports.notification = (req, res) => {
  res.render('user/notification');
};

// View My Orders
exports.viewOrders = async (req, res) => {
  if (!req.session.user) return res.redirect('/user/login');

  const userId = req.session.user._id;
  const orders = await Order.find({ userId }).populate('products.productId');
  res.render('user/orders', { orders });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/user/login');
};
