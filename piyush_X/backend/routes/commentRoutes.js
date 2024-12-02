const express = require('express');
const {
  createComment,
  getCommentsByTweet,
  deleteComment,
} = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createComment);    // Add a comment to a tweet
router.get('/:tweetId', authMiddleware, getCommentsByTweet); // Get comments for a tweet
router.delete('/:id', authMiddleware, deleteComment); // Delete a comment by ID

module.exports = router;