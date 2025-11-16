/**
 * Client-side rate limiting to prevent spam submissions
 */

const RATE_LIMIT_KEY = "rockPopupRateLimit";
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // Maximum 3 submissions per minute

interface RateLimitRecord {
  timestamps: number[];
}

/**
 * Check if user can submit based on rate limiting
 * @returns Object with allowed status and optional wait time in seconds
 */
export function checkClientRateLimit(): { allowed: boolean; waitTime?: number } {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  
  let record: RateLimitRecord;
  
  if (stored) {
    try {
      record = JSON.parse(stored);
    } catch {
      record = { timestamps: [] };
    }
  } else {
    record = { timestamps: [] };
  }

  // Filter out timestamps outside the current window
  record.timestamps = record.timestamps.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  // Check if limit is exceeded
  if (record.timestamps.length >= MAX_SUBMISSIONS) {
    const oldestTimestamp = Math.min(...record.timestamps);
    const waitTime = Math.ceil((oldestTimestamp + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, waitTime };
  }

  // Add current timestamp
  record.timestamps.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));

  return { allowed: true };
}

/**
 * Clear rate limit records (useful for testing or after successful completion)
 */
export function clearRateLimit(): void {
  localStorage.removeItem(RATE_LIMIT_KEY);
}
