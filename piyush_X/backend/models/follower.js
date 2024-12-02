const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Follower = sequelize.define('Follower', {}, { timestamps: true });

Follower.belongsTo(User, { as: 'follower', foreignKey: 'followerId', onDelete: 'CASCADE' });
Follower.belongsTo(User, { as: 'following', foreignKey: 'followingId', onDelete: 'CASCADE' });

User.hasMany(Follower, { as: 'followers', foreignKey: 'followingId' });
User.hasMany(Follower, { as: 'followings', foreignKey: 'followerId' });

module.exports = Follower;