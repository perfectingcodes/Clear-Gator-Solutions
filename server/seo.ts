/**
 * Server-side SEO head injector.
 *
 * The site is a Vite SPA. Without this, every route served the same
 * index.html — same title, same canonical, same OG image, no page-specific
 * JSON-LD. Googlebot renders JS, but Bing / LinkedIn / Facebook / Twitter
 * crawlers do not. This module rewrites <head> per request so crawlers see
 * the correct title, description, canonical, OG/Twitter cards, and
 * structured data for every page — before any JS executes.
 *
 * React still owns the body copy; the hook `use-page-meta` keeps the <head>
 * in sync during client-side navigations after hydration.
 */

import { SERVICES, getService } from "../shared/services";
import { CITIES, getCity } from "../shared/cities";
import {
  BASE_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SERVED_CITIES,
  breadcrumbLd,
  faqLd,
  localBusinessLd,
  organizationLd,
  placeLd,
  serviceLd,
  websiteLd,
} from "../shared/schema-org";
import {
  CITY_HERO,
  DEFAULT_HERO,
  REGION_LONG,
  REGION_SHORT,
  SERVICE_HERO,
  resolveCombo,
} from "../shared/seo-catalog";

export type RouteMeta = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  noindex?: boolean;
  jsonld: Record<string, unknown>[];
};

