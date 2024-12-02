import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  "x_database", // Database name
  "root",       // Username
  "qwe123!",    // Password
  {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false, // Optional: Suppresses SQL query logs
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

export default sequelize;
