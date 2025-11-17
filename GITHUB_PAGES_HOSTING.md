# Rock Academy Popup - GitHub Pages Hosting Guide

This guide walks you through hosting your popup library files on GitHub Pages (100% free!) and integrating them into your WordPress site.

---

## 🎯 Why GitHub Pages?

GitHub Pages is perfect for hosting your popup files because it:
- ✅ **Free hosting** with unlimited bandwidth
- ✅ **No CORS issues** - works seamlessly with WordPress
- ✅ **Fast CDN delivery** - files served quickly worldwide
- ✅ **Easy updates** - just rebuild and upload new files
- ✅ **Version control** - track all changes to your popup
- ✅ **HTTPS by default** - secure delivery

---

## ✅ Prerequisites

Before starting, make sure you have:
- ✅ Your project code on your Mac (see `BUILD_INSTRUCTIONS_MAC.md` if needed)
- ✅ A GitHub account (sign up free at [github.com](https://github.com))
- ✅ Your project connected to GitHub (see Lovable's GitHub integration)
- ✅ The popup library files built (the 3 files in your `dist/` folder)
- ✅ Access to your WordPress admin panel

**Estimated time:** 20-30 minutes

---

## Part 1: Build Your Library Files 📦

If you haven't built your library files yet, follow these steps:

### On Your Mac:

```bash
# Navigate to your project folder
cd ~/Desktop/rock-academy-popup

# Pull latest changes from GitHub
git pull

# Build the library files
BUILD_MODE=library npm run build

# Verify the files were created
ls -lh dist/
```

You should see:
- ✅ `rock-popup.umd.js` (around 500KB-2MB)
- ✅ `rock-popup.es.js` (similar size)
- ✅ `rock-popup.css` (around 50-200KB)

**Already built them?** Great! Move to Part 2.

---

## Part 2: Enable GitHub Pages 🚀

### Step 1: Go to Your Repository Settings

1. Go to [github.com](https://github.com) and sign in
2. Navigate to your `rock-academy-popup` repository
3. Click **Settings** (near the top right, with a gear icon)

### Step 2: Navigate to Pages Settings

1. In the left sidebar, scroll down and click **Pages** (under "Code and automation")
2. You'll see the GitHub Pages configuration screen

### Step 3: Choose Your Publishing Source

You have three options. We recommend **Option A** (docs folder):

#### Option A: Use `/docs` Folder (Recommended ⭐)

This is the cleanest approach - keeps your library files separate from source code.

1. Under "Build and deployment", find **Source**
2. Select **Deploy from a branch**
3. Under **Branch**, select:
   - Branch: `main` (or `master`)
   - Folder: `/docs`
4. Click **Save**

#### Option B: Use Root of Main Branch

Simpler but mixes library files with source code.

1. Under **Branch**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
2. Click **Save**

#### Option C: Use `gh-pages` Branch

More advanced, keeps files completely separate.

1. Create a new branch called `gh-pages`:
```bash
git checkout -b gh-pages
git push origin gh-pages
git checkout main
```

2. In GitHub Pages settings, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**

### Step 4: Note Your GitHub Pages URL

After saving, you'll see a message like:

> "Your site is live at `https://yourusername.github.io/rock-academy-popup/`"

**Save this URL!** You'll need it in Part 4.

⏱️ **Note:** It may take 1-3 minutes for GitHub Pages to deploy initially.

---

## Part 3: Upload Files to GitHub 📤

Now let's upload your built library files to the location GitHub Pages expects.

### If Using `/docs` Folder (Option A):

```bash
# Navigate to your project
cd ~/Desktop/rock-academy-popup

# Create docs folder if it doesn't exist
mkdir -p docs

# Copy the built files to docs
cp dist/rock-popup.umd.js docs/
cp dist/rock-popup.es.js docs/
cp dist/rock-popup.css docs/

# Add the files to git
git add docs/

# Commit the files
git commit -m "Add popup library files for GitHub Pages"

# Push to GitHub
git push origin main
```

### If Using Root (Option B):

```bash
# Navigate to your project
cd ~/Desktop/rock-academy-popup

# The dist files are already in your project root after building
# Just add them to git
git add dist/

# Commit the files
git commit -m "Add popup library files for GitHub Pages"

# Push to GitHub
git push origin main
```

### If Using `gh-pages` Branch (Option C):

```bash
# Switch to gh-pages branch
git checkout gh-pages

# Copy files from main branch dist folder
git checkout main -- dist/rock-popup.umd.js
git checkout main -- dist/rock-popup.es.js
git checkout main -- dist/rock-popup.css

# Move them to root
mv dist/* .
rm -rf dist/

# Commit and push
git add rock-popup.*
git commit -m "Update popup library files"
git push origin gh-pages

# Switch back to main branch
git checkout main
```

### Verify Upload

1. Go to your GitHub repository
2. Navigate to the folder you chose (`docs/` or root)
3. You should see the 3 files:
   - `rock-popup.umd.js`
   - `rock-popup.es.js`
   - `rock-popup.css`

---

## Part 4: Get Your File URLs 🔗

Your files are now hosted! Here's how to construct the URLs:

### Base URL Format:

```
https://[YOUR-USERNAME].github.io/[REPOSITORY-NAME]/[PATH]/[FILENAME]
```

### Examples:

If your GitHub username is `therockacademy` and repository is `rock-academy-popup`:

#### Using `/docs` Folder:
```
https://therockacademy.github.io/rock-academy-popup/docs/rock-popup.umd.js
https://therockacademy.github.io/rock-academy-popup/docs/rock-popup.es.js
https://therockacademy.github.io/rock-academy-popup/docs/rock-popup.css
```

#### Using Root:
```
https://therockacademy.github.io/rock-academy-popup/rock-popup.umd.js
https://therockacademy.github.io/rock-academy-popup/rock-popup.es.js
https://therockacademy.github.io/rock-academy-popup/rock-popup.css
```

### Test Your URLs:

1. Copy the URL for `rock-popup.umd.js`
2. Paste it into your browser
3. You should see JavaScript code
4. If you get a 404 error, wait 2-3 minutes (GitHub Pages is still deploying)

---

## Part 5: Integrate into WordPress 🔌

Now let's add the popup to your WordPress site!

### Step 1: Install a Header/Footer Plugin (Recommended)

The easiest way to add code to WordPress:

1. In WordPress admin, go to **Plugins → Add New**
2. Search for **"Insert Headers and Footers"** by WPBeginner
3. Click **Install Now**, then **Activate**

### Step 2: Add the Integration Code

1. In WordPress admin, go to **Settings → Insert Headers and Footers**
2. Scroll to the **Footer** section
3. Paste this code (replace the URLs with YOUR GitHub Pages URLs):

```html
<!-- Rock Academy Popup - Hosted on GitHub Pages -->
<link rel="stylesheet" href="https://YOUR-USERNAME.github.io/YOUR-REPO/docs/rock-popup.css">
<script src="https://YOUR-USERNAME.github.io/YOUR-REPO/docs/rock-popup.umd.js"></script>

<script>
  // Configuration
  window.rockPopupConfig = {
    supabaseUrl: 'https://hkbwjmquotrwuinagcia.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrYndqbXF1b3Ryd3VpbmFnY2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjY3NjUsImV4cCI6MjA2MDUwMjc2NX0.JlhiAi4NMLIzxWLyzpWqF6QwaFdsYMwp6kZ20jRdbDg',
    
    // IMPORTANT: Get your GA4 Client ID
    // See instructions below
    gaClientId: 'PASTE_YOUR_GA4_CLIENT_ID_HERE',
    
    // Optional: Track popup events to parent window
    // Leave empty if not needed
    origin: '',
    
    // Optional: Control when popup shows
    // triggerDelay: 5000,        // Show after 5 seconds
    // triggerScrollDepth: 50,    // Show after scrolling 50% of page
    // showOnExit: true,          // Show when user tries to leave
  };

  // Initialize the popup
  if (typeof RockPopup !== 'undefined') {
    RockPopup.init();
  } else {
    console.error('RockPopup library failed to load');
  }
</script>

<!-- 
  Note: The popup is designed to be fully isolated from your WordPress theme's CSS.
  It uses CSS scoping and high z-index (9999) to prevent style conflicts.
  If you experience any styling issues, please check the troubleshooting guide.
-->
```

### Step 3: Get Your GA4 Client ID (Important!)

The popup uses Google Analytics to track conversions. Here's how to get your GA4 Client ID:

#### Option A: From Your GA4 Property (Recommended)

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property for therockacademy.org
3. Go to **Admin** (bottom left gear icon)
4. Under **Property**, click **Data Streams**
5. Click on your web stream (therockacademy.org)
6. Look for **Measurement ID** (format: `G-XXXXXXXXXX`)
7. Copy this ID and paste it in the `gaClientId` field above

#### Option B: From Your WordPress Site (If GA4 Already Installed)

1. View the source code of your WordPress site (right-click → View Page Source)
2. Search for `gtag` or `G-` 
3. You'll find code like:
```javascript
gtag('config', 'G-XXXXXXXXXX');
```
4. Copy the `G-XXXXXXXXXX` value

#### Option C: Ask Your Web Developer/Marketing Team

If you don't have access, ask whoever manages your website's analytics for the GA4 Measurement ID.

### Step 4: Customize Trigger Settings (Optional)

You can control when the popup appears by uncommenting and adjusting these lines:

```javascript
// Show popup 5 seconds after page load
triggerDelay: 5000,

// Show popup after user scrolls 50% down the page
triggerScrollDepth: 50,

// Show popup when user tries to leave the page
showOnExit: true,
```

**Default behavior:** If you don't specify any triggers, the popup shows immediately on page load.

### Step 5: Save Changes

1. Click **Save** in the Insert Headers and Footers plugin
2. The popup will now appear on all pages of your WordPress site!

---

## Part 6: Testing & Verification ✅

Let's make sure everything works:

### Step 1: Visit Your WordPress Site

1. Open your site in a **new incognito/private browser window** (to avoid caching)
2. The popup should appear!

### Step 2: Test the Popup Functionality

- ✅ Popup appears at the right time (based on your trigger settings)
- ✅ All form fields are visible and labeled correctly
- ✅ You can progress through all steps without errors
- ✅ Clicking "Close" (X button) closes the popup
- ✅ Phone number formatting works (auto-formats as you type)
- ✅ Email validation works (shows error for invalid emails)
- ✅ Form submission completes successfully

### Step 3: Check Browser Console (For Errors)

1. Right-click on the page → **Inspect** (or press F12)
2. Click the **Console** tab
3. Look for any red error messages
4. Common errors and solutions are in the Troubleshooting section below

### Step 4: Verify Data Submission

1. Fill out and submit the popup form
2. Go to your Supabase dashboard
3. Check that the submission appears in your database table

### Step 5: Test on Mobile

1. Open your site on a mobile device
2. Verify the popup displays correctly
3. Test form submission on mobile

---

## Part 7: Making Updates 🔄

When you need to update the popup (new features, bug fixes, design changes):

### Step 1: Make Changes in Lovable

1. Make your changes in the Lovable editor
2. Changes automatically push to GitHub

### Step 2: Rebuild the Library Files

```bash
# Navigate to your project
cd ~/Desktop/rock-academy-popup

# Pull latest changes
git pull origin main

# Rebuild the library
BUILD_MODE=library npm run build
```

### Step 3: Upload New Files to GitHub

Use the same commands from **Part 3** above. For example, if using `/docs` folder:

```bash
# Copy new files
cp dist/rock-popup.umd.js docs/
cp dist/rock-popup.es.js docs/
cp dist/rock-popup.css docs/

# Commit and push
git add docs/
git commit -m "Update popup library - [describe your changes]"
git push origin main
```

### Step 4: Clear Your Cache

1. **WordPress cache:** Clear your site cache (if using a caching plugin)
2. **Browser cache:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. **GitHub Pages cache:** Wait 1-2 minutes for GitHub Pages to rebuild

### Step 5: Verify Updates

1. Open your WordPress site in an incognito window
2. Verify your changes appear
3. Test the updated functionality

---

## Troubleshooting 🔧

### Files Not Loading (404 Errors)

**Problem:** Browser console shows 404 errors for the JS/CSS files

**Solutions:**
1. **Wait 2-3 minutes** - GitHub Pages takes time to deploy initially
2. **Check your URLs** - Make sure they match your GitHub Pages URL exactly
3. **Verify files exist** - Go to your GitHub repo and confirm the files are there
4. **Check GitHub Pages status** - Go to Settings → Pages and verify it says "Your site is live"

### Popup Not Appearing

**Problem:** The page loads but no popup shows

**Solutions:**
1. **Check browser console** - Look for error messages (F12 → Console tab)
2. **Verify script loaded** - In console, type `RockPopup` and press Enter. You should see an object, not "undefined"
3. **Check trigger settings** - If using `triggerDelay` or `triggerScrollDepth`, wait or scroll to trigger
4. **Clear cache** - Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)

### "RockPopup is not defined" Error

**Problem:** Console shows "RockPopup is not defined"

**Solutions:**
1. **Check JS file URL** - Make sure `rock-popup.umd.js` path is correct
2. **Check file extension** - Use `.umd.js` (not `.es.js`) for browser usage
3. **Wait for load** - The script might be loading slowly. Check Network tab

### Styling Issues

**Problem:** Popup appears but looks broken or unstyled

**Solutions:**
1. **Check CSS file** - Verify `rock-popup.css` is loading (Network tab in DevTools)
2. **WordPress theme conflicts** - The popup now uses CSS scoping to prevent conflicts. If you still see issues:
   - Check if your theme has very high-specificity selectors
   - Look for `!important` rules in your theme that might override
   - The popup uses `z-index: 9999` and should appear above all content
3. **Verify CSS URL** - Make sure the CSS file path is correct
4. **Clear cache** - Hard refresh or clear WordPress cache
5. **Check browser console** - Look for CSS loading errors

### Form Not Submitting

**Problem:** Form fills out but won't submit

**Solutions:**
1. **Check Supabase config** - Verify `supabaseUrl` and `supabaseKey` are correct
2. **Check network tab** - Look for failed API requests
3. **Check edge function** - Verify the `submit-form` edge function exists in Supabase
4. **Check CORS** - Verify your edge function has CORS headers (it should by default)

### GA4 Not Tracking

**Problem:** Events not showing in Google Analytics

**Solutions:**
1. **Verify GA4 Client ID** - Make sure `gaClientId` is a valid format (`G-XXXXXXXXXX`)
2. **Wait 24-48 hours** - GA4 data can take time to process
3. **Check GA4 DebugView** - Enable debug mode to see real-time events
4. **Verify GA4 is installed** - Make sure Google Analytics is properly installed on your WordPress site

### WordPress Plugin Conflicts

**Problem:** Popup causes issues with other WordPress plugins

**Solutions:**
1. **Use footer, not header** - Always place the code in the footer section
2. **Check for JS errors** - Other plugins might have JavaScript errors
3. **Try different plugin** - If "Insert Headers and Footers" doesn't work, try "Code Snippets" plugin
4. **Load order** - Try adding `defer` to the script tag:
```html
<script defer src="https://...rock-popup.umd.js"></script>
```

### Changes Not Reflecting

**Problem:** Updated the files but changes don't appear on WordPress

**Solutions:**
1. **Clear all caches:**
   - WordPress cache plugin
   - Browser cache (Cmd/Ctrl+Shift+R)
   - GitHub Pages cache (wait 2 minutes)
2. **Verify files updated on GitHub** - Check the file content on GitHub
3. **Check file timestamp** - Make sure the new files actually uploaded
4. **Try incognito mode** - Open site in private/incognito window

### Need More Help?

1. **Check browser console** - Most issues show error messages here
2. **Check Network tab** - See which files are loading/failing
3. **Compare with examples** - Check the `examples/` folder in your repo
4. **Search the error** - Google the exact error message you're seeing

---

## Summary: Quick Reference 📋

### Your GitHub Pages URLs (fill in):
```
CSS:  https://______________.github.io/_______________/docs/rock-popup.css
UMD:  https://______________.github.io/_______________/docs/rock-popup.umd.js
ES:   https://______________.github.io/_______________/docs/rock-popup.es.js
```

### When You Make Updates:
```bash
cd ~/Desktop/rock-academy-popup
git pull origin main
BUILD_MODE=library npm run build
cp dist/*.{js,css} docs/
git add docs/
git commit -m "Update popup"
git push origin main
```

### Where Code Goes in WordPress:
**Settings → Insert Headers and Footers → Footer section**

---

## Next Steps 🎉

1. ✅ **Test thoroughly** - Try the popup on desktop and mobile
2. ✅ **Monitor submissions** - Check your Supabase database for incoming data
3. ✅ **Track analytics** - Monitor GA4 for conversion tracking
4. ✅ **Iterate and improve** - Update the popup based on performance

Congratulations! Your Rock Academy popup is now live and hosted on GitHub Pages! 🎸

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WordPress Insert Headers and Footers Plugin](https://wordpress.org/plugins/insert-headers-and-footers/)
- [Google Analytics 4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- Your project's `SELF_HOSTING_GUIDE.md` for more integration options
- Your project's `examples/` folder for code examples
