const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Hashtag = sequelize.define("Hashtag", {
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = Hashtag;
