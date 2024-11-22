import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {});

Notification.associate = (models) => {
    // A notification belongs to a user
    Notification.belongsTo(models.User, { foreignKey: "userId" });
};

export default Notification;
