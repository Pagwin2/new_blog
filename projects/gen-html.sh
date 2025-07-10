#!/bin/bash

# Exit if any command fails
set -eu

# Output file
OUTPUT="combined.html"

# Clear previous output if exists
> "$OUTPUT"

# Loop through all Markdown files in the current directory
for file in *.md; do
    if [[ -f "$file" ]]; then
        echo "Processing $file..."
        
        # Convert Markdown to HTML using pandoc
        html_content=$(pandoc "$file")

        # Wrap the content in a <section> tag and append to output
        {
            echo "<section>"
            echo "$html_content"
            echo "</section>"
        } >> "$OUTPUT"
    fi
done

echo "Done. Output saved to $OUTPUT"

