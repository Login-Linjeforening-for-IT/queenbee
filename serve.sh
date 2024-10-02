#!/bin/bash

# Loads .env file
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found"
    exit 1
fi

# Checks for BASE_URL
if [ -z "$BASE_URL" ]; then
    echo "Error: BASE_URL is not set."
    exit 1
fi

# Defines file to read
INPUT_FILE="./environment.prod.ts"

# Reads content to variable while running (temporarily stores the original file in memory)
ORIGINAL_CONTENT=$(cat "$INPUT_FILE")

# Edits file
sed -i '' "s|__BASE_URL_PLACEHOLDER__|$BASE_URL|g" "$INPUT_FILE"

# Starts the dev server and captures the process ID
ng serve &

NG_PID=$!

# Restores the original file after serving
restore_file() {
    echo "$ORIGINAL_CONTENT" > "$INPUT_FILE"
    # echo "Original file restored: $INPUT_FILE"
}

# Traps the script / termination signals to restore the file
trap restore_file EXIT

# Waits for the Angular server to stop
wait $NG_PID
