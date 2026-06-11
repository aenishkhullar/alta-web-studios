import Lead from "../models/Lead.js";
import Client from "../models/Client.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Create a new Lead
 * @route   POST /api/leads
 * @access  Public
 */
export const createLead = async (req, res) => {
    try {
        const { name, email, phone, company, budget, message, source, status, website, notes } = req.body;

        const lead = await Lead.create({
            name,
            email,
            phone,
            company,
            budget,
            message,
            source,
            status,
            website: website || "",
            notes: notes || "",
        });

        return sendSuccess(res, "Lead created successfully", lead, 201);
    } catch (error) {
        console.error("Create Lead Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        return sendError(res, "Server error during lead creation", 500);
    }
};

/**
 * @desc    Get all Leads
 * @route   GET /api/leads
 * @access  Private (Admin)
 */
export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return sendSuccess(res, "Leads retrieved successfully", leads, 200);
    } catch (error) {
        console.error("Get Leads Error:", error);
        return sendError(res, "Server error retrieving leads", 500);
    }
};

/**
 * @desc    Get single Lead by ID
 * @route   GET /api/leads/:id
 * @access  Private (Admin)
 */
export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return sendError(res, "Lead not found", 404);
        }
        return sendSuccess(res, "Lead retrieved successfully", lead, 200);
    } catch (error) {
        console.error("Get Lead By ID Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Lead ID format", 400);
        }
        return sendError(res, "Server error retrieving lead detail", 500);
    }
};

/**
 * @desc    Update a Lead by ID
 * @route   PUT /api/leads/:id
 * @access  Private (Admin)
 */
export const updateLead = async (req, res) => {
    try {
        const { name, email, phone, company, budget, message, source, status, website, notes } = req.body;

        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return sendError(res, "Lead not found", 404);
        }

        if (name !== undefined) lead.name = name;
        if (email !== undefined) lead.email = email;
        if (phone !== undefined) lead.phone = phone;
        if (company !== undefined) lead.company = company;
        if (budget !== undefined) lead.budget = budget;
        if (message !== undefined) lead.message = message;
        if (source !== undefined) lead.source = source;
        if (status !== undefined) lead.status = status;
        if (website !== undefined) lead.website = website;
        if (notes !== undefined) lead.notes = notes;

        const updatedLead = await lead.save();
        return sendSuccess(res, "Lead updated successfully", updatedLead, 200);
    } catch (error) {
        console.error("Update Lead Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Lead ID format", 400);
        }
        return sendError(res, "Server error updating lead", 500);
    }
};

/**
 * @desc    Delete a Lead by ID
 * @route   DELETE /api/leads/:id
 * @access  Private (Admin)
 */
export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return sendError(res, "Lead not found", 404);
        }

        await lead.deleteOne();
        return sendSuccess(res, "Lead deleted successfully", {}, 200);
    } catch (error) {
        console.error("Delete Lead Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Lead ID format", 400);
        }
        return sendError(res, "Server error deleting lead", 500);
    }
};

/**
 * @desc    Convert Lead to Client
 * @route   POST /api/leads/:id/convert
 * @access  Private (Admin)
 */
export const convertLeadToClient = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return sendError(res, "Lead not found", 404);
        }

        // Check if client is already converted
        const clientExists = await Client.findOne({ sourceLeadId: lead._id });
        if (clientExists) {
            return sendError(res, "Lead has already been converted to a client", 400);
        }

        // Map fields to Client schema
        const client = await Client.create({
            name: lead.name,
            company: lead.company || "",
            email: lead.email || "",
            phone: lead.phone || "",
            website: lead.website || "",
            notes: lead.notes || lead.message || "",
            status: "Onboarding",
            sourceLeadId: lead._id,
        });

        // Set lead status to Won if not already Won
        if (lead.status !== "Won") {
            lead.status = "Won";
            await lead.save();
        }

        return sendSuccess(res, "Lead converted to client successfully", client, 201);
    } catch (error) {
        console.error("Convert Lead to Client Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        return sendError(res, "Server error during lead conversion", 500);
    }
};
