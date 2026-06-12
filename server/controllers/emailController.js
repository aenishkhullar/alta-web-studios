import Email from "../models/Email.js";
import resendService from "../services/resendService.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Send a new email
 * @route   POST /api/emails/send
 * @access  Private (Admin)
 */
export const sendEmail = async (req, res) => {
    try {
        const { to, cc, bcc, subject, html, text, attachments, id } = req.body;

        // Validation
        if (!to) {
            console.error("[ERROR] Email failed: Recipient 'to' is required");
            return sendError(res, "Recipient (To) is required", 400);
        }
        if (!subject) {
            console.error("[ERROR] Email failed: Subject is required");
            return sendError(res, "Subject is required", 400);
        }
        if (!html) {
            console.error("[ERROR] Email failed: HTML body is required");
            return sendError(res, "Message body is required", 400);
        }

        // Email format validation (simple regex)
        const emailRegex = /^\S+@\S+\.\S+$/;
        const recipientList = to.split(",").map(e => e.trim());
        for (const email of recipientList) {
            if (!emailRegex.test(email)) {
                console.error(`[ERROR] Email failed: Invalid email format ${email}`);
                return sendError(res, `Invalid email address format: ${email}`, 400);
            }
        }

        let emailDoc;

        // If it was a draft being sent, we either update it or delete the draft and create a new record
        // Let's update the existing draft record to "sent" status
        if (id) {
            emailDoc = await Email.findOne({ _id: id, createdBy: req.admin._id });
        }

        try {
            // Trigger Resend API call
            await resendService.sendEmail({
                to,
                cc,
                bcc,
                subject,
                html,
                text: text || "",
                attachments
            });

            // Save to database as "sent"
            const fromField = `"${process.env.RESEND_FROM_NAME || "Alta Web Studios Team"}" <${process.env.RESEND_FROM_EMAIL || "team@altawebstudios.xyz"}>`;
            
            if (emailDoc) {
                emailDoc.to = to;
                emailDoc.cc = cc || "";
                emailDoc.bcc = bcc || "";
                emailDoc.subject = subject;
                emailDoc.html = html;
                emailDoc.text = text || "";
                emailDoc.attachments = attachments || [];
                emailDoc.status = "sent";
                emailDoc.sentAt = new Date();
                await emailDoc.save();
            } else {
                emailDoc = await Email.create({
                    from: fromField,
                    to,
                    cc: cc || "",
                    bcc: bcc || "",
                    subject,
                    html,
                    text: text || "",
                    attachments: attachments || [],
                    status: "sent",
                    sentAt: new Date(),
                    createdBy: req.admin._id,
                });
            }

            console.log(`[SUCCESS] Email sent successfully to ${to}`);
            return sendSuccess(res, "Email sent successfully", emailDoc, 200);

        } catch (sendErr) {
            // Save to database as "failed"
            const fromField = `"${process.env.RESEND_FROM_NAME || "Alta Web Studios Team"}" <${process.env.RESEND_FROM_EMAIL || "team@altawebstudios.xyz"}>`;
            
            if (emailDoc) {
                emailDoc.status = "failed";
                await emailDoc.save();
            } else {
                emailDoc = await Email.create({
                    from: fromField,
                    to,
                    cc: cc || "",
                    bcc: bcc || "",
                    subject,
                    html,
                    text: text || "",
                    attachments: attachments || [],
                    status: "failed",
                    createdBy: req.admin._id,
                });
            }
            
            console.error(`[ERROR] Email failed to send to ${to}: ${sendErr.message}`);
            return sendError(res, `Failed to send email: ${sendErr.message}`, 500);
        }
    } catch (error) {
        console.error("Send Email Controller Error:", error);
        return sendError(res, "Server error during email sending", 500);
    }
};

/**
 * @desc    Save email draft
 * @route   POST /api/emails/draft
 * @access  Private (Admin)
 */
export const saveDraft = async (req, res) => {
    try {
        const { to, cc, bcc, subject, html, text, attachments, id } = req.body;

        const fromField = `"${process.env.RESEND_FROM_NAME || "Alta Web Studios Team"}" <${process.env.RESEND_FROM_EMAIL || "team@altawebstudios.xyz"}>`;

        let draft;

        if (id) {
            // Update existing draft
            draft = await Email.findOne({ _id: id, createdBy: req.admin._id, status: "draft" });
            if (draft) {
                draft.to = to || "";
                draft.cc = cc || "";
                draft.bcc = bcc || "";
                draft.subject = subject || "";
                draft.html = html || "";
                draft.text = text || "";
                draft.attachments = attachments || [];
                await draft.save();
                console.log(`[SUCCESS] Draft updated: ${draft._id}`);
                return sendSuccess(res, "Draft updated successfully", draft, 200);
            }
        }

        // Create new draft
        draft = await Email.create({
            from: fromField,
            to: to || "",
            cc: cc || "",
            bcc: bcc || "",
            subject: subject || "",
            html: html || "",
            text: text || "",
            attachments: attachments || [],
            status: "draft",
            createdBy: req.admin._id,
        });

        console.log(`[SUCCESS] Draft saved: ${draft._id}`);
        return sendSuccess(res, "Draft saved successfully", draft, 201);
    } catch (error) {
        console.error("Save Draft Error:", error);
        return sendError(res, "Server error saving draft", 500);
    }
};

/**
 * @desc    Get all emails (sent & drafts)
 * @route   GET /api/emails
 * @access  Private (Admin)
 */
export const getEmails = async (req, res) => {
    try {
        const { status, search } = req.query;
        const query = { createdBy: req.admin._id };

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { to: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } }
            ];
        }

        const emails = await Email.find(query).sort({ createdAt: -1 });
        return sendSuccess(res, "Emails retrieved successfully", emails, 200);
    } catch (error) {
        console.error("Get Emails Error:", error);
        return sendError(res, "Server error retrieving emails", 500);
    }
};

/**
 * @desc    Get single email details
 * @route   GET /api/emails/:id
 * @access  Private (Admin)
 */
export const getEmailById = async (req, res) => {
    try {
        const email = await Email.findOne({ _id: req.params.id, createdBy: req.admin._id });

        if (!email) {
            return sendError(res, "Email not found", 404);
        }

        return sendSuccess(res, "Email retrieved successfully", email, 200);
    } catch (error) {
        console.error("Get Email By ID Error:", error);
        return sendError(res, "Server error retrieving email details", 500);
    }
};

/**
 * @desc    Delete email or draft
 * @route   DELETE /api/emails/:id
 * @access  Private (Admin)
 */
export const deleteEmail = async (req, res) => {
    try {
        const email = await Email.findOneAndDelete({ _id: req.params.id, createdBy: req.admin._id });

        if (!email) {
            return sendError(res, "Email not found or unauthorized", 404);
        }

        console.log(`[SUCCESS] Email record deleted: ${req.params.id}`);
        return sendSuccess(res, "Email deleted successfully", {}, 200);
    } catch (error) {
        console.error("Delete Email Error:", error);
        return sendError(res, "Server error deleting email", 500);
    }
};
