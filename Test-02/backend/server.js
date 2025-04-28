const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const carRoutes = require('./routes/carRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/jobs', jobRoutes);

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });
