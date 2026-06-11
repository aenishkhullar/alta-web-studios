import dotenv from "dotenv";

// Load environment variables if not already loaded
dotenv.config();

const keys = Object.keys(process.env)
    .filter(key => key.startsWith("GEMINI_API_KEY_"))
    .sort((a, b) => {
        const numA = parseInt(a.replace("GEMINI_API_KEY_", ""), 10);
        const numB = parseInt(b.replace("GEMINI_API_KEY_", ""), 10);
        return numA - numB;
    })
    .map(key => process.env[key])
    .filter(val => val && val.trim() !== "");

export default keys;
