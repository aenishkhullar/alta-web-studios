/**
 * Send a successful API response
 * @param {Object} res - Express response object
 * @param {string} message - User-friendly message
 * @param {Object} data - Response payload data
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

/**
 * Send an error API response
 * @param {Object} res - Express response object
 * @param {string} message - User-friendly error message
 * @param {number} statusCode - HTTP status code (default: 400)
 */
export const sendError = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};
