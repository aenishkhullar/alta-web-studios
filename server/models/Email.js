import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: [true, "Sender address is required"],
            default: "Alta Web Studios Team <team@altawebstudios.xyz>",
        },
        to: {
            type: String,
            required: [true, "Recipient address is required"],
            trim: true,
        },
        cc: {
            type: String,
            trim: true,
            default: "",
        },
        bcc: {
            type: String,
            trim: true,
            default: "",
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
        },
        html: {
            type: String,
            required: [true, "HTML body is required"],
        },
        text: {
            type: String,
            default: "",
        },
        attachments: [
            {
                filename: { type: String, required: true },
                content: { type: String }, // Base64 content to send to Resend
                contentType: { type: String },
                size: { type: Number },
            }
        ],
        status: {
            type: String,
            enum: ["draft", "sent", "failed"],
            default: "draft",
        },
        sentAt: {
            type: Date,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: [true, "Creator admin reference is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
