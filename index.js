const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
