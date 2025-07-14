#!/usr/bin/env bash
set -e

WIKIPEDIA_URL=$(curl -s -I "https://en.wikipedia.org/wiki/Special:Random" | grep -i "^location:" | cut -d' ' -f2 | tr -d '\r')

if [ -z "$WIKIPEDIA_URL" ]; then
  echo "Error: Failed to get random Wikipedia URL"
  exit 1
fi

TODO_TEXT="Read $WIKIPEDIA_URL"

if [ -z "$URL" ]; then
  echo "Error: URL environment variable not set"
  exit 1
fi

echo "Adding todo: $TODO_TEXT"
curl -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "{\"data\":\"$TODO_TEXT\"}" \
  -f

if [ $? -eq 0 ]; then
  echo "Todo successfully added!"
else
  echo "Failed to add todo"
  exit 1
fi
