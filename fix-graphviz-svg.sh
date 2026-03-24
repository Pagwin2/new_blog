# the inline fill/stroke/font-family attributes from the elements it targets.
#
# Requires: xmlstarlet
#
# Usage:
#   ./svg_theme.sh input.svg              # writes to stdout
#   ./svg_theme.sh input.svg output.svg   # writes to output.svg
 
STYLE_TEXT='
    @media(prefers-color-scheme: dark){
    :root {
        --color: white;
    }
    }
    @media(prefers-color-scheme: light){
    :root {
        --color: black;
    }
    }
    ellipse, path {
        fill: none;
        stroke: var(--color);
    }
    polygon {
        fill: var(--color);
        stroke: var(--color);
    }
    text {
        fill: var(--color);
        font-family: sans-serif;
    }
    '
 
xmlstarlet ed -O \
  -N s="http://www.w3.org/2000/svg" \
  --insert "/s:svg/*[1]" --type elem --name style \
  --update "/s:svg/style" --value "$STYLE_TEXT" \
  --delete "(/s:svg//s:ellipse|/s:svg//s:path|/s:svg//s:polygon)/@fill" \
  --delete "(/s:svg//s:ellipse|/s:svg//s:path|/s:svg//s:polygon)/@stroke" \
  --delete "/s:svg//s:text/@fill" \
  --delete "/s:svg//s:text/@stroke" \
  --delete "/s:svg//s:text/@font-family" \
  --delete "(/s:svg//s:polygon)[1]"\
  "${1:--}" > "${2:-/dev/stdout}"
