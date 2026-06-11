import express from "express";
import {
    getDeliverables,
    createDeliverable,
    getDeliverableById,
    updateDeliverable,
    deleteDeliverable
} from "../controllers/deliverableController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect middleware to all deliverable routes
router.use(protect);

router.get("/", getDeliverables);
router.post("/", createDeliverable);
router.get("/:id", getDeliverableById);
router.put("/:id", updateDeliverable);
router.delete("/:id", deleteDeliverable);

export default router;
