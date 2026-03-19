# deploy.ps1
# Windows Deployment Script for New Dawn Tribe

# Colors
$Red = "[Red]"
$Green = "[Green]"
$Yellow = "[Yellow]"
$Reset = ""

function Write-Log {
    param($Message, $Color)
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] $Message" -ForegroundColor $Color
}

# 1. Check Environment Variables
Write-Log "Checking FTP credentials..." $Yellow

$ftpHost = $env:HOSTINGER_FTP_HOST
$ftpUser = $env:HOSTINGER_FTP_USER
$ftpPass = $env:HOSTINGER_FTP_PASS

if (-not $ftpHost -or -not $ftpUser -or -not $ftpPass) {
    Write-Log "ERROR: Missing FTP credentials!" $Red
    Write-Host "Please set the following environment variables in PowerShell:"
    Write-Host "`$env:HOSTINGER_FTP_HOST = 'ftp.yourdomain.com'"
    Write-Host "`$env:HOSTINGER_FTP_USER = 'your_username'"
    Write-Host "`$env:HOSTINGER_FTP_PASS = 'your_password'"
    Write-Host "Or set them permanently in System Environment Variables."
    exit 1
}

# 2. Build the Project
Write-Log "Building project..." $Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Log "ERROR: Build failed! Aborting deployment." $Red
    exit 1
}
Write-Log "Build successful!" $Green

# 3. Upload to Hostinger using Node.js script
Write-Log "Uploading to Hostinger..." $Yellow

# Create a temporary Node.js upload script
$uploadScript = @"
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function upload() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        await client.access({
            host: process.env.HOSTINGER_FTP_HOST,
            user: process.env.HOSTINGER_FTP_USER,
            password: process.env.HOSTINGER_FTP_PASS,
            secure: true, // Use FTPS (secure)
            secureOptions: { rejectUnauthorized: false } // Ignore self-signed certs if any
        });

        console.log("Connected to FTP server.");

        // Navigate to public_html
        await client.cd("/public_html");
        
        // Delete existing files (optional but recommended for clean deploy)
        // Note: This might take a moment if there are many files
        console.log("Cleaning up old files...");
        try {
            const contents = await client.list();
            for (const item of contents) {
                if (item.name !== "." && item.name !== "..") {
                    if (item.isDirectory) {
                        await client.removeDir(item.name);
                    } else {
                        await client.remove(item.name);
                    }
                }
            }
            console.log("Old files removed.");
        } catch (err) {
            console.log("Note: Could not list/delete files (might be empty or permission issue):", err.message);
        }

        // Upload dist folder contents
        console.log("Uploading new files...");
        await client.uploadFromDir("./dist", ".");
        
        console.log("Upload complete!");
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    } finally {
        client.close();
    }
}

upload();
"@

# Save the script to a temp file
$tempFile = "temp-upload.js"
Set-Content -Path $tempFile -Value $uploadScript

# Run the upload script
node $tempFile
$uploadResult = $LASTEXITCODE

# Cleanup
Remove-Item $tempFile -ErrorAction SilentlyContinue

if ($uploadResult -eq 0) {
    Write-Log "Deployment successful! Your site is live." $Green
} else {
    Write-Log "Deployment failed. Check the error above." $Red
    exit 1
}