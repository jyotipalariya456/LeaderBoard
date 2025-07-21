const express = require('express');
const { getAllUsers, createUser, initializeUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);


router.post('/', createUser);
router.post('/initialize', initializeUsers);

module.exports = router;