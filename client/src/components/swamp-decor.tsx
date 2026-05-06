import { SVGProps } from "react";

type DecorProps = SVGProps<SVGSVGElement>;

/**
 * GatorMark — minimalist line silhouette of an alligator in profile.
 * Modern editorial brand mark. Uses currentColor so it picks up its color
 * from the parent element. Default ratio: ~3:1 (96x32).
 *
 * Reading left → right: snout, eye, raised back ridge with tooth points,
 * stubby legs underneath, tapering tail.
 */
export function GatorMark({ className, ...props }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* mouth line — open jaw at the front */}
      <path d="M2,17 L14,17" />
      {/* upper jaw + back ridge: snout, head bump, body arc, tail point */}
      <path d="M2,17 Q4,12 12,12 L18,12 Q22,8 30,8 L52,8 Q60,8 64,11 Q70,15 78,15 Q88,15 96,12 Q104,9 116,5" />
      {/* lower body: belly + tail */}
      <path d="M2,17 Q4,21 12,21 L20,21 L80,21 Q90,21 98,19 Q108,16 116,6" />
      {/* eye */}
      <circle cx="22" cy="11" r="1" fill="currentColor" stroke="none" />
      {/* nostril */}
      <circle cx="6" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
      {/* legs */}
      <path d="M30,21 L30,27 M27,27 L33,27" />
      <path d="M64,21 L64,27 M61,27 L67,27" />
      {/* dorsal tooth ridge */}
      <path
        d="M22,11 l1.4,-2 l1.4,2 M30,8 l1.4,-2 l1.4,2 M40,8 l1.4,-2 l1.4,2 M50,8 l1.4,-2 l1.4,2 M58,8 l1.4,-2 l1.4,2 M68,12 l1.4,-2 l1.4,2 M78,15 l1.4,-2 l1.4,2 M88,14 l1.4,-2 l1.4,2 M98,11 l1.4,-2 l1.4,2"
        opacity="0.55"
      />
    </svg>
  );
}

/**
 * Compact CG monogram — used as a small inline brand sigil
 * where the full GatorMark would be too wide.
 */
export function GatorMonogram({ className, ...props }: DecorProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="6" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="Geist, Inter, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        CG
      </text>
    </svg>
  );
}

/**
 * Gator-scale tile pattern — used very sparingly as a sophisticated
 * geometric texture on dark surfaces. The motif reads as premium / fashion-house
 * (think python or croc-skin embossing) rather than literal swamp.
 */
export function GatorScales({ className, ...props }: DecorProps) {
  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern id="gator-scales" x="0" y="0" width="44" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M22,3 C33,3 41,12 41,20 C41,28 33,37 22,37 C11,37 3,28 3,20 C3,12 11,3 22,3 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gator-scales)" />
    </svg>
  );
}

/**
 * Editorial section number — small caps "01 / Services" treatment used as eyebrow.
 */
export function SectionRule({ className, ...props }: DecorProps) {
  return (
    <svg viewBox="0 0 80 6" aria-hidden="true" className={className} {...props}>
      <line x1="0" y1="3" x2="32" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="3" x2="80" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
