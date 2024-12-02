const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Assuming User model is already defined

const Tweet = sequelize.define('Tweet', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // Content must not be null
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Associate each tweet with a user
    references: {
      model: 'Users', // Matches the table name for the User model
      key: 'id',
    },
  },
});

// Establish associations
Tweet.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Tweet, { foreignKey: 'userId', as: 'tweets' });

module.exports = Tweet;