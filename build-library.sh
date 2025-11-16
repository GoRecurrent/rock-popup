#!/bin/bash

###############################################################################
# Rock Academy Popup - Library Build Script
#
# This script builds the self-hosted library bundle of the popup.
# Output files will be in the dist/ folder.
###############################################################################

set -e  # Exit on error

echo "========================================="
echo "Rock Academy Popup - Library Builder"
echo "========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18+ required"
    echo "   Current version: $(node -v)"
    echo "   Please upgrade Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Clean previous build
if [ -d "dist" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf dist
    echo ""
fi

# Build the library
echo "🔨 Building library bundle..."
echo "   Build mode: library"
echo ""

BUILD_MODE=library npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo ""
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

# List output files with sizes
echo ""
echo "========================================="
echo "✅ Build Complete!"
echo "========================================="
echo ""
echo "📦 Output files in dist/ folder:"
echo ""

if [ -f "dist/rock-popup.umd.js" ]; then
    SIZE=$(du -h "dist/rock-popup.umd.js" | cut -f1)
    echo "  ✓ rock-popup.umd.js ($SIZE)"
fi

if [ -f "dist/rock-popup.es.js" ]; then
    SIZE=$(du -h "dist/rock-popup.es.js" | cut -f1)
    echo "  ✓ rock-popup.es.js ($SIZE)"
fi

if [ -f "dist/rock-popup.css" ]; then
    SIZE=$(du -h "dist/rock-popup.css" | cut -f1)
    echo "  ✓ rock-popup.css ($SIZE)"
fi

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Upload these 3 files to your web server:"
echo "   - dist/rock-popup.umd.js"
echo "   - dist/rock-popup.es.js (optional, for ES modules)"
echo "   - dist/rock-popup.css"
echo ""
echo "2. See SELF_HOSTING_GUIDE.md for integration instructions"
echo ""
echo "3. See examples/ folder for integration code examples:"
echo "   - examples/gtm-integration.html (Google Tag Manager)"
echo "   - examples/direct-html-integration.html (Direct embed)"
echo "   - examples/dynamic-loading.html (Advanced loading)"
echo ""
echo "========================================="
