const Hashtag = require("../models/hashtag");
const Tweet = require("../models/tweet");

// Get Tweets by Hashtag
const getTweetsByHashtag = async (req, res) => {
  const { tag } = req.params;

  try {
    const hashtag = await Hashtag.findOne({ where: { tag } });
    if (!hashtag) return res.status(404).json({ message: "Hashtag not found." });

    const tweets = await hashtag.getTweets();
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getTweetsByHashtag };
