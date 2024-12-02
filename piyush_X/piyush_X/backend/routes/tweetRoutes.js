const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
// const { validateTweet } = require("../middlewares/validateMiddleware");
const { createTweet, getTweets, deleteTweet } = require("../controllers/tweetController");
const router = express.Router();
const { likeTweet, unlikeTweet } = require("../controllers/likeController");
const { addComment, getComments } = require("../controllers/commentController");

router.post("/:tweetId/comments", authMiddleware, addComment);
router.get("/:tweetId/comments", getComments);

router.post("/:tweetId/like", authMiddleware, likeTweet);
router.delete("/:tweetId/like", authMiddleware, unlikeTweet);

router.post("/", authMiddleware, createTweet);
router.get("/", getTweets);
router.delete("/:tweetId", authMiddleware, deleteTweet);

module.exports = router;
