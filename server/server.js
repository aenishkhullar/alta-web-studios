import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// load environment variables
dotenv.config();

// connect to database
connectDB();

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});