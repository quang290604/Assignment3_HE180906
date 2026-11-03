const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

// Đăng ký routes
const authRoutes = require('./routes/auth.route');
const classRoutes = require('./routes/class.route');

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));