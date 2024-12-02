const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tweet = require('./tweet');

const Hashtag = sequelize.define('Hashtag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

const TweetHashtag = sequelize.define('TweetHashtag', {}, { timestamps: false });

Hashtag.belongsToMany(Tweet, { through: TweetHashtag });
Tweet.belongsToMany(Hashtag, { through: TweetHashtag });

module.exports = Hashtag;