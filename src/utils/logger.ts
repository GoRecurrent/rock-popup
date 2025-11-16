/**
 * Conditional logger that provides detailed error information in development
 * but only safe messages in production to prevent PII leakage
 */

const isDev = import.meta.env.DEV;

/**
 * Safely extracts error message without exposing full error object in production
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

/**
 * Logs error information - detailed in development, safe in production
 */
export const logError = (message: string, error?: unknown) => {
  if (isDev) {
    // Development: Log full error details for debugging
    console.error(message, error);
  } else {
    // Production: Only log safe message without PII
    if (error) {
      console.error(`${message}: ${getErrorMessage(error)}`);
    } else {
      console.error(message);
    }
  }
};

/**
 * Logs warning information - detailed in development, safe in production
 */
export const logWarn = (message: string, data?: unknown) => {
  if (isDev) {
    console.warn(message, data);
  } else {
    console.warn(message);
  }
};

/**
 * Logs info - always logs in both environments (no sensitive data expected)
 */
export const logInfo = (message: string) => {
  console.info(message);
};
