/**
 * Curated hero/content imagery per service and per city.
 *
 * These are hotlinked Unsplash photos — Unsplash's license explicitly permits
 * hotlinking via images.unsplash.com URLs. If a photo ever goes missing the
 * page still looks complete because all consumers layer the image behind
 * gradient overlays + the brand logo treatment.
 *
 * Replace any of these with locally-hosted assets when you have them.
 */

export type PageImage = {
  /** Wide cover image used in hero backgrounds */
  hero: string;
  /** Secondary image used mid-page to break up text */
  feature?: string;
  /** Short attribution line shown at small size near the image */
  credit?: string;
};

/** Sized hotlink helper — adds Unsplash's CDN params for the right size. */
function unsplash(id: string, w = 1600, q = 80): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const SERVICE_IMAGES: Record<string, PageImage> = {
  "interior-demolition": {
    hero:    unsplash("photo-1581094794329-c8112a89af12", 1800),
    feature: unsplash("photo-1503387762-592deb58ef4e", 1400),
    credit:  "Unsplash",
  },
  "outdoor-demolition": {
    hero:    unsplash("photo-1504917595217-d4dc5ebe6122", 1800),
    feature: unsplash("photo-1517089596392-fb9a9033e05b", 1400),
    credit:  "Unsplash",
  },
  hauling: {
    hero:    unsplash("photo-1486325212027-8081e485255e", 1800),
    feature: unsplash("photo-1517022812141-23620dba5c23", 1400),
    credit:  "Unsplash",
  },
  "site-cleanup": {
    hero:    unsplash("photo-1504307651254-35680f356dfd", 1800),
    feature: unsplash("photo-1503387762-592deb58ef4e", 1400),
    credit:  "Unsplash",
  },
  "lot-clearing": {
    hero:    unsplash("photo-1574270981036-19e2b48a2c50", 1800),
    feature: unsplash("photo-1494522358652-f1fd3bf75a25", 1400),
    credit:  "Unsplash",
  },
  "property-maintenance": {
    hero:    unsplash("photo-1562259949-e8e7689d7828", 1800),
    feature: unsplash("photo-1581578731548-c64695cc6952", 1400),
    credit:  "Unsplash",
  },
};

export const CITY_IMAGES: Record<string, PageImage> = {
  "cape-coral": {
    hero:    unsplash("photo-1568605114967-8130f3a36994", 1800),
    feature: unsplash("photo-1502602898657-3e91760cbb34", 1400),
    credit:  "Unsplash",
  },
  "fort-myers": {
    hero:    unsplash("photo-1502602898657-3e91760cbb34", 1800),
    feature: unsplash("photo-1568605114967-8130f3a36994", 1400),
    credit:  "Unsplash",
  },
  naples: {
    hero:    unsplash("photo-1499856871958-5b9627545d1a", 1800),
    feature: unsplash("photo-1568605114967-8130f3a36994", 1400),
    credit:  "Unsplash",
  },
  "bonita-springs": {
    hero:    unsplash("photo-1565538810643-b5bdb714032a", 1800),
    feature: unsplash("photo-1502602898657-3e91760cbb34", 1400),
    credit:  "Unsplash",
  },
  "punta-gorda": {
    hero:    unsplash("photo-1572025442646-866d16c84a54", 1800),
    feature: unsplash("photo-1568605114967-8130f3a36994", 1400),
    credit:  "Unsplash",
  },
  "sanibel-island": {
    hero:    unsplash("photo-1507525428034-b723cf961d3e", 1800),
    feature: unsplash("photo-1502602898657-3e91760cbb34", 1400),
    credit:  "Unsplash",
  },
  "babcock-ranch": {
    hero:    unsplash("photo-1564013799919-ab600027ffc6", 1800),
    feature: unsplash("photo-1568605114967-8130f3a36994", 1400),
    credit:  "Unsplash",
  },
  "st-james-city": {
    hero:    unsplash("photo-1507525428034-b723cf961d3e", 1800),
    feature: unsplash("photo-1502602898657-3e91760cbb34", 1400),
    credit:  "Unsplash",
  },
};
