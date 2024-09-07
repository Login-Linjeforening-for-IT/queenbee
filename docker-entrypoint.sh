#!/bin/sh

set -e

# Load local environment variables if .env file exists
if [ -f "/usr/src/app/.env" ]; then
  echo "Loading local environment variables from .env file"
  export $(grep -v '^#' /usr/src/app/.env | xargs)
fi

echo "Setting env vars"

# Directory containing the JS files
TARGET_DIR="/usr/src/app/dist"

# Check if the target directory exists
if [ -d "$TARGET_DIR" ]; then
    # Use find to list all files in the directory, then replace the placeholder in each file
    find "$TARGET_DIR" -type f -exec sed -i "s|__BASE_URL_PLACEHOLDER__|${BASE_URL}|g" {} +
else
    echo "Target directory $TARGET_DIR does not exist."
fi

npm run prod
