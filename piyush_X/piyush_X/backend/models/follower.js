// models/follower.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Follower = sequelize.define("Follower", {
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",  // Reference to the 'Users' table
      key: "id"
    },
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",  // Reference to the 'Users' table
      key: "id"
    },
  },
});

module.exports = Follower;
