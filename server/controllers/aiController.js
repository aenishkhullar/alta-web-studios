import { generateResponse } from "../services/geminiService.js";
import * as keyManager from "../services/keyManager.js";

/**
 * GET /api/ai/status
 * Returns key rotation details (excluding the keys themselves).
 */
export const getAIStatus = (req, res) => {
    try {
        const totalKeys = keyManager.getTotalKeys();
        const activeKeyIndex = keyManager.getCurrentKeyIndex();

        return res.status(200).json({
            success: true,
            availableKeys: totalKeys,
            activeKey: totalKeys > 0 ? activeKeyIndex + 1 : 0
        });
    } catch (error) {
        console.error("[AI Status Error]", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve AI status."
        });
    }
};

/**
 * POST /api/ai/chat
 * Accepts message from front-end chatbot, runs validation, and queries Gemini.
 */
export const chatWithAI = async (req, res) => {
    const { message } = req.body;

    // Reject empty messages
    if (!message || typeof message !== "string" || message.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Message cannot be empty."
        });
    }

    // Reject messages longer than 2000 characters
    if (message.length > 2000) {
        return res.status(400).json({
            success: false,
            message: "Message cannot exceed 2000 characters."
        });
    }

    try {
        const reply = await generateResponse(message.trim());
        return res.status(200).json({
            success: true,
            reply
        });
    } catch (error) {
        console.error("[AI Chat Controller Error]", error.message);
        
        // Security: Never return Gemini internal errors to users
        return res.status(503).json({
            success: false,
            message: "Alta AI is temporarily unavailable. Please try again later."
        });
    }
};
