import jwt from "jsonwebtoken";
import { models } from "../models/index.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }

        const user = await models.User.findByPk(decoded.userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (err) {
        console.error("Error in protectRoute middleware: ", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
