const express = require('express');
const {
  createTweet,
  getTweet,
  deleteTweet,
} = require('../controllers/tweetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTweet);    // Create a new tweet
router.get('/:id', authMiddleware, getTweet);    // Get a tweet by ID
router.delete('/:id', authMiddleware, deleteTweet); // Delete a tweet by ID

module.exports = router;