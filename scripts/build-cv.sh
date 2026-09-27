#!/usr/bin/env bash
# Prints cv.html (which reads index.html + assets/data/research-data.js) to cv.pdf.
# Runs in the GitHub Pages workflow on every push; run it locally to preview:
#   scripts/build-cv.sh            -> writes ./cv.pdf
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="${1:-cv.pdf}"
PORT="${CV_PORT:-8765}"

CHROME="${CHROME:-}"
if [ -z "$CHROME" ]; then
  for c in google-chrome google-chrome-stable chromium chromium-browser \
           "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
    if command -v "$c" >/dev/null 2>&1 || [ -x "$c" ]; then CHROME="$c"; break; fi
  done
fi
[ -n "$CHROME" ] || { echo "build-cv: Chrome/Chromium not found (set CHROME=...)" >&2; exit 1; }

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 50); do curl -fs "http://127.0.0.1:$PORT/cv.html" >/dev/null && break; sleep 0.1; done

URL="http://127.0.0.1:$PORT/cv.html"
FLAGS=(--headless=new --disable-gpu --no-sandbox --hide-scrollbars --run-all-compositor-stages-before-draw --virtual-time-budget=20000)

# Make sure the page actually rendered from the homepage before printing.
if ! "$CHROME" "${FLAGS[@]}" --dump-dom "$URL" 2>/dev/null | grep -q 'data-cv-ready="1"'; then
  echo "build-cv: cv.html did not finish rendering" >&2; exit 1
fi

"$CHROME" "${FLAGS[@]}" --no-pdf-header-footer --print-to-pdf="$OUT" "$URL" 2>/dev/null
[ -s "$OUT" ] || { echo "build-cv: $OUT was not written" >&2; exit 1; }
echo "build-cv: wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
