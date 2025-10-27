import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeGA4 } from './utils/analytics';

// Function to get client_id from multiple sources
const getClientIdAndConfig = (): { clientId?: string; pageLocation?: string } => {
  // 1. Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const urlClientId = urlParams.get('clientId') || urlParams.get('client_id');
  const urlPageLocation = urlParams.get('pageLocation') || urlParams.get('page_location');

  // 2. Check window config (set by parent page script)
  const configClientId = window.rockPopupConfig?.clientId;
  const configPageLocation = window.rockPopupConfig?.pageLocation;

  return {
    clientId: urlClientId || configClientId,
    pageLocation: urlPageLocation || configPageLocation,
  };
};

// Get initial config
let config = getClientIdAndConfig();

// Listen for postMessage from parent window (for iframe embed)
window.addEventListener('message', (event) => {
  // For production, add origin validation:
  // if (event.origin !== 'https://your-parent-domain.com') return;
  
  if (event.data && event.data.type === 'rockPopupConfig') {
    const newClientId = event.data.clientId || event.data.client_id;
    const newPageLocation = event.data.pageLocation || event.data.page_location;
    
    // Update config if new values provided
    if (newClientId) {
      config.clientId = newClientId;
    }
    if (newPageLocation) {
      config.pageLocation = newPageLocation;
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
};

// Initialize GA4 with client_id
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
