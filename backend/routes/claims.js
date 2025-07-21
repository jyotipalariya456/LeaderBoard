const express = require('express');
const { claimPoints, getClaimHistory } = require('../controllers/claimController');

const router = express.Router();

// POST /api/claims - Claim points for a user
router.post('/', claimPoints);

// GET /api/claims/history - Get claim history
router.get('/history', getClaimHistory);

module.exports = router;