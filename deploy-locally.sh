#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Local Build and Deployment...${NC}"

# 1. Install dependencies (if needed)
echo -e "${YELLOW}Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# 2. Build the project
echo -e "${YELLOW}Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Aborting deployment.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# 3. Check for lftp
if ! command -v lftp &> /dev/null; then
    echo -e "${RED}❌ Error: 'lftp' is not installed. Please install it to upload files.${NC}"
    echo "   macOS: brew install lftp"
    echo "   Ubuntu/Debian: sudo apt-get install lftp"
    echo "   Windows: Download from https://lftp.yar.ru/ or use FileZilla manually."
    exit 1
fi

# 4. Upload to Hostinger
echo -e "${YELLOW}📤 Uploading to Hostinger...${NC}"

# You must set these environment variables before running the script
# export HOSTINGER_FTP_HOST="ftp.yourdomain.com"
# export HOSTINGER_FTP_USER="your_username"
# export HOSTINGER_FTP_PASS="your_password"

if [ -z "$HOSTINGER_FTP_HOST" ] || [ -z "$HOSTINGER_FTP_USER" ] || [ -z "$HOSTINGER_FTP_PASS" ]; then
    echo -e "${RED}❌ Error: FTP credentials not found.${NC}"
    echo "Please set the following environment variables:"
    echo "  export HOSTINGER_FTP_HOST=\"your_ftp_host\""
    echo "  export HOSTINGER_FTP_USER=\"your_ftp_user\""
    echo "  export HOSTINGER_FTP_PASS=\"your_ftp_pass\""
    exit 1
fi

# Create lftp script
cat <<EOF > /tmp/lftp_script
set ssl:verify-certificate no
open ftp://$HOSTINGER_FTP_USER:$HOSTINGER_FTP_PASS@$HOSTINGER_FTP_HOST
cd /public_html
mdelete -r *
mirror -R --reverse --only-newer dist/ .
bye
EOF

lftp -f /tmp/lftp_script

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful! Your site is live.${NC}"
    rm /tmp/lftp_script
else
    echo -e "${RED}❌ Deployment failed. Check your FTP credentials and connection.${NC}"
    rm /tmp/lftp_script
    exit 1
fi