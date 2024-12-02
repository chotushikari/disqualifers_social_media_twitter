const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Tweet = require('./tweet');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING(280), // Same length limit as tweets
    allowNull: false,
  },
}, {
  timestamps: true,
});

Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Tweet, { foreignKey: 'tweetId', onDelete: 'CASCADE' });
Tweet.hasMany(Comment, { foreignKey: 'tweetId' });
User.hasMany(Comment, { foreignKey: 'userId' });

module.exports = Comment;