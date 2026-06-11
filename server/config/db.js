import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // Seed default admin if none exist
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            await Admin.create({
                name: "Alta Admin",
                email: "admin@alta.com",
                password: "password123",
                role: "super-admin",
                isActive: true
            });
            console.log("Default admin seeded: admin@alta.com / password123");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
