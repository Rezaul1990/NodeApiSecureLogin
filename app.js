const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Use Routes
app.use('/api', userRoutes);

module.exports = app;
