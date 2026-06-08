import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Drop this hook once at the top of the app. It does two jobs:
 *
 *  1. When the wouter path changes (e.g. /services/interior-demolition →
 *     /service-areas/cape-coral), scroll to the very top so users never
 *     land on a new page already half-scrolled.
 *
 *  2. When only the hash changes (e.g. /#services), smooth-scroll to that
 *     anchor on the current page. The browser does this natively, but our
 *     sticky header would otherwise overlap the anchor target.
 *
 * Browser back/forward popstate events are detected via `popstate` so we
 * can preserve the natural scroll behaviour the browser already attempted.
 */
export function useScrollRestore() {
  const [location] = useLocation();
  const lastPath = useRef<string | null>(null);
  const isPopState = useRef(false);

  useEffect(() => {
    const onPop = () => { isPopState.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Path-change → scroll to top (or to hash anchor if present)
  useEffect(() => {
    const path = location;
    const prev = lastPath.current;
    lastPath.current = path;

    // Skip the very first run on initial load — let the browser handle it
    if (prev === null) return;

    // Don't override the browser's restored scroll for back/forward
    if (isPopState.current) { isPopState.current = false; return; }

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Wait a frame for the new route to render its anchors
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location]);

  // Hash-only changes (same path) — smooth scroll to target
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
}
