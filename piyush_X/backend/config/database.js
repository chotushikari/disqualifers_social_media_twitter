const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

// Extract environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT || "mysql", // Default to MySQL if dialect is not set
  
  logging: false, // Disable logging; change to `console.log` for debugging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Export the sequelize instance to use in models
module.exports = sequelize;
