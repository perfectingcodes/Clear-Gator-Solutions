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
      <stop offset="0%" stop-color="#0e1a18"/>
      <stop offset="40%" stop-color="#11251f"/>
      <stop offset="100%" stop-color="#0a1612"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.2" r="0.7">
      <stop offset="0%" stop-color="#ff9b3d" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#ff9b3d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowGreen" cx="0.1" cy="0.9" r="0.6">
      <stop offset="0%" stop-color="#3aaa6a" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#3aaa6a" stop-opacity="0"/>
    </radialGradient>
    <pattern id="scales" width="48" height="42" patternUnits="userSpaceOnUse">
      <path d="M24,4 C36,4 44,14 44,22 C44,30 36,40 24,40 C12,40 4,30 4,22 C4,14 12,4 24,4 Z"
            fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="0.8"/>
    </pattern>
    <linearGradient id="orangeBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ff9b3d"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#scales)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glowGreen)"/>

  <!-- cypress canopy silhouette across the top -->
  <path d="M0,90 C90,60 160,85 240,55 C320,28 400,75 480,50 C560,28 640,72 720,52 C800,32 880,72 960,55 C1040,40 1120,72 1200,58 L1200,0 L0,0 Z"
        fill="#0a1612" opacity="0.7"/>
  <path d="M0,110 C90,92 170,108 260,90 C340,72 420,108 510,90 C600,72 680,108 770,92 C860,76 940,108 1030,92 C1110,78 1170,108 1200,98 L1200,0 L0,0 Z"
        fill="#0a1612"/>

  <!-- moss tendrils -->
  <g stroke="#3aaa6a" stroke-width="1" fill="none" opacity="0.35">
    <path d="M180,100 q-3,28 -1,52"/>
    <path d="M380,98 q4,32 -2,58"/>
    <path d="M620,96 q-4,28 1,54"/>
    <path d="M860,98 q3,32 -2,52"/>
    <path d="M1080,100 q-3,28 2,54"/>
  </g>

  <!-- accent bars -->
  <rect x="0" y="0" width="10" height="630" fill="url(#orangeBar)"/>
  <rect x="0" y="618" width="1200" height="12" fill="url(#orangeBar)"/>

  <!-- brand logo -->
  <image href="data:image/png;base64,${LOGO_B64}" x="70" y="125" width="380" height="380" preserveAspectRatio="xMidYMid meet"/>

  <g font-family="Outfit, Inter, 'Helvetica Neue', Arial, sans-serif">
    <text x="500" y="195" font-size="80" font-weight="900" fill="#ffffff" letter-spacing="-3">CLEAR GATOR</text>
    <text x="500" y="232" font-size="20" font-weight="700" fill="#ff9b3d" letter-spacing="6">CONSTRUCTION SERVICES</text>

    <line x1="500" y1="262" x2="690" y2="262" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>

    <text x="500" y="320" font-size="29" font-weight="600" fill="#ffffff" opacity="0.88">Demo · Hauling · Site Cleanup</text>
    <text x="500" y="358" font-size="29" font-weight="600" fill="#ffffff" opacity="0.88">Lot Clearing · Handyman &amp; Painting</text>

    <text x="500" y="448" font-size="58" font-weight="900" fill="#ff9b3d" letter-spacing="-1">Let's Gator Done.</text>

    <text x="500" y="520" font-size="20" font-weight="500" fill="#ffffff" opacity="0.6" letter-spacing="2">CAPE CORAL · NAPLES · SOUTHWEST FLORIDA</text>
    <text x="500" y="568" font-size="28" font-weight="800" fill="#ffffff">(239) 234-3061</text>
    <text x="828" y="568" font-size="20" font-weight="600" fill="#ffffff" opacity="0.55">·  Licensed &amp; Insured</text>
  </g>
</svg>
SVG

echo "Wrote $SVG"

npx -y svgexport "$SVG" "$PNG" 1200:630
echo "Wrote $PNG"
