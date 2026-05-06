import { useEffect, useRef } from "react";

/**
 * Reveals an element when it scrolls into view. Pair with the `.reveal` class
 * defined in index.css; the hook flips data-revealed="true" once the element
 * is observed crossing the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
