import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
};

const DEFAULT_DESCRIPTION =
  "Clear Gator Construction Services — demo, hauling, site cleanup, lot clearing, and handyman work (including painting) for Cape Coral, Naples, and Southwest Florida. Licensed & insured. Let's Gator Done. Call (239) 234-3061.";

function setMeta(selector: string, attr: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, content);
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description ?? DEFAULT_DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description ?? DEFAULT_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
