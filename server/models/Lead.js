import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    if (!v) return true;
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: "Please provide a valid email address"
            }
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        company: {
            type: String,
            trim: true,
            default: "",
        },
        website: {
            type: String,
            trim: true,
            default: "",
        },
        budget: {
            type: String,
            trim: true,
            default: "",
        },
        message: {
            type: String,
            trim: true,
            default: "",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        source: {
            type: String,
            trim: true,
            default: "Manual",
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
            default: "New",
        },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
