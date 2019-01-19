#!/bin/bash

# Make sure we are at the specified root directory
cd $ROOT

# Stop any running instance
if [ -d ./your-scanned-document ]
  then 
    cd your-scanned-document
    yarn forever stopall > /dev/null
    cd ..
    rm -rf ./your-scanned-document
    echo "@remote: [✓] Stopped running instance"
fi

# Clone the source
git clone https://github.com/ollelauribostrom/your-scanned-document.git > /dev/null
cd your-scanned-document
echo "@remote: [✓] Cloned ollelauribostrom/your-scanned-document"

# Add env folder
mv ../env ./env
echo "@remote: [✓] Added env folder"

# Install dependencies
yarn install --production > /dev/null
echo "@remote: [✓] Installed dependencies"

# Start
yarn start > /dev/null
echo "@remote: [✓] Started the application"