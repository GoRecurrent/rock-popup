# Rock Academy Popup - Parent Page Integration Guide

This guide explains how to embed the Rock Academy popup on your parent website with GA4 tracking.

## Option 1: Direct Script Embed (Recommended)

This method loads the popup directly into your parent page as a React component.

### Step 1: Add Configuration Script

Add this script **before** loading the popup bundle. This passes your GA4 client_id to the popup:

```html
<script>
  // Configure the popup with your GA4 client_id
  window.rockPopupConfig = {
    clientId: 'YOUR_GA4_CLIENT_ID_HERE', // Get from your GA4 instance
    pageLocation: window.location.href
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
      pageLocation: window.location.href
    };
    
    // Load the popup script after config is set
    var script = document.createElement('script');
    script.src = 'https://your-cdn.com/rock-popup.umd.js';
    document.body.appendChild(script);
  });
</script>
```

## Option 2: Iframe Embed

If you prefer isolation, you can embed as an iframe:

```html
<iframe 
  src="https://your-popup-domain.com/?clientId=YOUR_CLIENT_ID&pageLocation=YOUR_PAGE" 
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999;"
  allow="clipboard-write">
</iframe>
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
