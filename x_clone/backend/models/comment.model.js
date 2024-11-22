import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {});

Comment.associate = (models) => {
    // A comment belongs to a post
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
    // A comment belongs to a user
    Comment.belongsTo(models.User, { foreignKey: "userId" });
};

export default Comment;
