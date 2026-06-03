import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Lightweight client analytics — fires off POSTs to /api/analytics/event for
 * pageviews, form submits, and outbound calls. Stays best-effort: failures
 * are swallowed so they never block the UX.
 */

const SESSION_KEY = "cg_session_id";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min idle window

type SessionRecord = { id: string; ts: number };

function makeSessionId() {
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

function readSession(): SessionRecord | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeSession(rec: SessionRecord) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(rec));
  } catch {
    /* ignore */
  }
}

export function getSessionId(): string {
  const existing = readSession();
  const now = Date.now();
  if (existing && now - existing.ts < SESSION_TTL_MS) {
    writeSession({ id: existing.id, ts: now });
    return existing.id;
  }
  const id = makeSessionId();
  writeSession({ id, ts: now });
  return id;
}

type EventType = "pageview" | "form_submit" | "call" | "click";

export async function track(type: EventType, opts: {
  path?: string;
  metadata?: Record<string, unknown>;
} = {}) {
  if (typeof window === "undefined") return;
  try {
    const sessionId = getSessionId();
    const payload = {
      type,
      path: opts.path ?? window.location.pathname,
      sessionId,
      referrer: document.referrer || null,
      metadata: opts.metadata || null,
    };
    // Use sendBeacon when available for fire-and-forget reliability on unload
    if ("sendBeacon" in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/event", blob);
      return;
    }
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    /* swallow */
  }
}

/**
 * Drop this hook somewhere in the app (e.g. App.tsx). It fires a pageview
 * any time wouter's location changes — including the first load — and a
 * "call" event whenever any tel: link is clicked anywhere on the site.
 */
export function usePageviewTracking() {
  const [location] = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === location) return;
    lastPath.current = location;
    track("pageview", { path: location });
  }, [location]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest?.("a[href^='tel:']") as HTMLAnchorElement | null;
      if (!target) return;
      const number = target.getAttribute("href")?.replace("tel:", "") ?? "";
      track("call", { metadata: { number, surface: target.dataset.testid || target.getAttribute("aria-label") || "link" } });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
}
