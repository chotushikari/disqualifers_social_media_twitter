import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";  // Use named import
import bcrypt from "bcryptjs";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "Username is required" },
            notEmpty: { msg: "Username cannot be empty" },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Must be a valid email address" },
            notNull: { msg: "Email is required" },
            notEmpty: { msg: "Email cannot be empty" },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Password is required" },
            notEmpty: { msg: "Password cannot be empty" },
        },
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    hooks: {
        // Hash password before saving user
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
    }
});

// Method to check if the password is correct
User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;
