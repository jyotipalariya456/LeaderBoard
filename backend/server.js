const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claims');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Leaderboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});