const Like = require('../models/like');
const Tweet = require('../models/tweet');

exports.likeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) return res.status(404).json({ error: 'Tweet not found' });

    const [like, created] = await Like.findOrCreate({ where: { tweetId, userId: req.user.id } });
    if (!created) return res.status(400).json({ error: 'Already liked this tweet' });

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like tweet' });
  }
};

exports.unlikeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const like = await Like.findOne({ where: { tweetId, userId: req.user.id } });
    if (!like) return res.status(404).json({ error: 'Like not found' });

    await like.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to unlike tweet' });
  }
};