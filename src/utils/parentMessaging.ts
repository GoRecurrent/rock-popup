/**
 * Utility for cross-origin communication with parent window
 * Used when the popup is embedded in an iframe
 */

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
