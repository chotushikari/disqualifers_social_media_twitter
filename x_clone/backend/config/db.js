import { Sequelize } from "sequelize";
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

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error.message);
		process.exit(1);
	}
};

export { sequelize, connectDB };
