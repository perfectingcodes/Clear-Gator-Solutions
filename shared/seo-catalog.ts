/**
 * Shared SEO catalog — pure data importable from both the client and the
 * Express SSR head injector. The hero image paths mirror the client's
 * page-images.ts (which stays client-only because it also drives card
 * backdrops and other UI not relevant to SEO).
 */

import { SERVICES, getService } from "./services";
import { CITIES, getCity } from "./cities";
import { BASE_URL, slugifyCity } from "./schema-org";

export type HeroImage = { path: string; alt: string };

export const DEFAULT_HERO: HeroImage = {
  path: "/images/stock/florida-home.jpg",
  alt: "Southwest Florida residential home",
};

export const SERVICE_HERO: Record<string, HeroImage> = {
  "hauling":              { path: "/images/stock/garage-clean.jpg", alt: "Junk hauling crew loading debris into a dump trailer at a Southwest Florida home" },
  "site-cleanup":         { path: "/images/stock/clean-home.jpg",   alt: "Post-renovation site cleanup crew clearing debris from a residential driveway" },
  "interior-demolition":  { path: "/images/stock/kitchen-reno.jpg", alt: "Interior demolition — sledgehammer breaking down drywall during a home renovation" },
  "outdoor-demolition":   { path: "/images/stock/pool-backyard.jpg", alt: "Outdoor demolition — backyard structure teardown at a Southwest Florida home" },
  "landscaping":          { path: "/images/stock/lawn-mow.jpg",     alt: "Lawn care crew mowing a manicured waterfront lawn with palm trees" },
  "pressure-washing":     { path: "/images/stock/pressure-wash.jpg", alt: "Pressure washing a paver driveway at a Southwest Florida home" },
};

export const CITY_HERO: Record<string, HeroImage> = {
  "cape-coral":     { path: "/images/stock/florida-home.jpg",       alt: "Cape Coral, FL residential home" },
  "fort-myers":     { path: "/images/stock/home-street.jpg",        alt: "Fort Myers, FL residential street" },
  "naples":         { path: "/images/stock/home-suburban.jpg",      alt: "Naples, FL residential neighborhood" },
  "bonita-springs": { path: "/images/stock/lawn-mow2.jpg",          alt: "Bonita Springs, FL yard being mowed" },
  "punta-gorda":    { path: "/images/stock/pool-backyard.jpg",      alt: "Punta Gorda, FL backyard pool deck" },
  "sanibel-island": { path: "/images/stock/backyard-fence.jpg",     alt: "Sanibel Island, FL fenced residential property" },
  "babcock-ranch":  { path: "/images/stock/home-driveway.jpg",      alt: "Babcock Ranch, FL residential driveway" },
  "st-james-city":  { path: "/images/stock/florida-home-tall.jpg",  alt: "St. James City on Pine Island, FL residential home" },
};

export const REGION_LONG = "Southwest Florida";
export const REGION_SHORT = "SW Florida";

export type ServiceInCity = {
  serviceSlug: string;
  citySlug: string;
};

/**
 * Returns every service × city combo URL in canonical form. 48 pages per the
 * current catalog (6 services × 8 cities). The URL shape is
 * `/services/{service-slug}/in-{city-slug-with-dashes}` — one path segment per
 * axis so Google treats each as a distinct landing surface.
 */
export function allServiceInCityCombos(): Array<{
  serviceSlug: string;
  citySlug: string;
  url: string;
}> {
  const out: Array<{ serviceSlug: string; citySlug: string; url: string }> = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      out.push({
        serviceSlug: s.slug,
        citySlug: c.slug,
        url: `${BASE_URL}/services/${s.slug}/in-${c.slug}`,
      });
    }
  }
  return out;
}

/** Resolve a service×city combo from URL segments. */
export function resolveCombo(serviceSlug: string, cityPrefixed: string) {
  if (!cityPrefixed.startsWith("in-")) return null;
  const citySlug = cityPrefixed.slice(3);
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) return null;
  return { service, city };
}

export { slugifyCity };
