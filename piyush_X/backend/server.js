const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const hashtagRoutes = require('./routes/hashtagRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/hashtags', hashtagRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Middleware
app.use(errorHandler);

// Database Sync and Server Start
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});