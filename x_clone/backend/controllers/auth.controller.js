import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";  // Correct import
import { generateToken } from "../lib/utils/generateToken.js";

// Signup controller
export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Validate input
		if (!username || !email || !password) {
			return res.status(400).json({ error: "All fields are required." });
		}

		// Check if user exists
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ error: "Email already in use." });
		}

		// Hash password and create user
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		// Generate JWT
		const token = generateToken(user.id);

		// Set cookie and return response
		res.cookie("jwt", token, { httpOnly: true, secure: true });
		return res.status(201).json({ message: "Signup successful.", user });
	} catch (err) {
		console.error("Signup error:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Login controller
// Login controller
export const login = async (req, res) => {
    try {
        const { username, password } = req.body; // Change 'email' to 'username'

        // Validate input
        if (!username || !password) { // Update validation
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if user exists
        const user = await User.findOne({ where: { username } }); // Query by username
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // Generate JWT
        const token = generateToken(user.id);

        // Set cookie and return response
        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" ,sameSite: "strict", });
        return res.status(200).json({ message: "Login successful.", user });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


// Logout controller
export const logout = (req, res) => {
	try {
		// Clear the cookie
		res.clearCookie("jwt");
		return res.status(200).json({ message: "Logout successful." });
	} catch (err) {
		console.error("Logout error:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Get currently logged-in user
export const getMe = async (req, res) => {
	try {
		const user = req.user; // Extracted from protectRoute middleware
		return res.status(200).json({ user });
	} catch (err) {
		console.error("GetMe error:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
