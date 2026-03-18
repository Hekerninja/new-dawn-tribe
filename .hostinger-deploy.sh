#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Deployment..."

# 1. Pull the latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Build the project
echo "🔨 Building project..."
npm run build

# 4. Move files from dist to the current directory (public_html)
echo "📂 Moving built files to public root..."
if [ -d "dist" ]; then
    # Copy all files from dist to current directory
    cp -r dist/* .
    # Copy hidden files (like .htaccess if needed)
    cp -r dist/.* . 2>/dev/null || true
    # Remove the dist folder to keep things clean
    rm -rf dist
    echo "✅ Files moved successfully!"
else
    echo "❌ Error: dist folder not found. Build might have failed."
    exit 1
fi

echo "🎉 Deployment Complete!"