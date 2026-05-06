import { SVGProps } from "react";

type DecorProps = SVGProps<SVGSVGElement>;

/**
 * Cypress-canopy silhouette band — used at the top of dark hero sections.
 * Draws a row of cypress trees with hanging Spanish moss.
 */
export function CypressCanopy({ className, ...props }: DecorProps) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="cypress-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(150 30% 6%)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(150 30% 6%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* far layer */}
      <path
        d="M0,160 C80,120 140,140 220,110 C300,82 360,128 440,100 C520,74 600,118 680,98 C760,80 820,124 900,102 C980,82 1040,124 1120,104 C1200,86 1280,124 1360,108 L1440,120 L1440,220 L0,220 Z"
        fill="hsl(150 35% 11%)"
        opacity="0.7"
      />
      {/* near layer */}
      <path
        d="M0,180 C90,150 160,170 240,140 C320,112 400,158 480,134 C560,110 640,156 720,134 C800,114 880,156 960,138 C1040,120 1120,156 1200,140 C1280,126 1360,156 1440,140 L1440,220 L0,220 Z"
        fill="hsl(150 40% 8%)"
      />
      {/* moss tendrils */}
      <g stroke="hsl(150 25% 35%)" strokeWidth="1" opacity="0.45" fill="none">
        <path d="M120,160 q-3,18 -1,32" />
        <path d="M280,148 q4,22 -2,42" />
        <path d="M460,132 q-4,18 1,40" />
        <path d="M640,138 q3,22 -2,38" />
        <path d="M820,130 q-3,18 2,42" />
        <path d="M1000,140 q-2,18 1,32" />
        <path d="M1180,142 q4,18 -1,38" />
        <path d="M1340,148 q-3,18 2,40" />
      </g>
      <rect x="0" y="0" width="1440" height="60" fill="url(#cypress-grad)" />
    </svg>
  );
}

/**
 * Palm-frond silhouette — corner ornament, used in pairs.
 * Defaults to lower-left orientation; flip with className transforms.
 */
export function PalmFrond({ className, ...props }: DecorProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        {/* central stem */}
        <path d="M20,220 C90,180 140,120 180,40" />
        {/* fronds — left side */}
        <path d="M44,200 C30,180 22,148 38,118" />
        <path d="M68,180 C58,156 56,124 78,90" />
        <path d="M96,158 C92,130 96,98 124,68" />
        <path d="M126,134 C128,108 138,80 168,56" />
        {/* fronds — right side */}
        <path d="M52,206 C70,196 96,196 116,210" />
        <path d="M78,184 C100,176 128,178 152,194" />
        <path d="M108,160 C132,154 158,158 180,174" />
        <path d="M138,134 C158,128 178,134 198,150" />
      </g>
    </svg>
  );
}

/**
 * Bayou wave divider — placed between sections to suggest a still waterline.
 * Use w-full and a dark/light fill via the `fill` prop or className.
 */
export function BayouDivider({ className, flip = false, ...props }: DecorProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...props}
    >
      <path
        d="M0,40 C180,80 360,0 540,30 C720,60 900,10 1080,40 C1260,70 1350,30 1440,50 L1440,90 L0,90 Z"
        fill="currentColor"
      />
      <path
        d="M0,55 C200,80 380,40 560,55 C740,70 920,40 1100,55 C1280,70 1360,55 1440,65 L1440,90 L0,90 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/**
 * Subtle gator-scale tile pattern — wrap inside a parent and absolute-position it.
 * Works as a repeating decorative texture on dark surfaces.
 */
export function GatorScales({ className, ...props }: DecorProps) {
  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern id="gator-scales" x="0" y="0" width="48" height="42" patternUnits="userSpaceOnUse">
          <path
            d="M24,4 C36,4 44,14 44,22 C44,30 36,40 24,40 C12,40 4,30 4,22 C4,14 12,4 24,4 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.18"
          />
          <path
            d="M0,25 C6,21 12,21 18,25 C24,29 30,29 36,25 C42,21 48,21 54,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.10"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gator-scales)" />
    </svg>
  );
}

/**
 * Cattail ornament — vertical decorative reed.
 */
export function Cattail({ className, ...props }: DecorProps) {
  return (
    <svg
      viewBox="0 0 40 200"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="20" y1="0" x2="20" y2="200" strokeWidth="2.5" />
        <line x1="20" y1="40" x2="20" y2="84" strokeWidth="11" strokeLinecap="round" />
        {/* upper spike */}
        <line x1="20" y1="14" x2="20" y2="34" strokeWidth="1.6" />
        {/* leaf blades */}
        <path d="M20,140 Q4,160 16,200" strokeWidth="2" fill="none" />
        <path d="M20,140 Q36,160 24,200" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * Florida outline — small geographic mark.
 */
export function FloridaOutline({ className, ...props }: DecorProps) {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true" className={className} {...props}>
      <path
        d="M14,18 L82,18 L82,32 Q86,38 84,46 Q80,56 72,62 Q66,68 62,76 Q58,86 50,94 Q42,100 36,108 Q30,114 26,110 Q22,104 26,96 Q30,86 30,78 Q26,72 20,66 Q14,58 12,48 Q10,36 14,18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Decorative orange flourish — used as a section badge underline.
 */
export function BrandFlourish({ className, ...props }: DecorProps) {
  return (
    <svg viewBox="0 0 120 14" aria-hidden="true" className={className} {...props}>
      <path
        d="M2,8 C20,2 40,12 60,7 C80,2 100,12 118,7"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="7" r="2.5" fill="currentColor" />
    </svg>
  );
}
