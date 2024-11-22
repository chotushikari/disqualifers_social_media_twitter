import express from 'express';
import { sequelize } from './models/index.js'; // Make sure it's correctly imported

const app = express();

// Ensure database connection is established
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
