import express from "express";
import { getAIStatus, chatWithAI } from "../controllers/aiController.js";

const router = express.Router();

router.get("/status", getAIStatus);
router.post("/chat", chatWithAI);

export default router;
