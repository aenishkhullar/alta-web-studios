import Lead from "../models/Lead.js";
import Client from "../models/Client.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Get dashboard overview statistics
 * @route   GET /api/dashboard/stats
 * @access  Private (Admin)
 */
export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalLeads,
            newLeads,
            contactedLeads,
            wonLeads,
            activeClients,
            totalClients
        ] = await Promise.all([
            Lead.countDocuments({}),
            Lead.countDocuments({ status: "New" }),
            Lead.countDocuments({ status: "Contacted" }),
            Lead.countDocuments({ status: "Won" }),
            Client.countDocuments({ status: "Active" }),
            Client.countDocuments({})
        ]);

        return sendSuccess(res, "Dashboard statistics retrieved successfully", {
            totalLeads,
            newLeads,
            contactedLeads,
            wonLeads,
            activeClients,
            totalClients
        }, 200);
    } catch (error) {
        console.error("Get Dashboard Stats Error:", error);
        return sendError(res, "Server error retrieving dashboard statistics", 500);
    }
};
