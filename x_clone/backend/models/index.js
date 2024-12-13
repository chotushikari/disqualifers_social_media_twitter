import { Sequelize } from "sequelize";
import { User } from "./user.model.js";  // Correct import for named export
import Post from "./post.model.js";
import Comment from "./comment.model.js";
import Notification from "./notification.model.js";
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
    "x_database", // Database name
    "root", // Database user
    "qwe123!", // Database password
    {
        host: "localhost",
        port: "3306", // Database host
        dialect: "mysql", // Using MySQL
        logging: false, // Disable SQL query logging
    }
);

const models = {
    User,  // Adding User model here
    Post,
    Comment,
    Notification,
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;




// Export the models object and the sequelize instance
export { models, sequelize };

// Also export User separately
export { User };
