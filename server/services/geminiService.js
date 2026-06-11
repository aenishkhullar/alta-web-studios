import { GoogleGenerativeAI } from "@google/generative-ai";
import * as keyManager from "./keyManager.js";

const SYSTEM_PROMPT = `You are the AI Assistant for Alta Web Studios. You represent the company and its services professionally.

Alta Web Studios services:
* Website Design & Development
* Web Applications
* Mobile Applications
* CRM Systems
* Admin Dashboards
* AI Automation
* RAG Systems
* SEO (Search Engine Optimization)
* GEO (Generative Engine Optimization)
* AEO (Answer Engine Optimization)
* UI/UX Design

Keep responses concise, professional, and helpful.`;

/**
 * Checks if the thrown error is a quota, rate limit, or resource exhaustion error.
 * @param {Error} error 
 * @returns {boolean}
 */
const isQuotaError = (error) => {
    const message = (error.message || "").toUpperCase();
    const status = error.status || error.statusCode || 0;

    if (status === 429) return true;

    const quotaKeywords = [
        "RESOURCE_EXHAUSTED",
        "QUOTA_EXCEEDED",
        "RATE_LIMIT_EXCEEDED",
        "429",
        "QUOTA",
        "LIMIT"
    ];

    return quotaKeywords.some(keyword => message.includes(keyword));
};

/**
 * Generate a response using the active Gemini API key.
 * Rotates and retries if a key returns a quota/rate-limit error.
 * @param {string} message 
 * @returns {Promise<string>}
 */
export const generateResponse = async (message) => {
    const totalKeys = keyManager.getTotalKeys();
    if (totalKeys === 0) {
        console.error("[Gemini] All keys exhausted");
        throw new Error("No available Gemini API keys configured.");
    }

    let attempts = 0;
    while (attempts < totalKeys) {
        const activeIndex = keyManager.getCurrentKeyIndex();
        const activeKey = keyManager.getCurrentKey();
        
        console.log(`[Gemini] Active Key: #${activeIndex + 1}`);

        try {
            const genAI = new GoogleGenerativeAI(activeKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: SYSTEM_PROMPT,
            });

            const result = await model.generateContent(message);
            const response = await result.response;
            const text = response.text();

            console.log(`[Gemini] Request successful using Key #${activeIndex + 1}`);
            return text;
        } catch (error) {
            attempts++;
            
            if (isQuotaError(error) && attempts < totalKeys) {
                console.warn(`[Gemini] Key #${activeIndex + 1} exhausted`);
                const nextIndex = keyManager.rotateKey() + 1;
                console.log(`[Gemini] Switching to Key #${nextIndex}`);
            } else {
                // If it is a non-quota error or we have tried all keys, rethrow
                if (attempts >= totalKeys) {
                    console.error("[Gemini] All keys exhausted");
                }
                throw error;
            }
        }
    }

    console.error("[Gemini] All keys exhausted");
    throw new Error("All keys exhausted");
};
