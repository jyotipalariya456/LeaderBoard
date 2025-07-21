const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points for a user
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate random points between 1 and 10
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    user.totalPoints += randomPoints;
    await user.save();

    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed: randomPoints,
    });
    await claimHistory.save();

    // Return the updated user and claimed points
    res.json({
      message: 'Points claimed successfully',
      user: user,
      pointsClaimed: randomPoints,
      claimHistory: claimHistory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming points', error: error.message });
  }
};

// Get claim history
const getClaimHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, userId } = req.query;
    
    const query = userId ? { userId } : {};
    
    const claimHistory = await ClaimHistory.find(query)
      .populate('userId', 'name')
      .sort({ claimedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ClaimHistory.countDocuments(query);

    res.json({
      claimHistory,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claim history', error: error.message });
  }
};

module.exports = {
  claimPoints,
  getClaimHistory,
};