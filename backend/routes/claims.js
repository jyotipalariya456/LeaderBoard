const express = require('express');
const { claimPoints, getClaimHistory, manualClaimPoints } = require('../controllers/claimController');

const router = express.Router();
router.post('/', claimPoints);
router.post('/manual', manualClaimPoints);
router.get('/history', getClaimHistory);

module.exports = router;