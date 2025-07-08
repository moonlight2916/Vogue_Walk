const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  address: String,
  total: Number,
  status: { type: String, default: 'Placed' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
