const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // 💡 This is the image URL
});

module.exports = mongoose.model('Product', productSchema);
