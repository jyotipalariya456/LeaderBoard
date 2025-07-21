const User = require('../models/User');

// Get all users with rankings
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Update rankings
    const usersWithRanks = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    // Update ranks in database
    for (let i = 0; i < usersWithRanks.length; i++) {
      await User.findByIdAndUpdate(usersWithRanks[i]._id, { rank: i + 1 });
    }

    res.json(usersWithRanks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name: name.trim(),
      totalPoints: 0,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Initialize default users
const initializeUsers = async (req, res) => {
  try {
    const defaultUsers = ['Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 'Sneha', 'Rajesh', 'Kavya', 'Vikram', 'Anita'];
    
    for (const userName of defaultUsers) {
      const existingUser = await User.findOne({ name: userName });
      if (!existingUser) {
        await User.create({ name: userName, totalPoints: 0 });
      }
    }

    const users = await User.find().sort({ totalPoints: -1 });
    res.json({ message: 'Users initialized successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing users', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  initializeUsers,
};