/**
 * Hero backdrop imagery used on service and city pages.
 *
 * For now we only use brand-controlled assets — specifically the existing
 * construction photo at /images/hero-construction.png. Mixing unverified
 * external photos (e.g. Unsplash hotlinks) creates risk: a wrong photo can
 * make the site read as careless. Until we have a vetted photo library
 * we'll lean on the brand emblem + the single construction shot.
 *
 * When you add per-service or per-city photos, drop them in
 * client/public/images/ and reference them here. The page components handle
 * a missing entry gracefully — they fall back to the construction shot.
 */

const FALLBACK_HERO = "/images/hero-construction.png";

export type PageImage = {
  /** Wide cover image used in hero backgrounds */
  hero: string;
  /** Optional credit line if the image isn't ours */
  credit?: string;
};

export const SERVICE_IMAGES: Record<string, PageImage> = {
  "interior-demolition":   { hero: FALLBACK_HERO },
  "outdoor-demolition":    { hero: FALLBACK_HERO },
  hauling:                 { hero: FALLBACK_HERO },
  "site-cleanup":          { hero: FALLBACK_HERO },
  "lot-clearing":          { hero: FALLBACK_HERO },
  "property-maintenance":  { hero: FALLBACK_HERO },
};

export const CITY_IMAGES: Record<string, PageImage> = {
  "cape-coral":     { hero: FALLBACK_HERO },
  "fort-myers":     { hero: FALLBACK_HERO },
  naples:           { hero: FALLBACK_HERO },
  "bonita-springs": { hero: FALLBACK_HERO },
  "punta-gorda":    { hero: FALLBACK_HERO },
  "sanibel-island": { hero: FALLBACK_HERO },
  "babcock-ranch":  { hero: FALLBACK_HERO },
  "st-james-city":  { hero: FALLBACK_HERO },
};
