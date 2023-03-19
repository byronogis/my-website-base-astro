#!/bin/bash

# Get the current date in ISO 8601 format
DATE=$(date +"%Y-%m-%d %H:%M")

# Get the names of the Markdown files being committed
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')

# Loop through each Markdown file and update its Front Matter
for FILE in $FILES; do
  # Check if the file contains Front Matter
  if grep -q '^---' "$FILE"; then
    # Update the "update" field in the Front Matter if it exists
    if grep -q 'update:' "$FILE"; then
      sed -i "s/\(update:\s*\).*/\1$DATE/" "$FILE"
    else
      # Insert a new "update" field in the Front Matter
      sed -i "s/\(---\)/\1\nupdate: $DATE/" "$FILE"
    fi
  else
    # Insert a new Front Matter with the "update" field
    sed -i "1i---\nupdate: $DATE\n---\n" "$FILE"
  fi
done

git add $FILES

exit 0
