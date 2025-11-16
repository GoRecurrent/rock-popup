/**
 * Bot detection utilities using honeypot fields and timing analysis
 */

export interface HoneypotFields {
  website: string; // Hidden field that real users won't fill
  company: string; // Another hidden field
  phone_backup: string; // Looks legitimate but shouldn't be filled
}

export interface BotDetectionData {
  honeypot: HoneypotFields;
  formStartTime: number;
  userAgent: string;
}

/**
 * Create empty honeypot fields
 */
export function createHoneypotFields(): HoneypotFields {
  return {
    website: "",
    company: "",
    phone_backup: ""
  };
}

/**
 * Check if submission appears to be from a bot
 * @param honeypot - Honeypot fields that should be empty
 * @param formStartTime - Timestamp when form was first displayed
 * @returns Object with isBot flag and reason if detected
 */
export function detectBot(
  honeypot: HoneypotFields,
  formStartTime: number
): { isBot: boolean; reason?: string } {
  // Check honeypot fields - they should all be empty
  if (honeypot.website || honeypot.company || honeypot.phone_backup) {
    return { isBot: true, reason: "Honeypot field filled" };
  }

  // Check timing - form should take at least 10 seconds to complete legitimately
  const timeElapsed = Date.now() - formStartTime;
  const MIN_FORM_TIME_MS = 10000; // 10 seconds minimum
  
  if (timeElapsed < MIN_FORM_TIME_MS) {
    return { isBot: true, reason: "Form submitted too quickly" };
  }

  // Check maximum time - if form is open for more than 30 minutes, might be automated
  const MAX_FORM_TIME_MS = 1800000; // 30 minutes
  if (timeElapsed > MAX_FORM_TIME_MS) {
    return { isBot: true, reason: "Form open too long" };
  }

  return { isBot: false };
}

/**
 * Prepare bot detection data for server validation
 */
export function prepareBotDetectionData(
  honeypot: HoneypotFields,
  formStartTime: number
): BotDetectionData {
  return {
    honeypot,
    formStartTime,
    userAgent: navigator.userAgent
  };
}
