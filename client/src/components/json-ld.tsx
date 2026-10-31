import { useEffect } from "react";

/**
 * Renders JSON-LD structured data into <head> for a single page. The script is
 * removed on unmount so we don't accidentally stack tags across routes.
 *
 * The actual schema.org builders live in @shared/schema-org so the Express
 * server can emit the same JSON-LD into the initial HTML for crawlers that
 * don't execute JS.
 */
export default function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
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

export {
  BASE_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  localBusinessLd,
  organizationLd,
  websiteLd,
  serviceLd,
  placeLd,
  breadcrumbLd,
  faqLd,
  slugifyCity,
} from "@shared/schema-org";
