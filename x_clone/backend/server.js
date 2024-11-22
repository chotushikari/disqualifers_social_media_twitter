import express from 'express';
import path from "path";
import { sequelize } from './models/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';

const app = express();

// Middleware


const corsOptions = {
    origin: process.env.NODE_ENV === "production" ? "https://your-production-domain.com" : "*",
    credentials: true, // Allow credentials for cookies
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());
console.log("Environment:", process.env.NODE_ENV);


// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

sequelize.sync({ alter: true }) // Update the database schema
    .then(() => {
        console.log("Database synchronized successfully");
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });

  