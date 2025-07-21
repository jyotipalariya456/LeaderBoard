const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

userSchema.index({ totalPoints: -1 });

module.exports = mongoose.model('User', userSchema);