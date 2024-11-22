import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// User routes for login, signup, and viewing the current user
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected route to get the current user data
router.get("/me", protectRoute, getMe);

export default router;
