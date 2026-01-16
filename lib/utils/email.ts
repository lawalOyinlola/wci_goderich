import { CHURCH_INFO } from "@/lib/constants/church";

export interface ContactEmailData {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  isAnonymous: boolean;
}

/**
 * Escape HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Encode a value for use in mailto: or tel: href attributes
 * Uses encodeURIComponent to prevent injection in href attributes
 */
function encodeHrefValue(value: string): string {
  return encodeURIComponent(value);
}

/**
 * Escape HTML and preserve newlines by converting \n to <br/>
 */
function escapeHtmlWithNewlines(text: string): string {
  return escapeHtml(text).replace(/\n/g, "<br/>");
}

/**
 * Generate plain text email content
 */
export function generateContactEmailText(data: ContactEmailData): string {
  return `
New Contact Form Submission

Name: ${data.name}
${data.isAnonymous ? "(Submitted anonymously)" : ""}
${data.email ? `Email: ${data.email}` : ""}
${data.phone ? `Phone: ${data.phone}` : ""}
Subject: ${data.subject}

Message:
${data.message}

---
This message was submitted through the WCI Goderich website contact form.
Submitted at: ${new Date().toLocaleString()}
  `.trim();
}

/**
 * Generate HTML email content
 */
export function generateContactEmailHTML(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0;
      background-color: #f5f5f5;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: white;
    }
    .header { 
      background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
    }
    .header h1 { 
      margin: 0; 
      font-size: 24px; 
      font-weight: 600;
    }
    .content { 
      padding: 30px 20px; 
    }
    .field { 
      margin-bottom: 20px; 
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
    }
    .field:last-child {
      border-bottom: none;
    }
    .label { 
      font-weight: 600; 
      color: #4F46E5; 
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #1f2937;
      font-size: 16px;
    }
    .message-box { 
      background-color: #f9fafb; 
      padding: 20px; 
      border-left: 4px solid #4F46E5; 
      margin-top: 20px;
      border-radius: 4px;
    }
    .message-content {
      white-space: pre-wrap;
      color: #374151;
      line-height: 1.8;
    }
    .footer { 
      margin-top: 30px; 
      padding-top: 20px; 
      border-top: 2px solid #e5e7eb; 
      font-size: 12px; 
      color: #6b7280; 
      text-align: center;
    }
    .anonymous-badge {
      display: inline-block;
      background-color: #fef3c7;
      color: #92400e;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      margin-left: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name</span>
        <span class="value">
          ${escapeHtml(data.name)}
          ${
            data.isAnonymous
              ? '<span class="anonymous-badge">Anonymous</span>'
              : ""
          }
        </span>
      </div>
      ${
        data.email
          ? `
      <div class="field">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:${encodeHrefValue(
          data.email
        )}" style="color: #4F46E5; text-decoration: none;">${escapeHtml(
              data.email
            )}</a></span>
      </div>
      `
          : ""
      }
      ${
        data.phone
          ? `
      <div class="field">
        <span class="label">Phone</span>
        <span class="value"><a href="tel:${encodeHrefValue(
          data.phone
        )}" style="color: #4F46E5; text-decoration: none;">${escapeHtml(
              data.phone
            )}</a></span>
      </div>
      `
          : ""
      }
      <div class="field">
        <span class="label">Subject</span>
        <span class="value">${escapeHtml(data.subject)}</span>
      </div>
      <div class="message-box">
        <div class="label">Message</div>
        <div class="message-content">${escapeHtmlWithNewlines(
          data.message
        )}</div>
      </div>
    </div>
    <div class="footer">
      <p>This message was submitted through the WCI Goderich website contact form.</p>
      <p>Submitted at: ${new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: "Africa/Freetown",
      })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send email using Resend (recommended for Next.js)
 * Get API key from: https://resend.com/api-keys
 * Set RESEND_API_KEY in your .env file
 */
export async function sendEmailWithResend(
  data: ContactEmailData
): Promise<boolean> {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return false;
    }

    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const churchEmail = CHURCH_INFO.CONTACT.email;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "contact@wcigoderich.org";

    const result = await resend.emails.send({
      from: fromEmail,
      to: churchEmail,
      replyTo: data.email || fromEmail,
      subject: `New Contact Form: ${data.subject}`,
      html: generateContactEmailHTML(data),
      text: generateContactEmailText(data),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    return false;
  }
}

/**
 * Send email using SMTP (nodemailer)
 * Configure SMTP settings in .env file
 * Works with Gmail, Outlook, and any SMTP server
 */
export async function sendEmailWithSMTP(
  data: ContactEmailData
): Promise<boolean> {
  try {
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return false;
    }

    const nodemailer = (await import(
      "nodemailer"
    )) as typeof import("nodemailer");

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const churchEmail = CHURCH_INFO.CONTACT.email;
    const fromEmail = process.env.SMTP_FROM_EMAIL || SMTP_USER;

    await transporter.sendMail({
      from: fromEmail,
      to: churchEmail,
      replyTo: data.email || fromEmail,
      subject: `New Contact Form: ${data.subject}`,
      html: generateContactEmailHTML(data),
      text: generateContactEmailText(data),
    });

    return true;
  } catch (error) {
    console.error("Error sending email with SMTP:", error);
    return false;
  }
}

/**
 * Main function to send contact form email
 * Tries multiple email services in order of preference
 */
export async function sendContactEmail(
  data: ContactEmailData
): Promise<boolean> {
  // Try Resend first (recommended for Next.js)
  if (process.env.RESEND_API_KEY) {
    const sent = await sendEmailWithResend(data);
    if (sent) return true;
  }

  // Fallback to SMTP (works with Gmail, Outlook, etc.)
  if (process.env.SMTP_HOST) {
    const sent = await sendEmailWithSMTP(data);
    if (sent) return true;
  }

  // If no email service configured, log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email would be sent to:", CHURCH_INFO.CONTACT.email);
    console.log("📧 Email content:", {
      subject: `New Contact Form: ${data.subject}`,
      from: data.email || "anonymous",
      body: generateContactEmailText(data),
    });
    console.log("💡 To enable email sending, configure one of:");
    console.log("   - RESEND_API_KEY (recommended)");
    console.log("   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS");
  }

  return false;
}
