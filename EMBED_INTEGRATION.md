# Rock Academy Popup - Parent Page Integration Guide

This guide explains how to embed the Rock Academy popup on your parent website with GA4 tracking.

## Client ID Passing Methods

The popup supports receiving client_id via URL parameters (primary method) and postMessage (fallback):

### Expected URL Parameters
- `client_id` - GA4 client ID from the main site (required)
- `origin` - Origin URL of the main site, e.g., `https://www.therockacademy.org` (optional)

Example popup URL:
```
https://rock-popup.lovable.app/?client_id=XYZ123&origin=https%3A%2F%2Fwww.therockacademy.org
```

The popup will:
1. Read `client_id` and `origin` from URL parameters on load
2. Initialize GA4 (Measurement ID: G-673KD4D1H5) with the provided `client_id`
3. Track all user interactions with GA4 events using this `client_id` for proper attribution

## Google Tag Manager (GTM) Integration (Recommended)

This method allows you to deploy the popup via GTM without touching your site code.

### Step 1: Create Custom HTML Tag in GTM

1. Go to your GTM container
2. Create a new **Custom HTML** tag
3. Paste this code:

```html
<script>
  // Function to get GA4 client_id and initialize popup
  (function() {
    // Replace with your GA4 Measurement ID
    var GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    // Get client_id from GA4
    if (window.gtag) {
      window.gtag('get', GA4_MEASUREMENT_ID, 'client_id', function(clientId) {
        // Set popup configuration
        window.rockPopupConfig = {
          clientId: clientId,
          pageLocation: window.location.href,
          // Optional: Set to true to force show popup even if previously dismissed
          // forceShow: true
        };
        
        // Load popup styles
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://your-cdn.com/rock-popup.css';
        document.head.appendChild(link);
        
        // Load popup script
        var script = document.createElement('script');
        script.src = 'https://your-cdn.com/rock-popup.umd.js';
        document.body.appendChild(script);
      });
    } else {
      console.warn('GA4 not available - popup will load without client_id');
      // Load popup anyway
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://your-cdn.com/rock-popup.css';
      document.head.appendChild(link);
      
      var script = document.createElement('script');
      script.src = 'https://your-cdn.com/rock-popup.umd.js';
      document.body.appendChild(script);
    }
  })();
</script>
```

### Step 2: Configure Tag Firing

Set the tag to fire on:
- **Trigger Type**: Page View
- **Trigger Condition**: All Pages (or specific pages where you want the popup)

### Step 3: Update URLs

Replace these placeholders in the code:
- `G-XXXXXXXXXX` - Your GA4 Measurement ID
- `https://your-cdn.com/rock-popup.css` - Your hosted CSS file URL
- `https://your-cdn.com/rock-popup.umd.js` - Your hosted JS file URL

### Step 4: Publish

1. Submit your GTM container changes
2. Test the popup appears on your site
3. Verify GA4 events are firing in GA4 DebugView

## Option 1: Direct Script Embed

This method loads the popup directly into your parent page as a React component.

### Step 1: Add Configuration Script

Add this script **before** loading the popup bundle. This passes your GA4 client_id to the popup:

```html
<script>
  // Configure the popup with your GA4 client_id
  window.rockPopupConfig = {
    clientId: 'YOUR_GA4_CLIENT_ID_HERE', // Get from your GA4 instance
    pageLocation: window.location.href,
    // Optional: Set to true to force show popup even if previously dismissed
    // forceShow: true
  };
</script>
```

### Step 2: Load the Popup Bundle

Add the popup script (after building with `BUILD_MODE=library npm run build`):

```html
<!-- Load popup styles -->
<link rel="stylesheet" href="https://your-cdn.com/rock-popup.css">

<!-- Load popup script -->
<script src="https://your-cdn.com/rock-popup.umd.js"></script>
```

### Step 3: Getting Your GA4 Client ID

To get the client_id from your parent page's GA4 instance:

```html
<script>
  // Wait for GA4 to be ready and get client_id
  window.gtag('get', 'YOUR_GA4_MEASUREMENT_ID', 'client_id', function(clientId) {
    window.rockPopupConfig = {
      clientId: clientId,
      pageLocation: window.location.href,
      // Optional: Set to true to force show popup even if previously dismissed
      // forceShow: true
    };
    
    // Load the popup script after config is set
    var script = document.createElement('script');
    script.src = 'https://your-cdn.com/rock-popup.umd.js';
    document.body.appendChild(script);
  });
</script>
```

## Iframe Embed (Recommended for GTM)

The iframe approach is CORS-safe and works across domains. The popup automatically communicates with the parent to close itself when the user clicks the close button.

### GTM Iframe Implementation

Add this Custom HTML tag in GTM:

