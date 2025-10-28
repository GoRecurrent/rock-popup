/**
 * Utility for cross-origin communication with parent window
 * Used when the popup is embedded in an iframe
 */

/**
 * Sends analytics events to the parent window
 * This allows the parent page to track user interactions within the iframe
 */
export const sendPopupEventToParent = (eventName: string, eventParams?: Record<string, any>) => {
  // Check if we're running in an iframe
  if (window.self !== window.top) {
    const targetOrigin = window.rockPopupConfig?.origin || '*';
    
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
      console.log('Sent event to parent:', eventName, eventParams);
    } catch (error) {
      console.error('Error sending event to parent:', error);
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
    const targetOrigin = window.rockPopupConfig?.origin || '*';
    
    try {
      window.parent.postMessage(
        {
          type: 'closePopup',
          timestamp: new Date().toISOString()
        },
        targetOrigin
      );
      console.log('Sent closePopup message to parent window');
    } catch (error) {
      console.error('Error sending message to parent:', error);
    }
  }
};
