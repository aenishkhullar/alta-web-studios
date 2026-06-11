import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Protect routes by verifying the JWT Bearer token
 */
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch admin user associated with token (excluding password)
            req.admin = await Admin.findById(decoded.id).select("-password");

            if (!req.admin) {
                return sendError(res, "Not authorized, user not found", 401);
            }

            if (!req.admin.isActive) {
                return sendError(res, "Not authorized, user account is deactivated", 401);
            }

            next();
        } catch (error) {
            console.error("JWT Verification error:", error.message);
            return sendError(res, "Not authorized, token invalid or expired", 401);
        }
    }

    if (!token) {
        return sendError(res, "Not authorized, no token provided", 401);
    }
};
