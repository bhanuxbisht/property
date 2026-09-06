import { siteConfig } from "./site-config";

/**
 * Whitelist of emails allowed to log in to the Property Boutique Admin portal.
 * Pre-configured with official Property Boutique owner & consultant emails.
 */
export const DEFAULT_ADMIN_EMAILS: string[] = [
  siteConfig.email.toLowerCase(), // propertyboutiquejaipur@gmail.com
  "lsb.ips@gmail.com",            // Mr. Lalit Singh Bisht's verified admin email
  "workforrhody7@gmail.com",      // Developer & Administrator email
];

export function getAdminEmails(): string[] {
  const envString =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    process.env.ADMIN_EMAILS ||
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "";

  const envEmails = envString
    ? envString.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const combined = [
    ...DEFAULT_ADMIN_EMAILS,
    ...envEmails,
  ].filter(Boolean);

  // Return unique lowercase email addresses
  return Array.from(new Set(combined));
}

/**
 * Validates whether an email belongs to an authorized property admin.
 */
export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const allowed = getAdminEmails();

  // If email is in whitelist
  if (allowed.includes(normalized)) {
    return true;
  }

  // If configured with any admin email starting with the same verified domain
  if (normalized.endsWith("@propertyboutique.in")) {
    return true;
  }

  return false;
}

