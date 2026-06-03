import { useEffect } from "react";

/**
 * Renders JSON-LD structured data into <head> for a single page. The script is
 * removed on unmount so we don't accidentally stack tags across routes.
 */
export default function JsonLd({ id, data }: { id: string; data: Record<string, unknown> | Record<string, unknown>[] }) {
  useEffect(() => {
    const tagId = `jsonld-${id}`;
    let el = document.head.querySelector<HTMLScriptElement>(`#${tagId}`);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = tagId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      const existing = document.head.querySelector(`#${tagId}`);
      if (existing) existing.remove();
    };
  }, [id, data]);
  return null;
}

const BASE_URL = "https://cleargatorsolutions.com";

export function localBusinessLd(extras: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: "Clear Gator Construction Services",
    alternateName: "Clear Gator",
    description:
      "Interior & outdoor demolition, hauling, site cleanup, lot clearing, and property maintenance across Southwest Florida.",
    url: BASE_URL,
    telephone: "+1-239-234-3061",
    image: `${BASE_URL}/og-image.png`,
    logo: `${BASE_URL}/favicon.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cape Coral",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      "Cape Coral, FL",
      "Naples, FL",
      "Fort Myers, FL",
      "Bonita Springs, FL",
      "Punta Gorda, FL",
      "Sanibel Island, FL",
      "Babcock Ranch, FL",
      "St. James City, FL",
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "07:00", closes: "18:00" },
    ],
    ...extras,
  };
}

export function serviceLd(opts: { name: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Clear Gator Construction Services",
      telephone: "+1-239-234-3061",
      url: BASE_URL,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Southwest Florida" },
    url: `${BASE_URL}/services/${opts.slug}`,
  };
}

export function placeLd(opts: { name: string; state: string; description: string; slug: string }) {
  return {
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
  };
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

export { BASE_URL };
