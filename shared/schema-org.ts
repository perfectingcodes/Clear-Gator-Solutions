/**
 * Centralized schema.org / JSON-LD builders.
 *
 * Lives in shared/ so both the React client (for client-side hydration) and
 * the Express SSR head injector can emit the exact same structured data.
 * Enrichments vs the first pass: geo coords, hasMap, logo as ImageObject,
 * areaServed listed as GeoCircle + per-city Place, Service offers +
 * provider cross-link.
 */

export const BASE_URL = "https://cleargatorsolutions.com";
export const BUSINESS_NAME = "Clear Gator Construction Services";
export const BUSINESS_ALT_NAME = "Clear Gator";
export const BUSINESS_PHONE = "+1-239-234-3061";
export const BUSINESS_PHONE_DISPLAY = "(239) 234-3061";
export const BUSINESS_EMAIL = "hello@cleargatorsolutions.com";

// Cape Coral city centroid — used as the business geo anchor until a
// precise street address is confirmed. Latitude/longitude are stable
// public data points; swap in HQ coords once the user shares them.
export const BUSINESS_GEO = { latitude: 26.5629, longitude: -81.9495 };

// Service radius in meters — covers Lee + Collier + Charlotte counties.
export const SERVICE_RADIUS_METERS = 80000;

export const SERVED_CITIES = [
  { name: "Cape Coral", state: "FL", latitude: 26.5629, longitude: -81.9495 },
  { name: "Fort Myers", state: "FL", latitude: 26.6406, longitude: -81.8723 },
  { name: "Naples", state: "FL", latitude: 26.1420, longitude: -81.7948 },
  { name: "Bonita Springs", state: "FL", latitude: 26.3398, longitude: -81.7787 },
  { name: "Punta Gorda", state: "FL", latitude: 26.9298, longitude: -82.0454 },
  { name: "Sanibel Island", state: "FL", latitude: 26.4484, longitude: -82.1098 },
  { name: "Babcock Ranch", state: "FL", latitude: 26.7925, longitude: -81.7148 },
  { name: "St. James City", state: "FL", latitude: 26.5086, longitude: -82.0801 },
];

export function localBusinessLd(extras: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${BASE_URL}/#business`,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALT_NAME,
    description:
      "Residential junk hauling, post-renovation and move-in cleanup, interior & outdoor demolition, lawn care, and pressure washing across Southwest Florida.",
    slogan: "Let's Gator Done.",
    url: BASE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.png`,
      width: 512,
      height: 512,
    },
    priceRange: "$$",
    paymentAccepted: "Cash, Card, ACH",
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cape Coral",
      addressRegion: "FL",
      postalCode: "33904",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS_GEO.latitude},${BUSINESS_GEO.longitude}`,
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS_GEO.latitude,
          longitude: BUSINESS_GEO.longitude,
        },
        geoRadius: SERVICE_RADIUS_METERS,
      },
      ...SERVED_CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${c.state}, US`,
        },
      })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    knowsLanguage: ["en-US"],
    // sameAs: populate with the business's live social URLs when available.
    sameAs: [] as string[],
    ...extras,
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALT_NAME,
    url: BASE_URL,
    telephone: BUSINESS_PHONE,
    logo: `${BASE_URL}/favicon.png`,
    sameAs: [] as string[],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: BUSINESS_NAME,
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/estimate?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  slug: string;
  cityName?: string;
  cityState?: string;
  canonicalUrl?: string;
}) {
  const url =
    opts.canonicalUrl ??
    (opts.cityName
      ? `${BASE_URL}/services/${opts.slug}/in-${slugifyCity(opts.cityName)}`
      : `${BASE_URL}/services/${opts.slug}`);

  const nameWithCity = opts.cityName
    ? `${opts.name} in ${opts.cityName}, ${opts.cityState ?? "FL"}`
    : opts.name;

  const areaServed = opts.cityName
    ? {
        "@type": "City",
        name: opts.cityName,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${opts.cityState ?? "FL"}, US`,
        },
      }
    : { "@type": "AdministrativeArea", name: "Southwest Florida" };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: opts.name,
    name: nameWithCity,
    description: opts.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: BUSINESS_NAME,
      telephone: BUSINESS_PHONE,
      url: BASE_URL,
    },
    areaServed,
    url,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${opts.name} services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: opts.name },
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          businessFunction: "https://schema.org/Sell",
        },
      ],
    },
  };
}

export function placeLd(opts: {
  name: string;
  state: string;
  description: string;
  slug: string;
  latitude?: number;
  longitude?: number;
}) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${opts.name}, ${opts.state}`,
    description: opts.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.name,
      addressRegion: opts.state,
      addressCountry: "US",
    },
    url: `${BASE_URL}/service-areas/${opts.slug}`,
  } as Record<string, unknown>;
  if (opts.latitude != null && opts.longitude != null) {
    base.geo = {
      "@type": "GeoCoordinates",
      latitude: opts.latitude,
      longitude: opts.longitude,
    };
  }
  return base;
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function slugifyCity(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
