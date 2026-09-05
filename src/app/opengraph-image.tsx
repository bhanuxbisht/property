import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Property Boutique — Premier Real Estate in Jaipur";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#161B18",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(241, 90, 36, 0.22) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(244, 215, 195, 0.12) 0%, transparent 45%)",
          fontFamily: "sans-serif",
          color: "#FAF6F1",
          border: "8px solid #242B27",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* RERA Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(241, 90, 36, 0.15)",
              border: "1.5px solid rgba(241, 90, 36, 0.4)",
              color: "#FF8A48",
              fontSize: "19px",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            RERA Registered: {siteConfig.reraNumber}
          </div>

          {/* 5.0 Google Rating Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(251, 188, 4, 0.12)",
              border: "1.5px solid rgba(251, 188, 4, 0.35)",
              color: "#FBBC04",
              fontSize: "19px",
              fontWeight: 600,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBC04">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span>5.0 on Google Reviews</span>
          </div>
        </div>

        {/* Center Hero Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: "#FFFFFF",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            {siteConfig.name}
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "#F4D7C3",
              letterSpacing: "-0.5px",
            }}
          >
            Jaipur&apos;s Premier Property Consultant · Mr. Lalit Singh Bisht
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
              fontSize: "21px",
              color: "rgba(250, 246, 241, 0.8)",
            }}
          >
            <span style={{ color: "#FF8A48", fontWeight: 700 }}>
              {siteConfig.propertiesSold} Properties Transacted
            </span>
            <span>·</span>
            <span>JDA Approved Titles Only</span>
            <span>·</span>
            <span>15+ Years Experience</span>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1.5px solid rgba(250, 246, 241, 0.15)",
            paddingTop: "24px",
          }}
        >
          {/* Areas Served */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "17px",
              color: "rgba(250, 246, 241, 0.7)",
            }}
          >
            <span style={{ color: "#F4D7C3", fontWeight: 600 }}>Prime Areas:</span>
            <span>Murlipura · Sikar Road · Vidhyadhar Nagar · Jhotwara</span>
          </div>

          {/* Contact / WhatsApp Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: "9999px",
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: 700,
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
            }}
          >
            WhatsApp / Call: +91 9001539001
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
