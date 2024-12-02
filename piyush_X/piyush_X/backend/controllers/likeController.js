const Like = require("../models/like");
const Tweet = require("../models/tweet");

// Like a Tweet
const likeTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) return res.status(404).json({ message: "Tweet not found." });

    const like = await Like.findOne({ where: { tweetId, userId: req.user.id } });
    if (like) return res.status(400).json({ message: "Tweet already liked." });

    await Like.create({ tweetId, userId: req.user.id });
    res.status(201).json({ message: "Tweet liked." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unlike a Tweet
const unlikeTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const like = await Like.findOne({ where: { tweetId, userId: req.user.id } });
    if (!like) return res.status(404).json({ message: "Like not found." });

    await like.destroy();
    res.status(200).json({ message: "Tweet unliked." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { likeTweet, unlikeTweet };
