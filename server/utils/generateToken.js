import jwt from "jsonwebtoken";

/**
 * Generate a JWT for an Admin user
 * @param {string} id - Admin user ID
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

export default generateToken;
