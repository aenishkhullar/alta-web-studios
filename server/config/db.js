import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Client from "../models/Client.js";

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

        // Backfill Client IDs for existing clients that don't have one
        const clientsWithoutId = await Client.find({
            $or: [
                { clientId: { $exists: false } },
                { clientId: null },
                { clientId: "" }
            ]
        });
        if (clientsWithoutId.length > 0) {
            console.log(`Backfilling Client IDs for ${clientsWithoutId.length} existing clients...`);
            for (const client of clientsWithoutId) {
                await client.save();
            }
            console.log("Client ID backfill completed.");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
