import jwt from "jsonwebtoken";

/**
 * Generate a JWT for an Admin user
 * @param {string} id - Admin user ID
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
    let expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    
    // Defensive check: If expiresIn is set to a short duration (e.g. seconds, minutes), override to "7d"
    if (/^\d+(s|m|sec|min)?$/i.test(expiresIn)) {
        expiresIn = "7d";
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn,
    });
};

export default generateToken;
