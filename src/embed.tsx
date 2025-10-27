import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeGA4 } from './utils/analytics';

// Function to get client_id and config from multiple sources
const getClientIdAndConfig = (): { clientId?: string; pageLocation?: string; origin?: string } => {
  // 1. Check URL parameters (primary method)
  const urlParams = new URLSearchParams(window.location.search);
  const urlClientId = urlParams.get('client_id') || urlParams.get('clientId');
  const urlPageLocation = urlParams.get('pageLocation') || urlParams.get('page_location');
  const urlOrigin = urlParams.get('origin');

  // 2. Check window config (fallback for script embed)
  const configClientId = window.rockPopupConfig?.clientId;
  const configPageLocation = window.rockPopupConfig?.pageLocation;
  const configOrigin = window.rockPopupConfig?.origin;

  return {
    clientId: urlClientId || configClientId,
    pageLocation: urlPageLocation || configPageLocation,
    origin: urlOrigin || configOrigin,
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

    // Reinitialize GA4 with new client_id
    if (newClientId) {
      initializeGA4(newClientId);
    }
  }
});

// Store config globally for use by components
window.rockPopupConfig = {
  clientId: config.clientId,
  pageLocation: config.pageLocation,
  origin: config.origin,
};

// Initialize GA4 with client_id from main site
// Measurement ID: G-673KD4D1H5
initializeGA4(config.clientId);

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
