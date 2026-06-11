import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
        },
        clientName: {
            type: String,
            required: [true, "Client name is required"],
            trim: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            default: null,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["Planning", "Design", "Development", "Testing", "Review", "Delivered", "Maintenance"],
            default: "Planning",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },
        budget: {
            type: String,
            trim: true,
            default: "",
        },
        startDate: {
            type: Date,
            default: null,
        },
        deadline: {
            type: Date,
            default: null,
        },
        progress: {
            type: Number,
            min: [0, "Progress cannot be less than 0"],
            max: [100, "Progress cannot exceed 100"],
            default: 0,
        },
        techStack: {
            type: [String],
            default: [],
        },
        assignedTeam: {
            type: [String],
            default: [],
        },
        repositoryUrl: {
            type: String,
            trim: true,
            default: "",
        },
        liveUrl: {
            type: String,
            trim: true,
            default: "",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
