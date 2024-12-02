const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;
