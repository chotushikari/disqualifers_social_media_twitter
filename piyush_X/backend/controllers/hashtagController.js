const Hashtag = require('../models/hashtag');
const Tweet = require('../models/tweet');

exports.getTweetsByHashtag = async (req, res) => {
  const { tag } = req.params;
  try {
    const hashtag = await Hashtag.findOne({ where: { name: tag } });
    if (!hashtag) return res.status(404).json({ error: 'Hashtag not found' });

    const tweets = await hashtag.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweets for hashtag' });
  }
};