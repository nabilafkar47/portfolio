// Simple in-memory rate limiter
// Sufficient for single-instance deployment

const rateLimit = new Map<string, { count: number; resetTime: number }>();

type RateLimitConfig = {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { windowMs: 60_000, maxRequests: 5 }
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + config.windowMs });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  if (record.count >= config.maxRequests) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: config.maxRequests - record.count };
}

// Cleanup stale entries periodically (every 5 minutes)
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimit.entries()) {
      if (now > record.resetTime) {
        rateLimit.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}
