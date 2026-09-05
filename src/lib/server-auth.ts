import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { isAllowedAdminEmail } from "./auth-config";
import { checkRateLimit, getClientIp } from "./rate-limiter";

export interface AuthResult {
  authorized: boolean;
  email?: string;
  error?: string;
  status: number;
}

/**
 * PRODUCTION SERVER AUTHENTICATION
 * Strictly validates Supabase Auth JWT tokens.
 * Zero password backdoor or hardcoded passcodes.
 *
 * 1. IP Rate Limiting defense against automated abuse.
 * 2. Cryptographic JWT verification directly with Supabase Auth server.
 * 3. Enforces strict Admin Email Whitelist.
 */
export async function verifyAdminRequest(request: Request): Promise<AuthResult> {
  const ip = getClientIp(request);

  // Rate limiting: 60 requests per 10 minutes window
  const rateLimit = checkRateLimit(ip, 60, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return {
      authorized: false,
      status: 429,
      error: `Too many requests. Temporary lockout for ${rateLimit.retryAfterSec} seconds.`,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      authorized: false,
      status: 503,
      error: "Database & Authentication are not configured. Please set Supabase environment variables in .env.local",
    };
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : null;

  if (!token) {
    return {
      authorized: false,
      status: 401,
      error: "Unauthorized: Missing authentication token. Please sign in as an admin.",
    };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      authorized: false,
      status: 500,
      error: "Supabase service client is not initialized.",
    };
  }

  // Cryptographically verify token with Supabase Auth
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) {
    return {
      authorized: false,
      status: 401,
      error: "Session expired or invalid. Please sign in again.",
    };
  }

  const email = data.user.email;
  if (!isAllowedAdminEmail(email)) {
    return {
      authorized: false,
      status: 403,
      error: `Access Denied: ${email} is not authorized to manage Property Boutique listings.`,
    };
  }

  return {
    authorized: true,
    email: email || undefined,
    status: 200,
  };
}
