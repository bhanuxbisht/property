interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Sliding window IP rate limiter.
 * @param ip Client IP address
 * @param maxAttempts Maximum allowed requests within the window
 * @param windowMs Window duration in milliseconds (e.g., 15 minutes = 15 * 60 * 1000)
 */
export function checkRateLimit(
  ip: string,
  maxAttempts = 10,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean expired record
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfterSec: 0,
    };
  }

  // Increment attempt
  record.count += 1;

  if (record.count > maxAttempts) {
    const retryAfterSec = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    retryAfterSec: 0,
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
