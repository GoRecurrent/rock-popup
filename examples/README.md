# Integration Examples

This folder contains complete, working examples for integrating the self-hosted Rock Academy popup on your website.

## Files

### 1. `gtm-integration.html`
**Best for:** Sites using Google Tag Manager

Complete example showing how to load the popup via GTM Custom HTML tag. Includes:
- Automatic GA4 client_id retrieval
- Dynamic CSS/JS loading
- Error handling and logging
- Configuration options

**Setup:**
1. Copy the `<script>` block to GTM Custom HTML tag
2. Update `GA4_MEASUREMENT_ID`, `POPUP_CSS_URL`, `POPUP_JS_URL`
3. Set trigger to "All Pages"

---

### 2. `direct-html-integration.html`
**Best for:** Static sites, WordPress, simple integrations

Shows how to add popup directly to your HTML. Includes:
- Simple script configuration
- Direct file loading
- Minimal setup required

**Setup:**
1. Copy the integration code before `</body>`
2. Update `clientId` and file URLs
3. Upload and test

---

### 3. `dynamic-loading.html`
**Best for:** Advanced integrations, SPAs, conditional loading

Interactive demo with multiple loading strategies:
- Load with GA4 client_id
- Lazy load after delay
- Lazy load on scroll
- Force show for testing
- Reset popup data

**Features:**
- Live demo controls
- Status updates
- Scroll tracking
- Multiple loading methods

---

## Quick Start

1. **Choose your integration method** based on your website setup
2. **Open the relevant HTML file** to see complete working code
3. **Copy the integration code** to your website
4. **Update configuration values:**
   - GA4 Measurement ID (if using GA4)
   - CSS file URL
   - JS file URL
5. **Test** on your website

## Configuration

All examples support these configuration options:

```javascript
window.rockPopupConfig = {
  clientId: 'YOUR_GA4_CLIENT_ID',    // Optional: GA4 client ID
  pageLocation: window.location.href, // Current page URL
  origin: window.location.origin,     // Parent domain
  forceShow: false,                   // Force show even if dismissed
  reset: false                        // Reset localStorage data
};
```

## Testing

**Force show popup:**
```javascript
window.rockPopupConfig = { forceShow: true };
```

**Reset dismissal:**
```javascript
localStorage.removeItem('rockPopupDismissed');
window.location.reload();
```

**Check if loaded:**
```javascript
console.log(window.rockPopupConfig);
```

## Need Help?

- See `../SELF_HOSTING_GUIDE.md` for complete setup instructions
- See `../EMBED_INTEGRATION.md` for detailed integration documentation
- Check browser console for error messages
- Verify files load in Network tab
