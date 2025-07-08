const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/saroco')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Session setup
app.use(session({
    secret: 'secret_saroco',
    resave: false,
    saveUninitialized: false
}));

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
// Redirect root to user login
app.get('/', (req, res) => {
  res.redirect('/user/login');
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.use('/user', userRoutes);
app.get('/cart', (req, res) => {
  res.redirect('/user/cart');
});

app.listen(2000, () => console.log('Server running on http://localhost:2000'));
