import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    convertLeadToClient
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lead CRUD routes
router.post("/", createLead); // Public lead creation (e.g. from web contact forms)
router.get("/", protect, getLeads);
router.post("/:id/convert", protect, convertLeadToClient);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;
