const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

connectDB();
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

module.exports = app;
