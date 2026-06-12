import express from "express";
import {
    sendEmail,
    saveDraft,
    getEmails,
    getEmailById,
    deleteEmail,
} from "../controllers/emailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect middleware to make routes private (Admin-only)
router.use(protect);

router.post("/send", sendEmail);
router.post("/draft", saveDraft);
router.get("/", getEmails);
router.get("/:id", getEmailById);
router.delete("/:id", deleteEmail);

export default router;
