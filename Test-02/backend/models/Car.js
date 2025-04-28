const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  licensePlate: String,
  model: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', carSchema);
