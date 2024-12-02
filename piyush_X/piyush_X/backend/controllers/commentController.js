const Comment = require("../models/comment");

// Add Comment
const addComment = async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({ content, userId: req.user.id, tweetId });
    res.status(201).json({ message: "Comment added.", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Comments for a Tweet
const getComments = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const comments = await Comment.findAll({ where: { tweetId } });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addComment, getComments };
