import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

// Get all notifications for the authenticated user
router.get("/", protectRoute, getNotifications);

// Delete all notifications for the authenticated user
router.delete("/", protectRoute, deleteNotifications);

export default router;
