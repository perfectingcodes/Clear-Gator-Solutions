import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu, X, PhoneCall, ArrowRight, ChevronDown,
  Hammer, Construction, Truck, HardHat, Leaf, Droplets, MapPin,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SERVICE_IMAGES, CITY_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import logoImg from "@assets/clear_gator_1775663894887.png";

const ICONS = { Hammer, Construction, Truck, HardHat, Leaf, Droplets } as const;

/**
 * MainNav — sticky top navigation used across every public page.
 *
 * Dark Asphalt bar with an oversized logo breakout, uppercase nav links,
 * lime phone CTA, and dark mega menus that use per-item photo backdrops.
 */
export default function MainNav() {
  const [location] = useLocation();
  const [openMenu, setOpenMenu] = useState<"services" | "areas" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (which: "services" | "areas") =>
    setOpenMenu((cur) => (cur === which ? null : which));

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-asphalt text-shell border-b border-white/5"
      >
        {/* lime accent rail */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gator-orange to-transparent opacity-60" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Oversized emblem breakout */}
          <Link
            href="/"
            className="relative flex items-center gap-3 group flex-shrink-0 z-10"
            aria-label="Clear Gator — Home"
          >
            <img
              src={logoImg}
              alt="Clear Gator Logo"
              className="relative h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 object-contain transition-transform group-hover:scale-[1.04] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] -my-6 sm:-my-10 lg:-my-12"
            />
            <div className="hidden sm:block leading-none">
              <div className="font-display font-black text-xl sm:text-[22px] tracking-[-0.01em] text-shell uppercase">Clear Gator</div>
              <div className="font-mono text-[9px] font-black tracking-[0.3em] uppercase text-gator-orange mt-1.5">
                Cleanup &amp; Site Reset
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm flex-1 justify-center">
            <NavTrigger label="SERVICES"      isOpen={openMenu === "services"} onToggle={() => toggle("services")} />
            <NavTrigger label="SERVICE AREAS" isOpen={openMenu === "areas"}    onToggle={() => toggle("areas")} />
            <NavLink href="/#how-it-works">OUR WORK</NavLink>
            <NavLink href="/estimate">ESTIMATE</NavLink>
            <NavLink href="/track">TRACK JOB</NavLink>
          </nav>

          {/* Right side: lime phone CTA + hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+12392343061"
              className="inline-flex items-center gap-2 bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase tracking-[0.1em] rounded-md px-3 sm:px-4 h-10 sm:h-11 transition-colors shadow-[0_8px_24px_-6px_rgba(198,244,50,0.5)]"
              aria-label="Call Clear Gator at 239-234-3061"
            >
              <PhoneCall className="w-4 h-4" strokeWidth={2.8} />
              <span className="hidden md:inline text-sm">(239) 234-3061</span>
              <span className="md:hidden text-sm">Call</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-shell/20 text-shell hover:bg-shell/10 hover:border-gator-orange hover:text-gator-orange transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {openMenu === "services" && (
          <MegaMenuServices key="m-services" onClose={() => setOpenMenu(null)} />
        )}
        {openMenu === "areas" && (
          <MegaMenuAreas key="m-areas" onClose={() => setOpenMenu(null)} />
        )}
      </header>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Desktop primitives
   ───────────────────────────────────────────────────────────── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative px-4 py-2 font-black text-[13px] tracking-wide text-shell/80 hover:text-shell transition-colors group"
    >
      {children}
      <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gator-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </a>
  );
}

function NavTrigger({
  label, isOpen, onToggle,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={`relative inline-flex items-center gap-1.5 px-4 py-2 font-black text-[13px] tracking-wide transition-colors group ${
        isOpen ? "text-shell" : "text-shell/80 hover:text-shell"
      }`}
    >
      {label}
      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.6} />
      <span
        className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gator-orange origin-left transition-transform ${
          isOpen ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mega menu: Services — dark asphalt with photo cards
   ───────────────────────────────────────────────────────────── */
function MegaMenuServices({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-asphalt text-shell border-b border-white/10 shadow-2xl shadow-black/40 animate-nav-drop overflow-hidden">
      {/* ambient brand glow */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-gator-orange/[0.08] blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-teal/[0.1] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange mb-4">
            Services
          </div>
          <h3 className="font-display font-black uppercase text-3xl leading-[0.95] tracking-[-0.03em] text-shell mb-4">
            Six Disciplines.<br /><span className="text-gator-orange">One Crew.</span>
          </h3>
          <p className="text-sm text-shell/60 leading-[1.65] mb-6">
            From interior gut-outs to pressure washing — same standards across every line.
          </p>
          <Link
            href="/#services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-shell font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-1 hover:text-gator-orange transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <ul className="col-span-9 grid grid-cols-3 gap-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            const img = SERVICE_IMAGES[s.slug]?.hero ?? FALLBACK_HERO;
            return (
              <li
                key={s.slug}
                className="animate-nav-stagger"
                style={{ ["--stagger-index" as never]: i } as React.CSSProperties}
              >
                <Link href={`/services/${s.slug}`} onClick={onClose}>
                  <article className="group relative h-full rounded-lg overflow-hidden bg-white/[0.03] border border-white/10 hover:border-gator-orange/50 transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${img}')` }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-md bg-gator-orange flex items-center justify-center">
                        <Icon className="w-4 h-4 text-asphalt" strokeWidth={2.4} />
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-display font-black uppercase text-sm text-shell tracking-tight leading-tight truncate">
                          {s.name}
                        </div>
                        <div className="font-mono text-[9px] font-black tracking-[0.22em] uppercase text-shell/50 mt-0.5 truncate">
                          {s.category}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-shell/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" strokeWidth={2.4} />
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mega menu: Service Areas — dark asphalt with photo cards
   ───────────────────────────────────────────────────────────── */
function MegaMenuAreas({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-asphalt text-shell border-b border-white/10 shadow-2xl shadow-black/40 animate-nav-drop overflow-hidden">
      <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full bg-teal/[0.1] blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-gator-orange/[0.08] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange mb-4">
            Gator Country
          </div>
          <h3 className="font-display font-black uppercase text-3xl leading-[0.95] tracking-[-0.03em] text-shell mb-4">
            Eight Cities.<br /><span className="text-gator-orange">One Route.</span>
          </h3>
          <p className="text-sm text-shell/60 leading-[1.65] mb-6">
            Cape Coral, Naples, Fort Myers and everywhere in between. Local crew, weekly route.
          </p>
          <Link
            href="/#service-areas"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-shell font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-1 hover:text-gator-orange transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <ul className="col-span-9 grid grid-cols-4 gap-3">
          {CITIES.map((c, i) => {
            const img = CITY_IMAGES[c.slug]?.hero ?? FALLBACK_HERO;
            return (
              <li
                key={c.slug}
                className="animate-nav-stagger"
                style={{ ["--stagger-index" as never]: i } as React.CSSProperties}
              >
                <Link href={`/service-areas/${c.slug}`} onClick={onClose}>
                  <article className="group relative h-full rounded-lg overflow-hidden bg-white/[0.03] border border-white/10 hover:border-gator-orange/50 transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${img}')` }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                      <div className="absolute top-2 left-2 w-7 h-7 rounded-md bg-gator-orange flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 text-asphalt" strokeWidth={2.4} />
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-display font-black uppercase text-sm text-shell tracking-tight leading-tight truncate">
                        {c.name}
                      </div>
                      <div className="font-mono text-[9px] font-black tracking-[0.22em] uppercase text-shell/50 mt-0.5 truncate">
                        {c.county.replace(" County", "")}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile full-screen menu — dark asphalt
   ───────────────────────────────────────────────────────────── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        className="absolute inset-0 bg-asphalt/80 backdrop-blur-sm animate-nav-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 w-full sm:w-[440px] bg-asphalt text-shell shadow-2xl animate-nav-panel flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0 bg-asphalt relative">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gator-orange to-transparent opacity-70" aria-hidden="true" />
          <Link href="/" onClick={onClose} className="flex items-center gap-3" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-14 w-14 object-contain -my-3" />
            <div className="leading-none">
              <div className="font-display font-black text-base tracking-tight uppercase text-shell">Clear Gator</div>
              <div className="font-mono text-[9px] font-black tracking-[0.3em] uppercase text-gator-orange mt-1">
                SWFL
              </div>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/15 text-shell hover:bg-white/5 hover:border-gator-orange hover:text-gator-orange transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll container */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Brand hero */}
          <div className="relative overflow-hidden border-b border-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: "url('/images/stock/crew-boots.jpg')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-teal/50" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/30 to-transparent" aria-hidden="true" />

            <div className="relative p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/90">
                  24h Reply
                </span>
              </div>
              <h2 className="font-display font-black uppercase text-3xl leading-[0.95] tracking-[-0.025em] text-shell mb-2">
                Let's Gator<br /><span className="text-gator-orange">Done.</span>
              </h2>
              <p className="text-sm text-shell/70 leading-[1.55] max-w-xs">
                Demolition, hauling, cleanup, landscaping &amp; pressure washing — SW Florida.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3 p-5">
            <Link href="/estimate" onClick={onClose}>
              <div className="group rounded-lg bg-gator-orange text-asphalt p-4 active:bg-gator-orange-dark transition-colors h-full flex flex-col justify-between min-h-[110px] shadow-lg shadow-gator-orange/25">
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-asphalt/70 mb-1.5">Get</div>
                  <div className="font-display font-black uppercase text-lg tracking-tight leading-tight">Free Estimate</div>
                </div>
                <ArrowRight className="w-4 h-4 self-end" strokeWidth={2.6} />
              </div>
            </Link>
            <a href="tel:+12392343061" onClick={onClose}>
              <div className="group rounded-lg bg-white/[0.05] border border-white/15 text-shell p-4 active:bg-white/10 transition-colors h-full flex flex-col justify-between min-h-[110px]">
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/55 mb-1.5">Call</div>
                  <div className="font-display font-black text-lg tracking-tight leading-tight">(239) 234-3061</div>
                </div>
                <PhoneCall className="w-4 h-4 self-end text-gator-orange" strokeWidth={2.6} />
              </div>
            </a>
          </div>

          {/* Services */}
          <NavGroup eyebrow="Services" title="What We Handle">
            <ul className="space-y-2.5">
              {SERVICES.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <li
                    key={s.slug}
                    className="animate-nav-stagger"
                    style={{ ["--stagger-index" as never]: i + 1 } as React.CSSProperties}
                  >
                    <Link href={`/services/${s.slug}`} onClick={onClose}>
                      <div className="flex items-center gap-3.5 px-4 py-3.5 rounded-md bg-white/[0.03] border border-white/10 active:bg-white/[0.07] hover:border-gator-orange/40 transition-colors">
                        <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-asphalt" strokeWidth={2.4} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-black uppercase text-sm text-shell tracking-tight leading-tight">{s.name}</div>
                          <div className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-shell/45 mt-0.5">{s.category}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-shell/40 flex-shrink-0" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavGroup>

          {/* Cities */}
          <NavGroup eyebrow="Gator Country" title="Where We Work">
            <ul className="grid grid-cols-2 gap-2">
              {CITIES.map((c, i) => (
                <li
                  key={c.slug}
                  className="animate-nav-stagger"
                  style={{ ["--stagger-index" as never]: i + 1 } as React.CSSProperties}
                >
                  <Link href={`/service-areas/${c.slug}`} onClick={onClose}>
                    <div className="flex items-center gap-2.5 px-3 py-3 rounded-md bg-white/[0.03] border border-white/10 active:bg-white/[0.07] hover:border-gator-orange/40 transition-colors h-full">
                      <MapPin className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" strokeWidth={2.6} />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-black uppercase text-xs text-shell tracking-tight leading-tight">{c.name}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavGroup>

          {/* More */}
          <NavGroup eyebrow="More" title="Other Pages">
            <ul className="space-y-2">
              {[
                { href: "/track",          label: "Track an existing job" },
                { href: "/#how-it-works",  label: "The Gator Way (process)" },
                { href: "/privacy",        label: "Privacy Policy" },
                { href: "/terms",          label: "Terms & Conditions" },
              ].map(({ href, label }, i) => (
                <li
                  key={href}
                  className="animate-nav-stagger"
                  style={{ ["--stagger-index" as never]: i + 1 } as React.CSSProperties}
                >
                  <Link href={href} onClick={onClose}>
                    <div className="flex items-center justify-between px-4 py-3 rounded-md bg-white/[0.03] border border-white/10 active:bg-white/[0.07] hover:border-gator-orange/40 transition-colors">
                      <span className="font-semibold text-sm text-shell/85">{label}</span>
                      <ArrowRight className="w-4 h-4 text-shell/40" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavGroup>

          {/* Footer signature */}
          <div className="px-5 py-6 mt-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
              <span className="font-mono uppercase tracking-[0.3em] text-gator-orange font-black">Let's Gator Done.</span>
            </div>
            <span className="text-shell/40">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-6 border-t border-white/10">
      <div className="mb-4">
        <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange mb-1.5">{eyebrow}</div>
        <div className="font-display font-black uppercase text-xl text-shell tracking-tight">{title}</div>
      </div>
      {children}
    </div>
  );
}
