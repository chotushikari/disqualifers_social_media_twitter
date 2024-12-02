const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getNotifications, markAsRead } = require("../controllers/notificationController");
const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.patch("/:notificationId", authMiddleware, markAsRead);

module.exports = router;
