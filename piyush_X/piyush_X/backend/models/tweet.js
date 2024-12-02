const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tweet = sequelize.define("Tweet", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING, // URL of attached media
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Tweet;
