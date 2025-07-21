const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

const manualClaimPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;
    if (!userId || typeof points !== 'number' || points < 1) {
      return res.status(400).json({ message: 'User ID and valid points are required' });
    }
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.totalPoints += points;
    await user.save();
    
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed: points,
    });
    await claimHistory.save();

    
    const allUsers = await User.find({}).sort({ totalPoints: -1 });
    for (let i = 0; i < allUsers.length; i++) {
      allUsers[i].rank = i + 1;
      await allUsers[i].save();
    }

    res.json({
      message: 'Manual points claimed successfully',
      user: user,
      pointsClaimed: points,
      claimHistory: {
        _id: claimHistory._id,
        user: { _id: user._id, name: user.name },
        points: points,
        createdAt: claimHistory.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming points manually', error: error.message });
  }
};

const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const randomPoints = Math.floor(Math.random() * 10) + 1;

    user.totalPoints += randomPoints;
    await user.save();

    const allUsers = await User.find({}).sort({ totalPoints: -1 });
    for (let i = 0; i < allUsers.length; i++) {
      allUsers[i].rank = i + 1;
      await allUsers[i].save();
    }

    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed: randomPoints,
    });
    await claimHistory.save();

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

const getClaimHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, userId } = req.query;
    const query = userId ? { userId } : {};
    const claimHistoryDocs = await ClaimHistory.find(query)
      .populate('userId', 'name')
      .sort({ claimedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await ClaimHistory.countDocuments(query);
    const claimHistory = claimHistoryDocs.map(doc => ({
      _id: doc._id,
      user: doc.userId ? { _id: doc.userId._id, name: doc.userId.name } : undefined,
      points: doc.pointsClaimed,
      createdAt: doc.createdAt || doc.claimedAt,
    }));
    res.json(claimHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claim history', error: error.message });
  }
};

module.exports = {
  claimPoints,
  getClaimHistory,
  manualClaimPoints,
};