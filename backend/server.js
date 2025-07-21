const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claims');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Leaderboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});