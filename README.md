# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7c2c5d10-ad70-4ef8-88b9-90b4dc9392a5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7c2c5d10-ad70-4ef8-88b9-90b4dc9392a5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy on Lovable (Easiest)

Simply open [Lovable](https://lovable.dev/projects/7c2c5d10-ad70-4ef8-88b9-90b4dc9392a5) and click on Share -> Publish.

You can also connect a custom domain by navigating to Project > Settings > Domains and clicking Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

### Option 2: Self-Host the Popup (Recommended for Your Domain)

Build and host the popup on your own infrastructure to avoid iframe embedding issues:

**Quick Start:**
```bash
# Build the library bundle
./build-library.sh   # On macOS/Linux
# or
build-library.bat    # On Windows

# This creates 3 files in dist/:
# - rock-popup.umd.js
# - rock-popup.es.js
# - rock-popup.css
```

**Then:**
1. Upload the 3 files to your web server (e.g., `/assets/` folder or CDN)
2. Add integration code to your website (see examples/ folder)
3. Choose integration method:
   - **GTM** (recommended): `examples/gtm-integration.html`
   - **Direct HTML**: `examples/direct-html-integration.html`
   - **Dynamic Loading**: `examples/dynamic-loading.html`

**Full Documentation:**
- See `SELF_HOSTING_GUIDE.md` for complete setup instructions
- See `examples/README.md` for integration examples
- All Supabase edge functions and secrets continue to work!

**Benefits:**
- ✅ No iframe embedding (avoids malware warnings)
- ✅ Same domain = no cross-origin issues
- ✅ Full functionality maintained
- ✅ Edge functions and secrets work unchanged
