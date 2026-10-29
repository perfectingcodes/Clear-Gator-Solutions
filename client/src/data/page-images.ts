/**
 * Hero / card backdrop imagery used across the site.
 *
 * Local residential-focused SW Florida stock photos under /images/stock/.
 * Pages never hotlink external CDNs. If an entry is missing, pages fall back
 * to the single-family Florida home.
 */

const FALLBACK_HERO = "/images/stock/florida-home.jpg";

export type PageImage = {
  hero: string;
  credit?: string;
};

export const SERVICE_IMAGES: Record<string, PageImage> = {
  "interior-demolition": { hero: "/images/stock/kitchen-reno.jpg" },
  "outdoor-demolition":  { hero: "/images/stock/pool-backyard.jpg" },
  hauling:               { hero: "/images/stock/garage-clean.jpg" },
  "site-cleanup":        { hero: "/images/stock/clean-home.jpg" },
  landscaping:           { hero: "/images/stock/lawn-mow.jpg" },
  "pressure-washing":    { hero: "/images/stock/pressure-wash.jpg" },
};

export const CITY_IMAGES: Record<string, PageImage> = {
  "cape-coral":     { hero: "/images/stock/florida-home.jpg" },
  "fort-myers":     { hero: "/images/stock/home-street.jpg" },
  naples:           { hero: "/images/stock/home-suburban.jpg" },
  "bonita-springs": { hero: "/images/stock/lawn-mow2.jpg" },
  "punta-gorda":    { hero: "/images/stock/pool-backyard.jpg" },
  "sanibel-island": { hero: "/images/stock/backyard-fence.jpg" },
  "babcock-ranch":  { hero: "/images/stock/home-driveway.jpg" },
  "st-james-city":  { hero: "/images/stock/florida-home-tall.jpg" },
};

export { FALLBACK_HERO };
