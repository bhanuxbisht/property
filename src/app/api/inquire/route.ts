import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

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

    const timestamp = new Date().toISOString();
    const leadRecord = {
      timestamp,
      type: type || "buy",
      requirement: requirement.trim(),
      name: name?.trim() || "Visitor",
      phone: phone?.trim() || "Not provided",
      email: email?.trim() || "Not provided",
      targetRecipient: siteConfig.email,
    };

    // Log the lead for the business owner
    console.log("------------------------------------------");
    console.log("🌟 [NEW LEAD INQUIRY RECEIVED]:", JSON.stringify(leadRecord, null, 2));
    console.log("------------------------------------------");

    // If RESEND_API_KEY or SMTP is configured in .env in future, it can send directly:
    // e.g. await sendNotificationEmail(leadRecord);

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
