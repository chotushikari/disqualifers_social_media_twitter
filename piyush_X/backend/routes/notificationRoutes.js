const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getNotifications); // Get notifications for the logged-in user

module.exports = router;