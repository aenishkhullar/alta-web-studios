import Project from "../models/Project.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Get all Projects
 * @route   GET /api/projects
 * @access  Private (Admin)
 */
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return sendSuccess(res, "Projects retrieved successfully", projects, 200);
    } catch (error) {
        console.error("Get Projects Error:", error);
        return sendError(res, "Server error retrieving projects", 500);
    }
};

/**
 * @desc    Create a new Project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req, res) => {
    try {
        const {
            title,
            clientName,
            clientId,
            description,
            status,
            priority,
            budget,
            startDate,
            deadline,
            progress,
            techStack,
            assignedTeam,
            repositoryUrl,
            liveUrl,
            notes
        } = req.body;

        if (!title || !title.trim()) {
            return sendError(res, "Project title is required", 400);
        }
        if (!clientName || !clientName.trim()) {
            return sendError(res, "Client name is required", 400);
        }

        const project = await Project.create({
            title,
            clientName,
            clientId: clientId || null,
            description: description || "",
            status: status || "Planning",
            priority: priority || "Medium",
            budget: budget || "",
            startDate: startDate || null,
            deadline: deadline || null,
            progress: progress !== undefined ? progress : 0,
            techStack: techStack || [],
            assignedTeam: assignedTeam || [],
            repositoryUrl: repositoryUrl || "",
            liveUrl: liveUrl || "",
            notes: notes || "",
            createdBy: req.admin ? req.admin._id : null
        });

        return sendSuccess(res, "Project created successfully", project, 201);
    } catch (error) {
        console.error("Create Project Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        return sendError(res, "Server error during project creation", 500);
    }
};

/**
 * @desc    Get single Project by ID
 * @route   GET /api/projects/:id
 * @access  Private (Admin)
 */
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return sendError(res, "Project not found", 404);
        }
        return sendSuccess(res, "Project retrieved successfully", project, 200);
    } catch (error) {
        console.error("Get Project By ID Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Project ID format", 400);
        }
        return sendError(res, "Server error retrieving project details", 500);
    }
};

/**
 * @desc    Update a Project by ID
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req, res) => {
    try {
        const {
            title,
            clientName,
            clientId,
            description,
            status,
            priority,
            budget,
            startDate,
            deadline,
            progress,
            techStack,
            assignedTeam,
            repositoryUrl,
            liveUrl,
            notes
        } = req.body;

        const project = await Project.findById(req.params.id);
        if (!project) {
            return sendError(res, "Project not found", 404);
        }

        if (title !== undefined) project.title = title;
        if (clientName !== undefined) project.clientName = clientName;
        if (clientId !== undefined) project.clientId = clientId;
        if (description !== undefined) project.description = description;
        if (status !== undefined) project.status = status;
        if (priority !== undefined) project.priority = priority;
        if (budget !== undefined) project.budget = budget;
        if (startDate !== undefined) project.startDate = startDate;
        if (deadline !== undefined) project.deadline = deadline;
        if (progress !== undefined) project.progress = progress;
        if (techStack !== undefined) project.techStack = techStack;
        if (assignedTeam !== undefined) project.assignedTeam = assignedTeam;
        if (repositoryUrl !== undefined) project.repositoryUrl = repositoryUrl;
        if (liveUrl !== undefined) project.liveUrl = liveUrl;
        if (notes !== undefined) project.notes = notes;

        const updatedProject = await project.save();
        return sendSuccess(res, "Project updated successfully", updatedProject, 200);
    } catch (error) {
        console.error("Update Project Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Project ID format", 400);
        }
        return sendError(res, "Server error updating project", 500);
    }
};

/**
 * @desc    Delete a Project by ID
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return sendError(res, "Project not found", 404);
        }

        await project.deleteOne();
        return sendSuccess(res, "Project deleted successfully", {}, 200);
    } catch (error) {
        console.error("Delete Project Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Project ID format", 400);
        }
        return sendError(res, "Server error deleting project", 500);
    }
};