const CITY_GEO = new Map(
  SERVED_CITIES.map((c) => [c.name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-"), c]),
);

function clean(path: string): string {
  // Strip trailing slashes (except root), query strings, and hashes.
  const noQuery = path.split(/[?#]/)[0];
  if (noQuery === "/" || noQuery === "") return "/";
  return noQuery.replace(/\/+$/, "");
}

function absolute(path: string): string {
  return `${BASE_URL}${path === "/" ? "" : path}`;
}

function absoluteImage(path: string): string {
  // OG images should be absolute per spec.
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

export function matchRoute(reqPath: string): RouteMeta {
  const path = clean(reqPath);

  // Landing / home.
  if (path === "/") {
    return landingMeta();
  }

  // Estimate funnel.
  if (path === "/estimate") {
    return simpleMeta({
      title: `Get a Free Quote — ${BUSINESS_NAME}`,
      description:
        "Request a free written estimate for junk hauling, site cleanup, demolition, lawn care, or pressure washing anywhere in Southwest Florida. 24-hour reply, licensed & insured.",
      path: "/estimate",
      breadcrumbs: [
        { name: "Home", url: BASE_URL },
        { name: "Get a Free Quote", url: absolute("/estimate") },
      ],
    });
  }

  // Job tracking.
  if (path === "/track") {
    return simpleMeta({
      title: `Track Your Job — ${BUSINESS_NAME}`,
      description:
        "Track your Clear Gator job — see your quote, scheduled window, and crew notes in one place.",
      path: "/track",
      breadcrumbs: [
        { name: "Home", url: BASE_URL },
        { name: "Track My Job", url: absolute("/track") },
      ],
    });
  }

  if (path === "/privacy" || path === "/terms") {
    return simpleMeta({
      title: path === "/privacy" ? `Privacy — ${BUSINESS_NAME}` : `Terms — ${BUSINESS_NAME}`,
      description: path === "/privacy"
        ? "Clear Gator Construction Services privacy practices."
        : "Clear Gator Construction Services website terms of use.",
      path,
      breadcrumbs: [
        { name: "Home", url: BASE_URL },
        { name: path === "/privacy" ? "Privacy" : "Terms", url: absolute(path) },
      ],
    });
  }

  // Admin shouldn't be indexed.
  if (path.startsWith("/admin")) {
    return {
      ...simpleMeta({
        title: `Admin — ${BUSINESS_NAME}`,
        description: "",
        path,
      }),
      noindex: true,
    };
  }

  // Service × city combos: /services/:service/in-:city
  const comboMatch = path.match(/^\/services\/([^/]+)\/(in-[^/]+)$/);
  if (comboMatch) {
    const [, serviceSlug, cityPrefixed] = comboMatch;
    const resolved = resolveCombo(serviceSlug, cityPrefixed);
    if (resolved) {
      return comboMeta(resolved.service, resolved.city, path);
    }
  }

  // Service page: /services/:slug
  const svcMatch = path.match(/^\/services\/([^/]+)$/);
  if (svcMatch) {
    const service = getService(svcMatch[1]);
    if (service) return serviceMeta(service, path);
  }

  // City page: /service-areas/:slug
  const areaMatch = path.match(/^\/service-areas\/([^/]+)$/);
  if (areaMatch) {
    const city = getCity(areaMatch[1]);
    if (city) return cityMeta(city, path);
  }

  // Ad landing pages are kept out of the index by product decision.
  const lpMatch = path.match(/^\/lp\/([^/]+)$/);
  if (lpMatch) {
    const service = getService(lpMatch[1]);
    if (service) {
      return {
        ...serviceMeta(service, path),
        noindex: true,
      };
    }
  }

  // Fallback — index as the home shell but keep canonical honest so Google
  // doesn't collapse unknown URLs onto home.
  return {
    ...landingMeta(),
    canonical: absolute(path),
  };
}

/* -------------------------------------------------------------------------- */
/* Builders                                                                   */
/* -------------------------------------------------------------------------- */

function landingMeta(): RouteMeta {
  const title = `Junk Hauling, Site Cleanup & Demolition in ${REGION_SHORT} — ${BUSINESS_NAME}`;
  const description =
    "Same-day junk hauling, post-renovation and move-in cleanup, interior and outdoor demolition, lawn care, and pressure washing for Cape Coral, Naples, Fort Myers & Southwest Florida homes. Licensed & insured. Let's Gator Done.";
  const canonical = absolute("/");
  const ogImage = absoluteImage("/og-image.png");
  return {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt: "Clear Gator Construction Services — SW Florida",
    jsonld: [
      localBusinessLd(),
      organizationLd(),
      websiteLd(),
      breadcrumbLd([{ name: "Home", url: canonical }]),
    ],
  };
}

function serviceMeta(service: ReturnType<typeof getService> & object, path: string): RouteMeta {
  const title = `${service!.title}`;
  const description = service!.description;
  const canonical = absolute(`/services/${service!.slug}`);
  const hero = SERVICE_HERO[service!.slug] ?? DEFAULT_HERO;
  const ogImage = absoluteImage(hero.path);
  return {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt: hero.alt,
    jsonld: [
      localBusinessLd(),
      serviceLd({
        name: service!.name,
        description,
        slug: service!.slug,
      }),
      breadcrumbLd([
        { name: "Home", url: BASE_URL },
        { name: "Services", url: `${BASE_URL}/#services` },
        { name: service!.name, url: canonical },
      ]),
      faqLd(service!.faq),
    ],
  };
}

function cityMeta(city: ReturnType<typeof getCity> & object, path: string): RouteMeta {
  const title = city!.title;
  const description = city!.description;
  const canonical = absolute(`/service-areas/${city!.slug}`);
  const hero = CITY_HERO[city!.slug] ?? DEFAULT_HERO;
  const ogImage = absoluteImage(hero.path);
  const geo = CITY_GEO.get(city!.slug);
  return {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt: hero.alt,
    jsonld: [
      localBusinessLd(),
      placeLd({
        name: city!.name,
        state: city!.state,
        description,
        slug: city!.slug,
        latitude: geo?.latitude,
        longitude: geo?.longitude,
      }),
      breadcrumbLd([
        { name: "Home", url: BASE_URL },
        { name: "Service Areas", url: `${BASE_URL}/#service-areas` },
        { name: `${city!.name}, ${city!.state}`, url: canonical },
      ]),
      faqLd(city!.faq),
    ],
  };
}

function comboMeta(
  service: NonNullable<ReturnType<typeof getService>>,
  city: NonNullable<ReturnType<typeof getCity>>,
  path: string,
): RouteMeta {
  const nameInCity = `${service.name} in ${city.name}, ${city.state}`;
  const title = `${nameInCity} — ${BUSINESS_NAME}`;
  const description = `Local ${service.name.toLowerCase()} in ${city.name}, ${city.state} by Clear Gator. ${service.lede}`;
  const canonical = absolute(path);
  const hero = SERVICE_HERO[service.slug] ?? DEFAULT_HERO;
  const ogImage = absoluteImage(hero.path);
  const geo = CITY_GEO.get(city.slug);
  return {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt: `${service.name} crew working in ${city.name}, ${city.state}`,
    jsonld: [
      localBusinessLd(),
      serviceLd({
        name: service.name,
        description,
        slug: service.slug,
        cityName: city.name,
        cityState: city.state,
        canonicalUrl: canonical,
      }),
      placeLd({
        name: city.name,
        state: city.state,
        description: city.description,
        slug: city.slug,
        latitude: geo?.latitude,
        longitude: geo?.longitude,
      }),
      breadcrumbLd([
        { name: "Home", url: BASE_URL },
        { name: "Services", url: `${BASE_URL}/#services` },
        { name: service.name, url: `${BASE_URL}/services/${service.slug}` },
        { name: `${city.name}, ${city.state}`, url: canonical },
      ]),
      faqLd([...service.faq, ...city.faq]),
    ],
  };
}

function simpleMeta(opts: {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: { name: string; url: string }[];
}): RouteMeta {
  const canonical = absolute(opts.path);
  const jsonld: Record<string, unknown>[] = [localBusinessLd()];
  if (opts.breadcrumbs) jsonld.push(breadcrumbLd(opts.breadcrumbs));
  return {
    title: opts.title,
    description: opts.description,
    canonical,
    ogImage: absoluteImage("/og-image.png"),
    ogImageAlt: BUSINESS_NAME,
    jsonld,
  };
}

/* -------------------------------------------------------------------------- */
/* HTML head rewrite                                                           */
/* -------------------------------------------------------------------------- */

function escapeAttr(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJsonForScript(v: string): string {
  // Prevent </script> inside JSON from breaking out of the <script> tag.
  return v.replace(/</g, "\\u003c");
}

export function injectSeoHead(html: string, meta: RouteMeta): string {
  // Pass raw strings to upsertMeta/upsertLink/replaceOrInsert — they escape
  // once at the tag site. Escaping here first would double-encode `&`.
  const t = meta.title;
  const d = meta.description;
  const c = meta.canonical;
  const img = meta.ogImage;
  const imgAlt = meta.ogImageAlt;

  let out = html;

  // Title.
  out = replaceOrInsert(
    out,
    /<title[^>]*>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(t)}</title>`,
  );

  // Description.
  out = upsertMeta(out, { name: "description" }, d);
  out = upsertLink(out, { rel: "canonical" }, c);

  // Open Graph.
  out = upsertMeta(out, { property: "og:url" }, c);
  out = upsertMeta(out, { property: "og:title" }, t);
  out = upsertMeta(out, { property: "og:description" }, d);
  out = upsertMeta(out, { property: "og:image" }, img);
  out = upsertMeta(out, { property: "og:image:alt" }, imgAlt);
  out = upsertMeta(out, { property: "og:type" }, "website");
  out = upsertMeta(out, { property: "og:site_name" }, BUSINESS_NAME);
  out = upsertMeta(out, { property: "og:locale" }, "en_US");

  // Twitter.
  out = upsertMeta(out, { name: "twitter:card" }, "summary_large_image");
  out = upsertMeta(out, { name: "twitter:title" }, t);
  out = upsertMeta(out, { name: "twitter:description" }, d);
  out = upsertMeta(out, { name: "twitter:image" }, img);
  out = upsertMeta(out, { name: "twitter:image:alt" }, imgAlt);

  // Robots.
  if (meta.noindex) {
    out = upsertMeta(out, { name: "robots" }, "noindex,nofollow");
  } else {
    out = upsertMeta(out, { name: "robots" }, "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  }

  // Geo tags — modest signal for local pages, but cheap to add.
  out = upsertMeta(out, { name: "geo.region" }, "US-FL");
  out = upsertMeta(out, { name: "geo.placename" }, "Cape Coral, Florida");
  out = upsertMeta(out, { name: "ICBM" }, "26.5629, -81.9495");

  // JSON-LD — strip previously-injected SSR blocks, then add fresh ones.
  out = out.replace(/<script[^>]+data-seo="ssr"[\s\S]*?<\/script>\s*/gi, "");
  const ldBlocks = meta.jsonld
    .map(
      (d, i) =>
        `<script type="application/ld+json" data-seo="ssr" data-ssr-ld="${i}">${escapeJsonForScript(
          JSON.stringify(d),
        )}</script>`,
    )
    .join("\n    ");
  out = out.replace(/<\/head>/i, `    ${ldBlocks}\n  </head>`);

  return out;
}

function replaceOrInsert(html: string, pattern: RegExp, replacement: string): string {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(/<\/head>/i, `    ${replacement}\n  </head>`);
}

function upsertMeta(html: string, attrs: Record<string, string>, content: string): string {
  const key = Object.keys(attrs)[0];
  const val = attrs[key];
  const re = new RegExp(`<meta[^>]+${key}=["']${escapeRegex(val)}["'][^>]*>`, "i");
  const tag = `<meta ${key}="${val}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function upsertLink(html: string, attrs: Record<string, string>, href: string): string {
  const key = Object.keys(attrs)[0];
  const val = attrs[key];
  const re = new RegExp(`<link[^>]+${key}=["']${escapeRegex(val)}["'][^>]*>`, "i");
  const tag = `<link ${key}="${val}" href="${escapeAttr(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function escapeRegex(v: string): string {
  return v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* -------------------------------------------------------------------------- */
/* Sitemap generator                                                           */
/* -------------------------------------------------------------------------- */

export function buildSitemap(now: Date = new Date()): string {
  const lastmod = now.toISOString().slice(0, 10);
  const urls: Array<{ loc: string; changefreq: string; priority: string }> = [];

  urls.push({ loc: BASE_URL + "/", changefreq: "weekly", priority: "1.0" });
  urls.push({ loc: `${BASE_URL}/estimate`, changefreq: "monthly", priority: "0.7" });

  for (const s of SERVICES) {
    urls.push({
      loc: `${BASE_URL}/services/${s.slug}`,
      changefreq: "monthly",
      priority: "0.9",
    });
  }
  for (const c of CITIES) {
    urls.push({
      loc: `${BASE_URL}/service-areas/${c.slug}`,
      changefreq: "monthly",
      priority: "0.8",
    });
  }
  for (const s of SERVICES) {
    for (const c of CITIES) {
      urls.push({
        loc: `${BASE_URL}/services/${s.slug}/in-${c.slug}`,
        changefreq: "monthly",
        priority: "0.75",
      });
    }
  }
  urls.push({ loc: `${BASE_URL}/privacy`, changefreq: "yearly", priority: "0.3" });
  urls.push({ loc: `${BASE_URL}/terms`, changefreq: "yearly", priority: "0.3" });

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-0.9">\n${body}\n</urlset>\n`;
}

export function buildRobots(): string {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /lp/",
    "",
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}
