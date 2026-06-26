import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Protect routes by verifying the JWT Bearer token
 */
export const protect = async (req, res, next) => {
    let token;

    console.log("[AUTH AUDIT] Incoming Request path:", req.path);
    console.log("[AUTH AUDIT] Incoming Authorization header:", req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")) {
        try {
            // Get token from header (removes Bearer prefix case-insensitively)
            token = req.headers.authorization.replace(/^Bearer\s+/i, "");
            console.log("[AUTH AUDIT] Extracted token:", token ? `${token.substring(0, 15)}... [length: ${token.length}]` : "empty");

            // Verify token
            console.log("[AUTH AUDIT] Verifying token with JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("[AUTH AUDIT] JWT verification success. Decoded payload:", decoded);

            // Fetch admin user associated with token (excluding password)
            req.admin = await Admin.findById(decoded.id).select("-password");
            console.log("[AUTH AUDIT] Fetch admin from DB result:", req.admin ? `Found (ID: ${req.admin._id}, Active: ${req.admin.isActive})` : "Not Found");

            if (!req.admin) {
                console.log("[AUTH AUDIT] 401 Unauthorized: Admin user not found in DB for ID:", decoded.id);
                return sendError(res, "Not authorized, user not found", 401);
            }

            if (!req.admin.isActive) {
                console.log("[AUTH AUDIT] 401 Unauthorized: Admin user account is deactivated for ID:", decoded.id);
                return sendError(res, "Not authorized, user account is deactivated", 401);
            }

            console.log("[AUTH AUDIT] Authentication successful for:", req.admin.email);
            next();
        } catch (error) {
            console.error("[AUTH AUDIT] JWT Verification failure/error:", error.message);
            console.log("[AUTH AUDIT] 401 Unauthorized: Token invalid or expired");
            return sendError(res, "Not authorized, token invalid or expired", 401);
        }
    }

    if (!token) {
        console.log("[AUTH AUDIT] 401 Unauthorized: No Bearer token provided in authorization header");
        return sendError(res, "Not authorized, no token provided", 401);
    }
};
