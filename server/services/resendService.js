import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "team@altawebstudios.xyz";
const fromName = process.env.RESEND_FROM_NAME || "Alta Web Studios Team";

if (!apiKey) {
    console.warn("WARNING: RESEND_API_KEY is not defined in environment variables. Email sending will fail.");
}

const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Send email using Resend API
 * @param {Object} options
 * @param {string} options.to - Recipient email(s) (comma-separated or string)
 * @param {string} [options.cc] - CC recipient(s)
 * @param {string} [options.bcc] - BCC recipient(s)
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text body fallback
 * @param {Array} [options.attachments] - Array of attachment objects { filename, content (base64), contentType }
 * @returns {Promise<Object>} Resend send result
 */
export const sendEmail = async ({ to, cc, bcc, subject, html, text, attachments }) => {
    if (!resend) {
        throw new Error("Resend service is not initialized. Check RESEND_API_KEY in server environment.");
    }

    // Format fields
    const fromHeader = `"${fromName}" <${fromEmail}>`;
    
    // Split comma-separated emails into arrays, since Resend API handles arrays
    const parseEmails = (emailStr) => {
        if (!emailStr) return undefined;
        return emailStr.split(",").map(email => email.trim()).filter(Boolean);
    };

    const payload = {
        from: fromHeader,
        to: parseEmails(to),
        subject,
        html,
    };

    if (text) {
        payload.text = text;
    }

    const ccList = parseEmails(cc);
    if (ccList && ccList.length > 0) {
        payload.cc = ccList;
    }

    const bccList = parseEmails(bcc);
    if (bccList && bccList.length > 0) {
        payload.bcc = bccList;
    }

    if (attachments && attachments.length > 0) {
        payload.attachments = attachments.map(att => {
            const formatted = {
                filename: att.filename,
            };
            if (att.content) {
                // Resend expects base64 or Buffer. In this case, we send the content (which is a base64 string)
                formatted.content = att.content;
            }
            if (att.contentType) {
                formatted.contentType = att.contentType;
            }
            return formatted;
        });
    }

    try {
        const response = await resend.emails.send(payload);
        if (response.error) {
            console.error(`[ERROR] Resend API error sending email:`, response.error);
            throw new Error(response.error.message || "Resend API error");
        }
        console.log(`[SUCCESS] Email sent successfully to ${to} via Resend. Message ID: ${response.data?.id}`);
        return response.data;
    } catch (error) {
        console.error(`[ERROR] Email failed to send: ${error.message}`);
        throw error;
    }
};

export default {
    sendEmail
};
