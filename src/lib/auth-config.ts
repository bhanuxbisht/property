import { siteConfig } from "./site-config";

/**
 * Whitelist of emails allowed to log in to the secret Property Boutique Admin portal.
 * Even if an unauthorized user creates an account or tries to sign in,
 * this strict whitelist algorithm blocks them both at the client and API layers.
 */
export const DEFAULT_ADMIN_EMAILS: string[] = [
  siteConfig.email.toLowerCase(), // Propertyboutiquejaipur@gmail.com
];

export function getAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const singleEnv = process.env.ADMIN_EMAIL
    ? [process.env.ADMIN_EMAIL.trim().toLowerCase()]
    : [];

  const combined = [
    ...DEFAULT_ADMIN_EMAILS,
    ...envEmails,
    ...singleEnv,
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
  return allowed.includes(normalized);
}
