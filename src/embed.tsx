import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Function to get client_id and config from multiple sources
const getClientIdAndConfig = (): { 
  clientId?: string; 
  pageLocation?: string; 
  origin?: string;
  forceShow?: boolean;
  reset?: boolean;
} => {
  // 1. Check URL parameters (primary method)
  const urlParams = new URLSearchParams(window.location.search);
  const urlClientId = urlParams.get('client_id') || urlParams.get('clientId');
  const urlPageLocation = urlParams.get('pageLocation') || urlParams.get('page_location');
  const urlOrigin = urlParams.get('origin');

  // 2. Check window config (fallback for script embed)
  const configClientId = window.rockPopupConfig?.clientId;
  const configPageLocation = window.rockPopupConfig?.pageLocation;
  const configOrigin = window.rockPopupConfig?.origin;
  const configForceShow = window.rockPopupConfig?.forceShow;
  const configReset = window.rockPopupConfig?.reset;

  return {
    clientId: urlClientId || configClientId,
    pageLocation: urlPageLocation || configPageLocation,
    origin: urlOrigin || configOrigin,
    forceShow: configForceShow,
    reset: configReset,
  };
};

// Get initial config
let config = getClientIdAndConfig();

// Listen for postMessage from parent window (for iframe embed - fallback method)
window.addEventListener('message', (event) => {
  // For production, optionally validate origin:
  // if (event.origin !== config.origin) return;
  
  if (event.data && event.data.type === 'rockPopupConfig') {
    const newClientId = event.data.client_id || event.data.clientId;
    const newPageLocation = event.data.pageLocation || event.data.page_location;
    const newOrigin = event.data.origin;
    
    // Update config if new values provided
    if (newClientId) {
      config.clientId = newClientId;
    }
    if (newPageLocation) {
      config.pageLocation = newPageLocation;
    }
    if (newOrigin) {
      config.origin = newOrigin;
    }

    // Push updated client_id to dataLayer for GTM
    if (newClientId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        client_id: newClientId,
      });
    }
  }
});

// Store config globally for use by components
window.rockPopupConfig = {
  clientId: config.clientId,
  pageLocation: config.pageLocation,
  origin: config.origin,
  forceShow: config.forceShow,
  reset: config.reset,
};

// Push client_id to dataLayer for GTM to use
if (config.clientId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    client_id: config.clientId,
  });
}

// Mount the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
