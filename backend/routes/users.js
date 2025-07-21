const express = require('express');
const { getAllUsers, createUser, initializeUsers } = require('../controllers/userController');

const router = express.Router();

// GET /api/users - Get all users with rankings
router.get('/', getAllUsers);

// POST /api/users - Create a new user
router.post('/', createUser);

// POST /api/users/initialize - Initialize default users
router.post('/initialize', initializeUsers);

module.exports = router;