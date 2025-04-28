const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
