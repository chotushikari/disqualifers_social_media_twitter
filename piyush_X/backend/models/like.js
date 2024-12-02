const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Tweet = require('./tweet');

const Like = sequelize.define('Like', {}, { timestamps: true });

Like.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Like.belongsTo(Tweet, { foreignKey: 'tweetId', onDelete: 'CASCADE' });
Tweet.hasMany(Like, { foreignKey: 'tweetId' });
User.hasMany(Like, { foreignKey: 'userId' });

module.exports = Like;