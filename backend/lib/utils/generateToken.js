import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a user
 * @param {Object} user - The user object
 * @returns {string} - JWT token
 */
export const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
