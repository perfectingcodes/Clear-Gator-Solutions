import { SVGProps } from "react";

type DecorProps = SVGProps<SVGSVGElement>;

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
