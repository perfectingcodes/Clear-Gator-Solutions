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
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16181c"/>
      <stop offset="100%" stop-color="#0d0f12"/>
    </linearGradient>
    <radialGradient id="warm" cx="0.85" cy="0.05" r="0.7">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.12"/>
      <stop offset="60%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cgBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff9b3d"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  <!-- Base layers -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#warm)"/>

  <!-- Thin orange accent rule on the left edge -->
  <rect x="0" y="0" width="4" height="630" fill="#f97316"/>

  <!-- Top + bottom hairline rules -->
  <line x1="80" y1="80" x2="1120" y2="80" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
  <line x1="80" y1="550" x2="1120" y2="550" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>

  <!-- Top eyebrow row -->
  <g font-family="'Geist Mono', ui-monospace, monospace">
    <text x="80" y="60" font-size="14" font-weight="500" fill="#ff9b3d" letter-spacing="3">CLEAR GATOR</text>
    <line x1="220" y1="55" x2="280" y2="55" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
    <text x="294" y="60" font-size="14" font-weight="500" fill="#ffffff" opacity="0.5" letter-spacing="3">CONSTRUCTION SERVICES</text>
    <text x="1120" y="60" font-size="14" font-weight="500" fill="#ffffff" opacity="0.45" letter-spacing="3" text-anchor="end">SOUTHWEST FLORIDA</text>
  </g>

  <!-- CG monogram tile, top-right -->
  <g transform="translate(1040, 100)">
    <rect x="0" y="0" width="56" height="56" rx="12" fill="url(#cgBg)"/>
    <text x="28" y="40" font-family="Geist, Inter, sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="-1.4" text-anchor="middle">CG</text>
  </g>

  <!-- Brand emblem (left half, anchored center) -->
  <image href="data:image/png;base64,${LOGO_B64}" x="80" y="200" width="280" height="280" preserveAspectRatio="xMidYMid meet"/>

  <!-- Headline + supporting copy -->
  <g font-family="Geist, Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif">
    <text x="420" y="240" font-size="66" font-weight="600" fill="#ffffff" letter-spacing="-2.8">We clear the way.</text>
    <text x="420" y="306" font-size="66" font-weight="600" fill="#ffffff" opacity="0.4" letter-spacing="-2.8">You build what's next.</text>

    <text x="420" y="375" font-size="20" font-weight="400" fill="#ffffff" opacity="0.7">Interior &amp; Outdoor Demolition · Hauling · Site Cleanup</text>
    <text x="420" y="405" font-size="20" font-weight="400" fill="#ffffff" opacity="0.7">Lot Clearing · Property Maintenance</text>

    <!-- Hairline divider before contact -->
    <line x1="420" y1="450" x2="1120" y2="450" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>

    <text x="420" y="500" font-size="34" font-weight="600" fill="#ffffff" letter-spacing="-1">(239) 234-3061</text>
    <text x="420" y="528" font-size="13" font-weight="500" fill="#ffffff" opacity="0.45" letter-spacing="3" font-family="'Geist Mono', monospace">CAPE CORAL · NAPLES · LICENSED &amp; INSURED</text>
  </g>

  <!-- Bottom signature row -->
  <g font-family="'Geist Mono', ui-monospace, monospace">
    <text x="80" y="595" font-size="12" font-weight="500" fill="#ffffff" opacity="0.4" letter-spacing="3">EST. SW FL · LOCALLY OWNED</text>
    <text x="1120" y="595" font-size="13" font-weight="600" fill="#ff9b3d" letter-spacing="4" text-anchor="end">LET'S GATOR DONE.</text>
  </g>
</svg>
SVG

echo "Wrote $SVG"

npx -y svgexport "$SVG" "$PNG" 1200:630
echo "Wrote $PNG"
