import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {});

Post.associate = (models) => {
    // A post belongs to a user
    Post.belongsTo(models.User, { foreignKey: "userId" });
    // A post can have many comments
    Post.hasMany(models.Comment, { foreignKey: "postId" });
};

export default Post;
