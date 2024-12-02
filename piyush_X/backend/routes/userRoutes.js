const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, getUserProfile); // Get user profile by ID

module.exports = router;