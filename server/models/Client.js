import mongoose from "mongoose";
import generateClientId from "../utils/generateClientId.js";

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
        clientId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to generate unique Client ID if not present
clientSchema.pre("save", async function() {
    if (!this.clientId) {
        let isUnique = false;
        let generatedId = "";
        while (!isUnique) {
            generatedId = generateClientId();
            const existingClient = await this.constructor.findOne({ clientId: generatedId });
            if (!existingClient) {
                isUnique = true;
            }
        }
        this.clientId = generatedId;
    }
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
