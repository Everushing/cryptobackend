const express = require('express');
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 4000; // Choose your port

// connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://erushing89:Brook2010@cluster1.v1vopqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors()); 
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api/data', dataRoutes); 

// In-memory user data (replace with a database later)
let users = [];

// JWT secret (keep this secure in a real application)
const JWT_SECRET = 'your_secret_key'; 

// Routes
app.post('/api/signup', async (req, res) => {
  // ... (signup logic)
});

app.post('/api/login', async (req, res) => {
  // ... (login logic)
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Close the connection when the app terminates
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });