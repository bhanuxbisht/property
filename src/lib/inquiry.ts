import { siteConfig } from "./site-config";

export interface PropertyInquiryData {
  type: "buy" | "sell";
  requirement: string;
  name?: string;
  phone?: string;
  email?: string;
}

export const inquiryPlaceholders = {
  buy: "e.g. Looking for 3 BHK flat in Murlipura under ₹50 Lakh...",
  sell: "e.g. Want to sell 200 sq. yard plot near Sikar Road...",
} as const;

export function formatWhatsAppMessage(type: "buy" | "sell", requirement: string, name?: string): string {
  const intent = type === "buy" ? "buy a property" : "sell my property";
  const greeting = name ? `Hello ${siteConfig.name}, I am ${name}.` : `Hello ${siteConfig.name}!`;
  
  return `${greeting}\n\nI am looking to *${intent}* in Jaipur.\n\n*Requirement:*\n${requirement.trim()}\n\nPlease share available options and details. Thank you!`;
}

export function getWhatsAppInquiryUrl(type: "buy" | "sell", requirement: string, name?: string): string {
  const text = formatWhatsAppMessage(type, requirement, name);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function getEmailMailtoUrl(type: "buy" | "sell", requirement: string, name?: string, phone?: string): string {
  const subject = `New Property Inquiry (${type.toUpperCase()}): ${requirement.slice(0, 40)}...`;
  const body = `Hi ${siteConfig.name},\n\nI would like to ${type.toUpperCase()} property in Jaipur.\n\nRequirement:\n${requirement}\n\nContact Details:\nName: ${name || "Not provided"}\nPhone: ${phone || "Not provided"}\n\nPlease get in touch with me.`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
