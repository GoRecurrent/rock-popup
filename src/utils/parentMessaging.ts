/**
 * Utility for cross-origin communication with parent window
 * Used when the popup is embedded in an iframe
 */

/**
 * Allowlist of trusted parent origins
 * Only these domains can receive sensitive user data via postMessage
 */
const ALLOWED_ORIGINS = [
  'https://www.therockacademy.org',
  // Development environments
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

/**
 * Validates that the configured origin is in the allowlist
 * @returns The validated origin or null if invalid
 */
const getValidatedOrigin = (): string | null => {
  const configuredOrigin = window.rockPopupConfig?.origin;
  
  if (!configuredOrigin) {
    console.error('rockPopupConfig.origin is not set. Cannot send data to parent window.');
    return null;
  }
  
  if (!ALLOWED_ORIGINS.includes(configuredOrigin)) {
    console.error(`Invalid origin: ${configuredOrigin}. Origin must be in the allowlist.`);
    return null;
  }
  
  return configuredOrigin;
};

/**
 * Sends analytics events to the parent window
 * This allows the parent page to track user interactions within the iframe
 */
export const sendPopupEventToParent = (eventName: string, eventParams?: Record<string, any>) => {
  // Check if we're running in an iframe
  if (window.self !== window.top) {
    const targetOrigin = getValidatedOrigin();
    
    // Only send if origin is valid
    if (!targetOrigin) {
      return;
    }
    
    try {
      window.parent.postMessage(
        {
          type: 'rockPopupEvent',
          eventName: eventName,
          eventParams: eventParams || {},
          timestamp: new Date().toISOString()
        },
        targetOrigin
      );
    } catch (error) {
      console.error('Error sending event to parent');
    }
  }
};

/**
 * Notifies the parent window that the popup should be closed
 * This sends a postMessage to the parent, which can remove the iframe
 */
export const notifyParentToClose = () => {
  // Check if we're running in an iframe
  if (window.self !== window.top) {
    const targetOrigin = getValidatedOrigin();
    
    // Only send if origin is valid
    if (!targetOrigin) {
      return;
    }
    
    try {
      window.parent.postMessage(
        {
          type: 'closePopup',
          timestamp: new Date().toISOString()
        },
        targetOrigin
      );
    } catch (error) {
      console.error('Error sending message to parent');
    }
  }
};
