import express from "express";
import rateLimit from "express-rate-limit";
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Define login rate limiter (5 requests per 15 minutes)
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per 15 minutes
    message: {
        success: false,
        message: "Too many login attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable X-RateLimit headers
});

// Auth endpoints
router.post("/register", registerAdmin);
router.post("/login", loginRateLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getCurrentAdmin);

export default router;
