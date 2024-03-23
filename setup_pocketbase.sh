#!/bin/bash

# Define the GitHub repository URL
GITHUB_REPO="https://api.github.com/repos/pocketbase/pocketbase/releases/latest"

# Define the directory where the package will be extracted
EXTRACTION_DIR="backend"

# Fetch the latest release information
LATEST_RELEASE=$(curl -s $GITHUB_REPO)

# Extract the assets from the release information
ASSETS=$(echo $LATEST_RELEASE | grep -o 'https://github.com/pocketbase/pocketbase/releases/download/[^"]*')

# Loop through the assets to find the one containing 'linux_amd64.zip' in its name
DOWNLOAD_URL=""
for asset in $ASSETS; do
    if [[ $asset == *"linux_amd64.zip"* ]]; then
        DOWNLOAD_URL=$asset
        break
    fi
done

# Check if the download URL was found
if [ -z "$DOWNLOAD_URL" ]; then
    echo "No asset containing 'linux_amd64.zip' found in the latest release."
    exit 1
fi

# Extract the file name from the URL
FILE_NAME=$(basename $DOWNLOAD_URL)

# Download the asset
echo "Downloading $FILE_NAME..."
curl -L $DOWNLOAD_URL -o $FILE_NAME

# Check if the file was downloaded successfully
if [ $? -eq 0 ]; then
    echo "Download successful."
else
    echo "Download failed."
    exit 1
fi

# Create the extraction directory if it doesn't exist
mkdir -p $EXTRACTION_DIR

# Extract the downloaded file
if [[ $FILE_NAME == *.zip ]]; then
    echo "Extracting zip file..."
    unzip $FILE_NAME -d $EXTRACTION_DIR
else
    echo "Unsupported file format."
    exit 1
fi

# Remove the downloaded file
rm $FILE_NAME

echo "PocketBase package extracted to $EXTRACTION_DIR."
