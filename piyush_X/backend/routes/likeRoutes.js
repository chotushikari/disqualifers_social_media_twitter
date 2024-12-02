const express = require('express');
const { likeTweet, unlikeTweet } = require('../controllers/likeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/like', authMiddleware, likeTweet);    // Like a tweet
router.post('/unlike', authMiddleware, unlikeTweet); // Unlike a tweet

module.exports = router;