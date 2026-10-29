/**
 * Hero / card backdrop imagery used across the site.
 *
 * Local stock photos sit under /images/stock/ so pages never hotlink external
 * CDNs — that's what caused the "Eiffel Tower on a service page" problem
 * before. If an entry is missing, pages fall back to the construction shot.
 */

const FALLBACK_HERO = "/images/hero-construction.png";

export type PageImage = {
  hero: string;
  credit?: string;
};

export const SERVICE_IMAGES: Record<string, PageImage> = {
  "interior-demolition": { hero: "/images/stock/demo-interior.jpg" },
  "outdoor-demolition":  { hero: "/images/stock/demo-outdoor.jpg" },
  hauling:               { hero: "/images/stock/hauling.jpg" },
  "site-cleanup":        { hero: "/images/stock/cleanup.jpg" },
  landscaping:           { hero: "/images/stock/landscaping.jpg" },
  "pressure-washing":    { hero: "/images/stock/pressure-wash.jpg" },
};

export const CITY_IMAGES: Record<string, PageImage> = {
  "cape-coral":     { hero: "/images/stock/cape-coral.jpg" },
  "fort-myers":     { hero: "/images/stock/home-exterior.jpg" },
  naples:           { hero: "/images/stock/site-sunset.jpg" },
  "bonita-springs": { hero: "/images/stock/landscaping.jpg" },
  "punta-gorda":    { hero: "/images/stock/truck-site.jpg" },
  "sanibel-island": { hero: "/images/stock/site-aerial.jpg" },
  "babcock-ranch":  { hero: "/images/stock/crew-boots.jpg" },
  "st-james-city":  { hero: "/images/stock/blueprint.jpg" },
};

export { FALLBACK_HERO };
