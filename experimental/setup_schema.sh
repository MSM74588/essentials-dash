#!/bin/bash

# Replace with your PocketBase API key
API_KEY="your_pocketbase_api_key"

# Replace with the path to your schema file
SCHEMA_FILE_PATH="path/to/your/schema.txt"

# PocketBase API endpoint for importing schema
API_ENDPOINT="https://api.pocketbase.io/v1/schemas/import"

# Read the schema from the file
SCHEMA=$(cat "$SCHEMA_FILE_PATH")

# Prepare the payload for the API request
PAYLOAD="{\"schema\": \"$SCHEMA\"}"

# Make the API request to import the schema
RESPONSE=$(curl -s -X POST "$API_ENDPOINT" \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $API_KEY" \
 -d "$PAYLOAD")

# Check if the request was successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "Schema imported successfully."
else
    echo "Failed to import schema. Response: $RESPONSE"
fi