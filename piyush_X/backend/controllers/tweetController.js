const Tweet = require('../models/tweet');
const Hashtag = require('../models/hashtag');

exports.createTweet = async (req, res) => {
  const { content } = req.body;
  try {
    const tweet = await Tweet.create({ content, userId: req.user.id });

    const hashtags = content.match(/#[a-zA-Z0-9_]+/g);
    if (hashtags) {
      for (let tag of hashtags) {
        const [hashtag] = await Hashtag.findOrCreate({ where: { name: tag.slice(1) } });
        await tweet.addHashtag(hashtag);
      }
    }

    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tweet' });
  }
};

exports.getTweet = async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet) return res.status(404).json({ error: 'Tweet not found' });

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweet' });
  }
};

exports.deleteTweet = async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet || tweet.userId !== req.user.id)
      return res.status(403).json({ error: 'Not authorized to delete tweet' });

    await tweet.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tweet' });
  }
};