import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import { getAdminEmails } from "@/lib/auth-config";

interface LeadData {
  type: string;
  requirement: string;
  name: string;
  phone: string;
  email: string;
  timestamp: string;
}

async function sendLeadEmail(lead: LeadData) {
  const smtpPass = process.env.SMTP_PASS;
  const smtpUser = process.env.SMTP_USER || siteConfig.email;

  if (!smtpPass) {
    console.log("ℹ️ [SMTP Note]: SMTP_PASS is not configured. Email dispatch skipped.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const cleanPhone = lead.phone.replace(/[^\d]/g, "");
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(
          `Hello ${lead.name}, thank you for reaching out to Property Boutique regarding your inquiry.`
        )}`
      : "";

    // Recipients: primary email + any extra admin emails
    const recipients = Array.from(
      new Set([siteConfig.email, ...getAdminEmails()])
    ).filter(Boolean);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6F1; margin: 0; padding: 24px; color: #1E2320; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #E5D9CC; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
            .header { background: #1E2320; padding: 24px; text-align: center; color: #ffffff; }
            .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; background: #F15A24; color: #ffffff; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 20px; font-weight: 700; }
            .body { padding: 24px; }
            .row { display: flex; justify-content: space-between; border-bottom: 1px solid #F0EAE1; padding: 12px 0; font-size: 14px; }
            .label { color: #736B63; font-weight: 500; }
            .value { color: #1E2320; font-weight: 600; text-align: right; }
            .box { background: #FAF6F1; border-left: 4px solid #F15A24; padding: 16px; border-radius: 12px; margin: 20px 0; font-size: 14px; line-height: 1.6; }
            .actions { display: flex; gap: 12px; margin-top: 24px; }
            .btn { flex: 1; text-align: center; padding: 12px 16px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; display: block; }
            .btn-wa { background: #25D366; color: #ffffff !important; }
            .btn-call { background: #F15A24; color: #ffffff !important; }
            .footer { padding: 16px 24px; background: #F7F3EE; text-align: center; font-size: 12px; color: #8C827A; border-top: 1px solid #EAE3D9; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">New Website Lead</span>
              <h1 class="title">Property Boutique — Inquiry Alert</h1>
            </div>
            <div class="body">
              <div class="row">
                <span class="label">Lead Purpose:</span>
                <span class="value">${lead.type.toUpperCase()} PROPERTY</span>
              </div>
              <div class="row">
                <span class="label">Client Name:</span>
                <span class="value">${lead.name}</span>
              </div>
              <div class="row">
                <span class="label">Phone / WhatsApp:</span>
                <span class="value"><a href="tel:${lead.phone}" style="color: #F15A24; text-decoration: none;">${lead.phone}</a></span>
              </div>
              ${
                lead.email && lead.email !== "Not provided"
                  ? `<div class="row">
                      <span class="label">Email Address:</span>
                      <span class="value"><a href="mailto:${lead.email}" style="color: #1E2320;">${lead.email}</a></span>
                    </div>`
                  : ""
              }
              <div class="row">
                <span class="label">Received At:</span>
                <span class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</span>
              </div>

              <div class="box">
                <strong style="color: #1E2320; display: block; margin-bottom: 4px;">Client Requirement:</strong>
                "${lead.requirement}"
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  ${
                    waUrl
                      ? `<td align="center" style="padding-right: 6px;">
                          <a href="${waUrl}" style="background-color: #25D366; color: #ffffff; padding: 12px 20px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px;">
                            💬 Reply on WhatsApp
                          </a>
                        </td>`
                      : ""
                  }
                  <td align="center" style="padding-left: 6px;">
                    <a href="tel:${lead.phone}" style="background-color: #F15A24; color: #ffffff; padding: 12px 20px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px;">
                      📞 Call Client Now
                    </a>
                  </td>
                </tr>
              </table>
            </div>
            <div class="footer">
              Direct notification from <a href="https://propertyboutique.in" style="color: #F15A24;">Property Boutique</a> website lead engine.
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Property Boutique Alerts" <${smtpUser}>`,
      to: recipients.join(", "),
      replyTo: lead.email && lead.email !== "Not provided" ? lead.email : undefined,
      subject: `🔥 New Lead [${lead.type.toUpperCase()}]: ${lead.name} (${lead.phone})`,
      html: htmlContent,
      text: `New Lead from Property Boutique:\nName: ${lead.name}\nPhone: ${lead.phone}\nPurpose: ${lead.type.toUpperCase()}\nRequirement: ${lead.requirement}\nTimestamp: ${new Date().toLocaleString()}`,
    });

    console.log("✅ [SMTP Success]: Lead email delivered to", recipients.join(", "));
    return true;
  } catch (emailErr) {
    console.error("⚠️ [SMTP Error]: Failed to dispatch email alert:", emailErr);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, requirement, name, phone, email } = body;

    if (!requirement || typeof requirement !== "string" || requirement.trim().length === 0) {
      return NextResponse.json(
        { error: "Requirement description is required." },
        { status: 400 }
      );
    }

    const leadRecord: LeadData = {
      timestamp: new Date().toISOString(),
      type: type || "buy",
      requirement: requirement.trim(),
      name: name?.trim() || "Website Visitor",
      phone: phone?.trim() || "Not provided",
      email: email?.trim() || "Not provided",
    };

    console.log("------------------------------------------");
    console.log("🌟 [NEW LEAD INQUIRY RECEIVED]:", JSON.stringify(leadRecord, null, 2));
    console.log("------------------------------------------");

    // Asynchronously dispatch email notification
    await sendLeadEmail(leadRecord);

    return NextResponse.json({
      success: true,
      message: "Inquiry received. Our consultant will contact you shortly.",
      leadId: `LEAD-${Date.now()}`,
    });
  } catch (err) {
    console.error("Failed to process inquiry:", err);
    return NextResponse.json(
      { error: "Internal server error. Please contact directly via WhatsApp or Phone." },
      { status: 500 }
    );
  }
}
