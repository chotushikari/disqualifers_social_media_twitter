const Comment = require('../models/comment');
const Tweet = require('../models/tweet');

exports.createComment = async (req, res) => {
  const { tweetId, content } = req.body;
  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) return res.status(404).json({ error: 'Tweet not found' });

    const comment = await Comment.create({ tweetId, userId: req.user.id, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

exports.getCommentsByTweet = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { tweetId } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment || comment.userId !== req.user.id)
      return res.status(403).json({ error: 'Not authorized to delete comment' });

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};