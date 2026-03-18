#!/bin/bash
# Navigate to the directory where the repo is cloned
# Adjust this path to match your Hostinger setup
cd /home/u123456789/domains/yourdomain.com/public_html

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

# Copy built files to the root (public_html)
if [ -d "dist" ]; then
    cp -r dist/* .
    cp -r dist/.* . 2>/dev/null || true
    rm -rf dist
    echo "Deployment successful!"
else
    echo "Build failed: dist folder not found"
    exit 1
fi