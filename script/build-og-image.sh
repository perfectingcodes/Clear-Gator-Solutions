#!/usr/bin/env bash
# Builds client/public/og-image.png — the social share image used in OG/Twitter meta tags.
# Embeds the brand logo as base64 inside an SVG, then rasterizes via svgexport (headless).
# Re-run whenever the logo or branding changes:
#   bash script/build-og-image.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOGO="$ROOT/attached_assets/clear_gator_1775663894887.png"
OUT_DIR="$ROOT/client/public"
SVG="$OUT_DIR/og-image.svg"
PNG="$OUT_DIR/og-image.png"

LOGO_B64="$(base64 -i "$LOGO" | tr -d '\n')"

cat > "$SVG" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c2128"/>
      <stop offset="100%" stop-color="#2a3038"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
    <linearGradient id="orangeBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ff9b3d"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <rect x="0" y="0" width="10" height="630" fill="url(#orangeBar)"/>
  <rect x="0" y="618" width="1200" height="12" fill="url(#orangeBar)"/>

  <image href="data:image/png;base64,${LOGO_B64}" x="70" y="115" width="400" height="400" preserveAspectRatio="xMidYMid meet"/>

  <g font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
    <text x="520" y="180" font-size="78" font-weight="900" fill="#ffffff" letter-spacing="-2">CLEAR GATOR</text>
    <text x="520" y="225" font-size="22" font-weight="700" fill="#ff9b3d" letter-spacing="3">CONSTRUCTION SERVICES</text>

    <line x1="520" y1="255" x2="700" y2="255" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>

    <text x="520" y="320" font-size="32" font-weight="700" fill="#ffffff" opacity="0.92">Demo · Hauling · Site Cleanup</text>
    <text x="520" y="362" font-size="32" font-weight="700" fill="#ffffff" opacity="0.92">Lot Clearing · Handyman &amp; Painting</text>

    <text x="520" y="450" font-size="56" font-weight="900" fill="#ff9b3d" letter-spacing="-1">Let's Gator Done.</text>

    <text x="520" y="530" font-size="22" font-weight="600" fill="#ffffff" opacity="0.7">Cape Coral · Naples · Southwest Florida</text>
    <text x="520" y="565" font-size="26" font-weight="700" fill="#ffffff">(239) 234-3061  ·  Licensed &amp; Insured</text>
  </g>
</svg>
SVG

echo "Wrote $SVG"

npx -y svgexport "$SVG" "$PNG" 1200:630
echo "Wrote $PNG"
