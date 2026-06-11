import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        company: {
            type: String,
            trim: true,
            default: "",
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
        website: {
            type: String,
            trim: true,
            default: "",
        },
        industry: {
            type: String,
            trim: true,
            default: "",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["Active", "Onboarding", "Paused", "Completed"],
            default: "Onboarding",
        },
        sourceLeadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
