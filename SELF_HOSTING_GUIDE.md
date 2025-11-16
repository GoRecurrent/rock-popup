# Self-Hosting Guide for Rock Academy Popup

This guide walks you through building and hosting the Rock Academy popup on your own infrastructure, eliminating malware warnings from iframe embedding while maintaining full functionality with Supabase edge functions.

## Overview

**What You'll Get:**
- Compiled JavaScript bundle that works from any domain
- Full access to Supabase edge functions and secrets
- No cross-origin issues or malware warnings
- Same functionality as iframe version

**Edge Functions & Secrets:**
All Supabase edge functions and secrets continue to work because:
- The compiled JavaScript makes HTTPS requests to `hkbwjmquotrwuinagcia.supabase.co`
- Supabase servers execute edge functions with access to your secrets
- Webhook URLs remain secure (only stored in Supabase)
- Rate limiting and bot detection work server-side

---

## Step 1: Export to GitHub

1. Click the **GitHub** button in Lovable (top-right corner)
2. Follow prompts to connect and create/sync repository
3. Your code is now in GitHub

---

## Step 2: Build the Library Bundle

### Prerequisites
- Node.js 18+ installed
- Git installed

### Build Commands

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Build the library bundle
BUILD_MODE=library npm run build
```

### Output Files

After building, you'll find these files in the `dist` folder:

```
dist/
├── rock-popup.umd.js      # Universal module (works everywhere)
├── rock-popup.es.js       # ES module version
└── rock-popup.css         # All styles
```

**File Sizes (approximate):**
- `rock-popup.umd.js`: ~250KB
- `rock-popup.css`: ~20KB

---

## Step 3: Host the Files

Upload the three files to your web hosting:

### Option A: Main Website Assets Folder
```
https://www.therockacademy.org/assets/rock-popup.umd.js
https://www.therockacademy.org/assets/rock-popup.css
```

### Option B: CDN (Recommended for Performance)
- Cloudflare CDN
- AWS CloudFront
- Bunny CDN
- Any CDN service

### Option C: Subdomain
```
https://popup.therockacademy.org/rock-popup.umd.js
https://popup.therockacademy.org/rock-popup.css
```

**Important:** Ensure files are served with proper MIME types:
- `.js` → `application/javascript`
- `.css` → `text/css`

---

## Step 4: Integration Methods

Choose one of three integration methods:

### Method 1: Google Tag Manager (Recommended)

**Best for:** Sites already using GTM, no code changes needed

1. Go to your GTM container
2. Create new **Custom HTML** tag
3. Paste this code:

```html
<script>
  (function() {
    // Replace with your GA4 Measurement ID
    var GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    if (window.gtag) {
      window.gtag('get', GA4_MEASUREMENT_ID, 'client_id', function(clientId) {
        window.rockPopupConfig = {
          clientId: clientId,
          pageLocation: window.location.href,
          origin: window.location.origin
        };
        
        // Load CSS
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://www.therockacademy.org/assets/rock-popup.css';
        document.head.appendChild(link);
        
        // Load JS
        var script = document.createElement('script');
        script.src = 'https://www.therockacademy.org/assets/rock-popup.umd.js';
        document.body.appendChild(script);
      });
    }
  })();
</script>
```

4. Set trigger to **All Pages** (or specific pages)
5. Save and publish

**See:** `examples/gtm-integration.html` for complete example

---

### Method 2: Direct HTML Embed

**Best for:** Static sites, WordPress, custom CMS

Add before `</body>` tag:

```html
<!-- Configure popup -->
<script>
  window.rockPopupConfig = {
    clientId: 'YOUR_GA4_CLIENT_ID',
    pageLocation: window.location.href,
    origin: window.location.origin
  };
</script>

