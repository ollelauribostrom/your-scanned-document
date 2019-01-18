#!/bin/bash

# Connect to the droplet
ssh travis@$DROPLET_IP -o StrictHostKeyChecking=no
echo "[✓] Connected to droplet"

# Stop any running instance
if [ -d /home/travis/your-scanned-document ]
  then 
    cd /home/travis/your-scanned-document
    yarn forever stopall
    cd /home/travis/
    rm -rf /home/travis/your-scanned-document
    echo "[✓] Stopped running instance"
fi

# Clone the source
git clone https://github.com/ollelauribostrom/your-scanned-document.git /home/travis/your-scanned-document
cd /home/travis/your-scanned-document
echo "[✓] Cloned ollelauribostrom/your-scanned-document"

# Install dependencies
yarn install --production
echo "[✓] Installed dependencies"

# Start
yarn start
echo "[✓] Started the application"
