import Deliverable from "../models/Deliverable.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Get all Deliverables
 * @route   GET /api/deliverables
 * @access  Private (Admin)
 */
export const getDeliverables = async (req, res) => {
    try {
        const deliverables = await Deliverable.find({}).sort({ createdAt: -1 });
        return sendSuccess(res, "Deliverables retrieved successfully", deliverables, 200);
    } catch (error) {
        console.error("Get Deliverables Error:", error);
        return sendError(res, "Server error retrieving deliverables", 500);
    }
};

/**
 * @desc    Create a new Deliverable
 * @route   POST /api/deliverables
 * @access  Private (Admin)
 */
export const createDeliverable = async (req, res) => {
    try {
        const {
            projectId,
            projectName,
            clientName,
            title,
            description,
            category,
            status,
            priority,
            dueDate,
            assignedTo,
            fileLinks,
            notes
        } = req.body;

        if (!projectName || !projectName.trim()) {
            return sendError(res, "Project name is required", 400);
        }
        if (!clientName || !clientName.trim()) {
            return sendError(res, "Client name is required", 400);
        }
        if (!title || !title.trim()) {
            return sendError(res, "Deliverable title is required", 400);
        }

        const completedDate = status === "Delivered" ? new Date() : null;

        const deliverable = await Deliverable.create({
            projectId: projectId || null,
            projectName,
            clientName,
            title,
            description: description || "",
            category: category || "Design",
            status: status || "Pending",
            priority: priority || "Medium",
            dueDate: dueDate || null,
            completedDate,
            assignedTo: assignedTo || "",
            fileLinks: fileLinks || "",
            notes: notes || ""
        });

        return sendSuccess(res, "Deliverable created successfully", deliverable, 201);
    } catch (error) {
        console.error("Create Deliverable Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        return sendError(res, "Server error during deliverable creation", 500);
    }
};

/**
 * @desc    Get single Deliverable by ID
 * @route   GET /api/deliverables/:id
 * @access  Private (Admin)
 */
export const getDeliverableById = async (req, res) => {
    try {
        const deliverable = await Deliverable.findById(req.params.id);
        if (!deliverable) {
            return sendError(res, "Deliverable not found", 404);
        }
        return sendSuccess(res, "Deliverable retrieved successfully", deliverable, 200);
    } catch (error) {
        console.error("Get Deliverable By ID Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Deliverable ID format", 400);
        }
        return sendError(res, "Server error retrieving deliverable details", 500);
    }
};

/**
 * @desc    Update a Deliverable by ID
 * @route   PUT /api/deliverables/:id
 * @access  Private (Admin)
 */
export const updateDeliverable = async (req, res) => {
    try {
        const {
            projectId,
            projectName,
            clientName,
            title,
            description,
            category,
            status,
            priority,
            dueDate,
            assignedTo,
            fileLinks,
            notes
        } = req.body;

        const deliverable = await Deliverable.findById(req.params.id);
        if (!deliverable) {
            return sendError(res, "Deliverable not found", 404);
        }

        if (projectId !== undefined) deliverable.projectId = projectId || null;
        if (projectName !== undefined) deliverable.projectName = projectName;
        if (clientName !== undefined) deliverable.clientName = clientName;
        if (title !== undefined) deliverable.title = title;
        if (description !== undefined) deliverable.description = description;
        if (category !== undefined) deliverable.category = category;
        if (priority !== undefined) deliverable.priority = priority;
        if (dueDate !== undefined) deliverable.dueDate = dueDate;
        if (assignedTo !== undefined) deliverable.assignedTo = assignedTo;
        if (fileLinks !== undefined) deliverable.fileLinks = fileLinks;
        if (notes !== undefined) deliverable.notes = notes;

        if (status !== undefined) {
            // Handle completedDate transition
            if (status === "Delivered" && deliverable.status !== "Delivered") {
                deliverable.completedDate = new Date();
            } else if (status !== "Delivered" && deliverable.status === "Delivered") {
                deliverable.completedDate = null;
            }
            deliverable.status = status;
        }

        const updatedDeliverable = await deliverable.save();
        return sendSuccess(res, "Deliverable updated successfully", updatedDeliverable, 200);
    } catch (error) {
        console.error("Update Deliverable Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Deliverable ID format", 400);
        }
        return sendError(res, "Server error updating deliverable", 500);
    }
};

/**
 * @desc    Delete a Deliverable by ID
 * @route   DELETE /api/deliverables/:id
 * @access  Private (Admin)
 */
export const deleteDeliverable = async (req, res) => {
    try {
        const deliverable = await Deliverable.findById(req.params.id);
        if (!deliverable) {
            return sendError(res, "Deliverable not found", 404);
        }

        await deliverable.deleteOne();
        return sendSuccess(res, "Deliverable deleted successfully", {}, 200);
    } catch (error) {
        console.error("Delete Deliverable Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Deliverable ID format", 400);
        }
        return sendError(res, "Server error deleting deliverable", 500);
    }
};
