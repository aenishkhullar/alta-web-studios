import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Register a new Admin user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerAdmin = async (req, res) => {
    const { name, email, password, role, avatar } = req.body;

    // 1. Validation
    if (!name || !name.trim()) {
        return sendError(res, "Name is required", 400);
    }
    if (!email || !email.trim()) {
        return sendError(res, "Email is required", 400);
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return sendError(res, "Please provide a valid email address", 400);
    }
    if (!password || password.length < 8) {
        return sendError(res, "Password must be at least 8 characters long", 400);
    }

    try {
        // 2. Check if admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return sendError(res, "Admin user with this email already exists", 400);
        }

        // 3. Create Admin
        const admin = await Admin.create({
            name,
            email,
            password,
            role: role || "admin",
            avatar: avatar || "",
        });

        if (admin) {
            const token = generateToken(admin._id);
            const adminResponse = {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                avatar: admin.avatar,
            };

            return sendSuccess(res, "Admin registered successfully", {
                token,
                admin: adminResponse,
            }, 201);
        } else {
            return sendError(res, "Invalid admin user data", 400);
        }
    } catch (error) {
        console.error("Register Admin Error:", error);
        return sendError(res, "Server error during registration", 500);
    }
};

/**
 * @desc    Authenticate Admin & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !email.trim()) {
        return sendError(res, "Email is required", 400);
    }
    if (!password) {
        return sendError(res, "Password is required", 400);
    }

    try {
        // 2. Find Admin by email
        const admin = await Admin.findOne({ email });

        // 3. Verify Admin exists and password matches
        if (admin && (await admin.matchPassword(password))) {
            if (!admin.isActive) {
                return sendError(res, "Admin account is deactivated. Contact super-admin.", 403);
            }

            // 4. Update lastLogin
            admin.lastLogin = new Date();
            await admin.save();

            const token = generateToken(admin._id);
            const adminResponse = {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                avatar: admin.avatar,
            };

            return sendSuccess(res, "Login successful", {
                token,
                admin: adminResponse,
            }, 200);
        } else {
            return sendError(res, "Invalid email or password", 401);
        }
    } catch (error) {
        console.error("Login Admin Error:", error);
        return sendError(res, "Server error during login", 500);
    }
};

/**
 * @desc    Logout admin user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logoutAdmin = async (req, res) => {
    try {
        // Standard success response for stateless JWT logout (can be cleared client-side)
        return sendSuccess(res, "Logout successful", {}, 200);
    } catch (error) {
        console.error("Logout Admin Error:", error);
        return sendError(res, "Server error during logout", 500);
    }
};

/**
 * @desc    Get current logged-in Admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentAdmin = async (req, res) => {
    try {
        if (!req.admin) {
            return sendError(res, "User profile not found", 404);
        }

        const adminProfile = {
            id: req.admin._id,
            name: req.admin.name,
            email: req.admin.email,
            role: req.admin.role,
            avatar: req.admin.avatar,
        };

        return sendSuccess(res, "Admin profile retrieved successfully", adminProfile, 200);
    } catch (error) {
        console.error("Get Current Admin Error:", error);
        return sendError(res, "Server error retrieving profile", 500);
    }
};
