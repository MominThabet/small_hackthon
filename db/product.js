const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  discount: Number,
  offer: Number,
  featuresList: [String],
  newProduct: Boolean,
});

module.exports = mongoose.model('product', productSchema);
