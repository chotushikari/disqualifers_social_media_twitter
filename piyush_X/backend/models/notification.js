const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Notification = sequelize.define('Notification', {
  type: {
    type: DataTypes.ENUM('like', 'comment', 'mention', 'follow'),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Notification.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Notification, { foreignKey: 'userId' });

module.exports = Notification;