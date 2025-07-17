const mongoose = require('mongoose');

const tokenPriceSchema = new mongoose.Schema({
  token: String,
  network: String,
  date: String, // YYYY-MM-DD
  timestamp: Number, // Unix timestamp for that date
  price: Number,
}, { timestamps: true });

module.exports = mongoose.model('TokenPrice', tokenPriceSchema);
