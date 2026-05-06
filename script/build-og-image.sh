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
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#warm)"/>

  <!-- thin orange rule on the left -->
  <rect x="0" y="0" width="3" height="630" fill="#f97316"/>

  <!-- brand logo -->
  <image href="data:image/png;base64,${LOGO_B64}" x="80" y="180" width="270" height="270" preserveAspectRatio="xMidYMid meet"/>

  <g font-family="Outfit, Inter, 'Helvetica Neue', Arial, sans-serif">
    <!-- editorial number eyebrow -->
    <text x="420" y="188" font-size="16" font-weight="600" fill="#ff9b3d" letter-spacing="6">01 — CLEAR GATOR</text>
    <line x1="600" y1="183" x2="660" y2="183" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
    <text x="676" y="188" font-size="16" font-weight="600" fill="#ffffff" opacity="0.45" letter-spacing="5">SOUTHWEST FLORIDA</text>

    <!-- headline -->
    <text x="420" y="260" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="-2">We clear the way.</text>
    <text x="420" y="320" font-size="64" font-weight="900" fill="#ffffff" opacity="0.45" letter-spacing="-2">You build what's next.</text>

    <!-- supporting copy -->
    <text x="420" y="385" font-size="22" font-weight="500" fill="#ffffff" opacity="0.65">Demolition · Hauling · Site Cleanup</text>
    <text x="420" y="416" font-size="22" font-weight="500" fill="#ffffff" opacity="0.65">Lot Clearing · Handyman &amp; Painting</text>

    <!-- footer rule + signoff -->
    <line x1="420" y1="478" x2="1080" y2="478" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>

    <text x="420" y="528" font-size="32" font-weight="800" fill="#ffffff" letter-spacing="-0.5">(239) 234-3061</text>
    <text x="420" y="562" font-size="14" font-weight="500" fill="#ffffff" opacity="0.45" letter-spacing="3">CAPE CORAL · NAPLES · LICENSED &amp; INSURED</text>

    <text x="1080" y="528" font-size="14" font-weight="700" fill="#ff9b3d" letter-spacing="6" text-anchor="end">LET'S GATOR DONE.</text>
  </g>
</svg>
SVG

echo "Wrote $SVG"

npx -y svgexport "$SVG" "$PNG" 1200:630
echo "Wrote $PNG"
