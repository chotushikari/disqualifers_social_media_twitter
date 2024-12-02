const Tweet = require("../models/tweet");

// Create Tweet
const createTweet = async (req, res) => {
  const { content, media } = req.body;

  try {
    const tweet = await Tweet.create({ content, media, userId: req.user.id });
    res.status(201).json({ message: "Tweet created", tweet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Tweets
const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll();
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Tweet
const deleteTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) return res.status(404).json({ message: "Tweet not found." });

    if (tweet.userId !== req.user.id) return res.status(403).json({ message: "Not authorized." });

    await tweet.destroy();
    res.status(200).json({ message: "Tweet deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createTweet, getTweets, deleteTweet };