<!-- Load popup -->
<link rel="stylesheet" href="https://www.therockacademy.org/assets/rock-popup.css">
<script src="https://www.therockacademy.org/assets/rock-popup.umd.js"></script>
```

**See:** `examples/direct-html-integration.html` for complete example

---

### Method 3: Dynamic JavaScript Loading

**Best for:** SPAs, React apps, advanced integrations

```javascript
// Get GA4 client_id first
if (window.gtag) {
  gtag('get', 'G-XXXXXXXXXX', 'client_id', function(clientId) {
    window.rockPopupConfig = {
      clientId: clientId,
      pageLocation: window.location.href,
      origin: window.location.origin
    };
    
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/rock-popup.css';
    document.head.appendChild(link);
    
    // Load JS
    const script = document.createElement('script');
    script.src = '/assets/rock-popup.umd.js';
    document.body.appendChild(script);
  });
}
```

**See:** `examples/dynamic-loading.html` for complete example

---

## Step 5: Verify Installation

### Test Checklist

✅ **Visual Check**
- Popup displays correctly on your domain
- Styles load properly (no broken CSS)
- All form steps render correctly

✅ **Functionality Check**
- Complete entire form submission
- Check Make.com receives webhook data
- Verify both webhooks fire (after Step 4 and Step 6)

✅ **Analytics Check**
- Open GA4 DebugView
- Trigger popup
- Verify these events appear:
  - `popup_display`
  - `popup_interaction`
  - `popup_step1`, `popup_step2`, etc.
  - `generate_lead`
  - `popup_completion`

✅ **Security Check**
- No malware warnings (same domain = no issues)
- Rate limiting works (try submitting 4+ times quickly)
- Bot detection works (check server logs)
- Form validation works (try invalid inputs)

✅ **Cross-Browser Check**
- Chrome/Edge
- Firefox
- Safari (desktop & mobile)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Configuration Options

### `window.rockPopupConfig`

```javascript
window.rockPopupConfig = {
  // Required
  clientId: 'GA4_CLIENT_ID',       // From Google Analytics 4
  
  // Optional
  pageLocation: window.location.href,  // Current page URL
  origin: window.location.origin,      // Parent domain
  forceShow: false,                    // Force show even if dismissed
  reset: false                         // Reset all localStorage data
};
```

### Force Show Popup (Testing)

```javascript
window.rockPopupConfig = {
  clientId: 'test-client-id',
  forceShow: true  // Always show, ignore dismissal state
};
```

### Reset All Data

```javascript
window.rockPopupConfig = {
  clientId: 'test-client-id',
  reset: true  // Clear localStorage (rate limits, dismissal)
};
```

---

## Updates & Maintenance

### When You Change Frontend Code

1. Make changes in Lovable
2. Export to GitHub (automatic sync)
3. Pull changes locally: `git pull`
4. Rebuild bundle: `BUILD_MODE=library npm run build`
5. Re-upload files to hosting
6. Clear CDN cache if using one

### When You Change Edge Functions

Edge functions deploy automatically in Lovable - **no rebuild needed**!

Changes take effect immediately:
- Webhook logic updates
- Rate limiting changes
- Bot detection updates
- Any server-side logic

---

## Troubleshooting

### Popup Doesn't Appear

**Check:**
1. Files loaded correctly (check Network tab)
2. Console for JavaScript errors
3. `window.rockPopupConfig` is set before loading script
4. Popup wasn't previously dismissed (try `forceShow: true`)

**Debug:**
```javascript
// Check if config is loaded
console.log(window.rockPopupConfig);

// Force show popup
localStorage.removeItem('rockPopupDismissed');
window.location.reload();
```

### Styles Look Broken

**Check:**
1. CSS file loads (Network tab)
2. CSS MIME type is `text/css`
3. No Content Security Policy blocking styles
4. CSS path is correct

### Form Submissions Fail

**Check:**
1. Console for errors
2. Network tab for failed requests to Supabase
3. Edge function logs in Supabase dashboard
4. Webhook URLs are still valid in Make.com

**View Edge Function Logs:**
```
https://supabase.com/dashboard/project/hkbwjmquotrwuinagcia/functions/submit-form/logs
```

### GA4 Events Not Tracking

**Check:**
1. GA4 client_id is being passed correctly
2. `window.gtag` exists before popup loads
3. GA4 Measurement ID is correct
4. Events appear in GA4 DebugView (24-48 hour delay for reports)

---

## Security Notes

### What's Secure

✅ Webhook URLs stored in Supabase secrets (never exposed)  
✅ Server-side rate limiting (can't be bypassed)  
✅ Bot detection on client AND server  
✅ Input validation with Zod schemas  
✅ HTML sanitization with DOMPurify  
✅ CORS properly configured  
✅ No PII logged in production (new logger utility)

### What to Monitor

- Edge function logs for suspicious activity
- Rate limit hits in Supabase
- Bot detection triggers
- Failed validation attempts

---

## Performance Optimization

### Lazy Loading (Optional)

Load popup only when user scrolls or after delay:

```javascript
// Load after 5 seconds
setTimeout(() => {
  loadRockPopup();
}, 5000);

// Or load on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    loadRockPopup();
    // Remove listener to load only once
    window.removeEventListener('scroll', arguments.callee);
  }
});
```

### CDN Caching

Configure CDN to cache files:
- `.js` files: 1 year
- `.css` files: 1 year
- Use versioned URLs when updating: `rock-popup.v2.umd.js`

---

## Support

**Supabase Dashboard:**
- Project: `hkbwjmquotrwuinagcia`
- Edge Functions: https://supabase.com/dashboard/project/hkbwjmquotrwuinagcia/functions
- Logs: https://supabase.com/dashboard/project/hkbwjmquotrwuinagcia/functions/submit-form/logs

**Existing Documentation:**
- See `EMBED_INTEGRATION.md` for detailed integration docs
- See `examples/` folder for complete code examples

**Build Issues:**
- Ensure Node.js 18+ is installed
- Try clearing node_modules: `rm -rf node_modules && npm install`
- Check build errors in console output
