const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/errorHandler");
const sequelize = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import Models (only once per model)
const User = require("./models/user");
const Tweet = require("./models/tweet");
const Follower = require("./models/follower");
const Notification = require("./models/notification");
const Like = require("./models/like");
const Comment = require("./models/comment");
const Hashtag = require("./models/hashtag");

// Define relationships between models
User.hasMany(Tweet, { foreignKey: "userId" });
Tweet.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(User, {
  as: "Followers",
  through: Follower,
  foreignKey: "followingId",
});

Tweet.hasMany(Comment, { foreignKey: "tweetId" });
Comment.belongsTo(Tweet, { foreignKey: "tweetId" });

Tweet.hasMany(Like, { foreignKey: "tweetId" });
Like.belongsTo(Tweet, { foreignKey: "tweetId" });

Tweet.belongsToMany(Hashtag, { through: "TweetHashtag" });
Hashtag.belongsToMany(Tweet, { through: "TweetHashtag" });

// Test database connection
sequelize.sync().then(() => {
  console.log("Database synced successfully.");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tweets", require("./routes/tweetRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/hashtags", require("./routes/hashtagRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
sequelize.sync({ force: true }).then(() => {
    console.log("Database synced successfully.");
});
  