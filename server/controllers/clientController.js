import Client from "../models/Client.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Get all Clients
 * @route   GET /api/clients
 * @access  Private (Admin)
 */
export const getClients = async (req, res) => {
    try {
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return sendSuccess(res, "Clients retrieved successfully", clients, 200);
    } catch (error) {
        console.error("Get Clients Error:", error);
        return sendError(res, "Server error retrieving clients", 500);
    }
};

/**
 * @desc    Create a new Client
 * @route   POST /api/clients
 * @access  Private (Admin)
 */
export const createClient = async (req, res) => {
    try {
        const { name, company, email, phone, website, industry, notes, status, sourceLeadId } = req.body;

        if (!name || !name.trim()) {
            return sendError(res, "Name is required", 400);
        }

        const client = await Client.create({
            name,
            company,
            email,
            phone,
            website,
            industry,
            notes,
            status,
            sourceLeadId: sourceLeadId || null,
        });

        return sendSuccess(res, "Client created successfully", client, 201);
    } catch (error) {
        console.error("Create Client Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        return sendError(res, "Server error during client creation", 500);
    }
};

/**
 * @desc    Get single Client by ID
 * @route   GET /api/clients/:id
 * @access  Private (Admin)
 */
export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return sendError(res, "Client not found", 404);
        }
        return sendSuccess(res, "Client retrieved successfully", client, 200);
    } catch (error) {
        console.error("Get Client By ID Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Client ID format", 400);
        }
        return sendError(res, "Server error retrieving client detail", 500);
    }
};

/**
 * @desc    Update a Client by ID
 * @route   PUT /api/clients/:id
 * @access  Private (Admin)
 */
export const updateClient = async (req, res) => {
    try {
        const { name, company, email, phone, website, industry, notes, status } = req.body;

        const client = await Client.findById(req.params.id);
        if (!client) {
            return sendError(res, "Client not found", 404);
        }

        if (name !== undefined) client.name = name;
        if (company !== undefined) client.company = company;
        if (email !== undefined) client.email = email;
        if (phone !== undefined) client.phone = phone;
        if (website !== undefined) client.website = website;
        if (industry !== undefined) client.industry = industry;
        if (notes !== undefined) client.notes = notes;
        if (status !== undefined) client.status = status;

        const updatedClient = await client.save();
        return sendSuccess(res, "Client updated successfully", updatedClient, 200);
    } catch (error) {
        console.error("Update Client Error:", error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map((val) => val.message).join(", ");
            return sendError(res, message, 400);
        }
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Client ID format", 400);
        }
        return sendError(res, "Server error updating client", 500);
    }
};

/**
 * @desc    Delete a Client by ID
 * @route   DELETE /api/clients/:id
 * @access  Private (Admin)
 */
export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return sendError(res, "Client not found", 404);
        }

        await client.deleteOne();
        return sendSuccess(res, "Client deleted successfully", {}, 200);
    } catch (error) {
        console.error("Delete Client Error:", error);
        if (error.kind === "ObjectId") {
            return sendError(res, "Invalid Client ID format", 400);
        }
        return sendError(res, "Server error deleting client", 500);
    }
};