```html
<script>
(function() {
  // Prevent multiple loads
  if (window.rockPopupIframeLoaded) return;
  window.rockPopupIframeLoaded = true;

  // Replace with your GA4 Measurement ID
  var GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  // Get client_id from GA4
  if (window.gtag) {
    window.gtag('get', GA4_MEASUREMENT_ID, 'client_id', function(clientId) {
      // Build iframe URL with client_id and origin
      var iframeSrc = 'https://rock-popup.lovable.app/?client_id=' + 
                      encodeURIComponent(clientId) + 
                      '&origin=' + encodeURIComponent(window.location.origin);
      
      // Create iframe
      var iframe = document.createElement('iframe');
      iframe.id = 'rockPopupIframe';
      iframe.src = iframeSrc;
      iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:999999;pointer-events:none;';
      iframe.setAttribute('allow', 'clipboard-write');
      
      // Enable pointer events when iframe loads
      iframe.onload = function() {
        iframe.style.pointerEvents = 'auto';
      };
      
      document.body.appendChild(iframe);
      
      // Listen for close message from popup
      window.addEventListener('message', function(event) {
        if (event.origin === 'https://rock-popup.lovable.app' && 
            event.data.type === 'closePopup') {
          var iframe = document.getElementById('rockPopupIframe');
          if (iframe) {
            iframe.remove();
          }
        }
      });
    });
  }
})();
</script>
```

**Configuration:**
- Replace `G-XXXXXXXXXX` with your main site's GA4 Measurement ID
- Set trigger to fire on desired pages (e.g., All Pages)
- The popup will automatically:
  - Receive the client_id for GA4 attribution
  - Track all events to your GA4 property
  - Send a `closePopup` message when user closes it
  - Be removed from the DOM by the parent page

### Close Button Communication

The popup automatically sends a postMessage to the parent window when closed:

```javascript
// Message structure sent from popup to parent
{
  type: 'closePopup',
  timestamp: '2025-01-15T10:30:00.000Z'
}
```

The parent page's GTM script listens for this message and removes the iframe from the DOM.

## Option 2: Direct Iframe Embed (Manual)

For dynamic client_id updates, use postMessage:

```html
<iframe 
  id="rockPopupIframe"
  src="https://rock-popup.lovable.app/" 
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999;"
  allow="clipboard-write">
</iframe>

<script>
  // Get GA4 client_id and send to iframe (fallback method)
  window.gtag('get', 'YOUR_GA4_MEASUREMENT_ID', 'client_id', function(clientId) {
    const iframe = document.getElementById('rockPopupIframe');
    iframe.contentWindow.postMessage({
      type: 'rockPopupConfig',
      client_id: clientId,
      origin: window.location.origin
    }, 'https://rock-popup.lovable.app');
  });
</script>
```

## Building for Embed

To build the popup for embedding on external sites:

```bash
BUILD_MODE=library npm run build
```

This creates:
- `dist/rock-popup.umd.js` - UMD bundle for script tag
- `dist/rock-popup.es.js` - ES module bundle
- `dist/rock-popup.css` - Bundled styles

## GA4 Events Tracked

The popup automatically tracks these events to your GA4 measurement ID (G-673KD4D1H5):

### 1. popup_display
Fires when the popup opens.
- **Parameters:** `page_location`

### 2. popup_interaction
Fires on first user interaction (any click except close button).
- Fires only once per session

### 3. popup_step1 through popup_step5
Fires when user completes each step.
- **Step 1 Parameters:** `step_value` (selected reason)
- **Step 2 Parameters:** `step_value` (selected concern)
- **Step 3 Parameters:** `children_count`, `grade_levels` array
- **Step 4 Parameters:** `has_questions` boolean
- **Step 5 Parameters:** None (triggers generate_lead next)

### 4. generate_lead
Fires when user submits contact information.
- **Parameters:** 
  - `parent_name`
  - `email_domain` (only domain for privacy, not full email)
  - `phone_provided` (boolean)

### 5. popup_completion
Fires when thank you page loads.
- **Parameters:** `completed_at` (ISO timestamp)

## Testing GA4 Integration

1. **Local Testing:**
   - Open GA4 DebugView in your property
   - Load the page with the popup
   - Verify events appear in DebugView

2. **Client ID Verification:**
   - Check that client_id is being passed correctly
   - Events should maintain session continuity with parent page

3. **Event Parameter Testing:**
   - Complete the entire flow
   - Verify all parameters are captured correctly

## Privacy Considerations

- Only email domain is sent (not full email address)
- Phone number is sent as boolean (not actual number)
- Respects parent page's cookie consent
- Client ID maintains session tracking across parent/popup

## Troubleshooting

### Events not appearing in GA4
- Verify GA4 script is loaded in parent page
- Check browser console for errors
- Ensure client_id is being passed correctly

### Client ID not working
- Make sure `window.rockPopupConfig` is set before popup loads
- Verify GA4 measurement ID matches
- Check that gtag is initialized on parent page

### Popup not loading
- Check console for JavaScript errors
- Verify all required scripts are loaded
- Ensure styles are included

## Support

For issues or questions, contact Rock Academy technical support.
