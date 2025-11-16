# Rock Academy Popup - Mac Build Guide

This guide will walk you through building the popup library files on your Mac. No advanced technical knowledge required!

---

## What You'll Need

Before starting, make sure you have:
- ✅ Your project connected to GitHub (you already have this!)
- ✅ About 15 minutes of time
- ✅ Your Mac computer

---

## Step 1: Install Node.js (If Not Already Installed)

Node.js is the tool that builds your files.

### Check if you already have it:

1. Open **Terminal** (press `Cmd + Space`, type "Terminal", press Enter)
2. Type this and press Enter:
```bash
node -v
```

**What happens:**
- If you see a version number like `v18.0.0` or higher → **You're good! Skip to Step 2**
- If you see `command not found` → Continue below to install it

### Install Node.js:

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version** (the green button)
3. Open the downloaded file and follow the installer
4. When done, close and reopen Terminal
5. Type `node -v` again to verify it worked

---

## Step 2: Download Your Project Code

Now you'll download your project from GitHub to your Mac.

### Find your GitHub repository URL:

1. In Lovable, click the **GitHub button** (top-right)
2. Click **"View on GitHub"**
3. On GitHub, click the green **"Code"** button
4. Copy the URL (should look like: `https://github.com/YourName/rock-academy-popup.git`)

### Download (clone) the project:

1. Open **Terminal**
2. Decide where to save the project. Desktop is easiest:
```bash
cd ~/Desktop
```

3. Download your project (replace `YOUR_GITHUB_URL` with the URL you copied):
```bash
git clone YOUR_GITHUB_URL
```

**Example:**
```bash
git clone https://github.com/JohnDoe/rock-academy-popup.git
```

4. You'll see messages about downloading files. When it's done, you'll see a new folder on your Desktop!

---

## Step 3: Open the Project Folder

Now navigate into the project folder:

```bash
cd rock-academy-popup
```

(Replace `rock-academy-popup` with whatever your folder is named if different)

**How to check you're in the right place:**
Type `ls` and press Enter. You should see files like:
- `package.json`
- `vite.config.ts`
- `src/`
- `build-library.sh`

---

## Step 4: Install Project Dependencies

This downloads all the code libraries your project needs:

```bash
npm install
```

**What you'll see:**
- Lots of text scrolling by
- Progress bars
- Takes 1-3 minutes
- When done, you'll see your command prompt again

---

## Step 5: Build the Library Files! 🎉

This is the magic step that creates your 3 files:

### Option A: Using the Build Script (Easiest)

```bash
chmod +x build-library.sh
./build-library.sh
```

### Option B: Manual Command

```bash
BUILD_MODE=library npm run build
```

**What you'll see:**
- "Building library bundle..." message
- Progress messages
- "Build Complete!" with a list of your files

---

## Step 6: Find Your Built Files

Your 3 files are now ready in the `dist` folder!

**To see them:**

```bash
ls -lh dist/
```

You should see:
- ✅ `rock-popup.umd.js` (around 500KB-2MB)
- ✅ `rock-popup.es.js` (similar size)
- ✅ `rock-popup.css` (around 50-200KB)

**To open the folder in Finder:**

```bash
open dist/
```

This opens a Finder window showing your 3 files!

---

## Step 7: Upload to Your Website

Now that you have the 3 files, you need to upload them to your web hosting:

### Where to upload:
- Your website's public folder (like `/assets/` or `/js/`)
- Or a CDN service
- Or a subdomain

### How to upload:
- Use your web hosting's file manager (cPanel, Plesk, etc.)
- Or use FTP software like FileZilla
- Or use your hosting provider's upload tool

**Example final URLs after uploading:**
```
https://www.therockacademy.org/assets/rock-popup.umd.js
https://www.therockacademy.org/assets/rock-popup.es.js
https://www.therockacademy.org/assets/rock-popup.css
```

---

## Step 8: Integrate on Your Site

Once uploaded, add the popup to your website using one of the integration methods in:
- `examples/gtm-integration.html` (if using Google Tag Manager)
- `examples/direct-html-integration.html` (if editing HTML directly)

See `SELF_HOSTING_GUIDE.md` for full integration instructions!

---

## Troubleshooting

### "command not found: node"
→ Node.js isn't installed. Go back to Step 1.

### "command not found: git"
→ Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### "permission denied"
→ Make the script executable:
```bash
chmod +x build-library.sh
```

### "Build failed"
→ Delete `node_modules` and try again:
```bash
rm -rf node_modules
npm install
BUILD_MODE=library npm run build
```

### Need to rebuild after making changes?
Just run the build command again:
```bash
BUILD_MODE=library npm run build
```

---

## Video Walkthrough (Optional)

If you get stuck, I recommend searching YouTube for:
- "How to use Terminal on Mac for beginners"
- "Git clone tutorial Mac"
- "npm install tutorial"

---

## Questions?

If you get stuck at any step:
1. Take a screenshot of the error message
2. Note which step you're on
3. Ask for help with the specific error

---

## Summary Cheat Sheet

Once you have everything set up, future builds are just:

```bash
cd ~/Desktop/rock-academy-popup
git pull                           # Get latest changes
BUILD_MODE=library npm run build   # Build files
open dist/                         # See your files
```

Then upload the 3 files from `dist/` to your website!
