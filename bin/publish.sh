#!/bin/bash

# Stop any running instance
if [ -d /home/travis/your-scanned-document ]
  then 
    cd /home/travis/your-scanned-document
    yarn forever stopall
    cd /home/travis/
    rm -rf /home/travis/your-scanned-document
    echo "[✓] Stopped running instance \n"
fi

# Clone the source
git clone https://github.com/ollelauribostrom/your-scanned-document.git /home/travis/your-scanned-document
cd /home/travis/your-scanned-document
echo "[✓] Cloned ollelauribostrom/your-scanned-document \n"

# Install dependencies
yarn install --production
echo "[✓] Installed dependencies \n"

# Start
yarn start
echo "[✓] Started the application \n"
