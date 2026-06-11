import geminiKeys from "../config/geminiKeys.js";

let currentIndex = 0;
const keys = geminiKeys;

/**
 * Get the currently active Gemini API key.
 * @returns {string|null}
 */
export const getCurrentKey = () => {
    if (keys.length === 0) return null;
    return keys[currentIndex];
};

/**
 * Rotates to the next available Gemini API key.
 * Wraps around to 0 if the end of the keys array is reached.
 * @returns {number} The new active index.
 */
export const rotateKey = () => {
    if (keys.length === 0) return 0;
    currentIndex = (currentIndex + 1) % keys.length;
    return currentIndex;
};

/**
 * Get the 0-based index of the currently active Gemini API key.
 * @returns {number}
 */
export const getCurrentKeyIndex = () => {
    return currentIndex;
};

/**
 * Get the total number of valid Gemini API keys found.
 * @returns {number}
 */
export const getTotalKeys = () => {
    return keys.length;
};
