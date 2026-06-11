import mongoose from "mongoose";

const deliverableSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null,
        },
        projectName: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
        },
        clientName: {
            type: String,
            required: [true, "Client name is required"],
            trim: true,
        },
        title: {
            type: String,
            required: [true, "Deliverable title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        category: {
            type: String,
            enum: [
                "Design",
                "Development",
                "Content",
                "SEO",
                "Marketing",
                "Deployment",
                "Documentation",
                "Maintenance"
            ],
            default: "Design",
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Review", "Approved", "Delivered"],
            default: "Pending",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },
        dueDate: {
            type: Date,
            default: null,
        },
        completedDate: {
            type: Date,
            default: null,
        },
        assignedTo: {
            type: String,
            trim: true,
            default: "",
        },
        fileLinks: {
            type: String,
            trim: true,
            default: "",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

const Deliverable = mongoose.model("Deliverable", deliverableSchema);

export default Deliverable;
