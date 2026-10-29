import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
  /** Add robots meta to keep ad landing pages out of search index. */
  noindex?: boolean;
};

const DEFAULT_DESCRIPTION =
  "Clear Gator Construction Services — demolition, hauling, site cleanup, landscaping, and pressure washing for Cape Coral, Naples, and Southwest Florida. Licensed & insured. Let's Gator Done. Call (239) 234-3061.";

function setMeta(selector: string, attr: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, content);
}

function upsertRobots(content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (content == null) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, noindex }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description ?? DEFAULT_DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description ?? DEFAULT_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description ?? DEFAULT_DESCRIPTION);
    upsertRobots(noindex ? "noindex, nofollow" : null);
  }, [title, description, noindex]);
}
