import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu, X, PhoneCall, ArrowRight, ChevronDown,
  Hammer, Construction, Truck, HardHat, TreePine, Wrench, MapPin,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import logoImg from "@assets/clear_gator_1775663894887.png";

const ICONS = { Hammer, Construction, Truck, HardHat, TreePine, Wrench } as const;

/**
 * MainNav — sticky top navigation used across landing / service / city pages.
 *
 * Dropdowns are click-to-toggle so they don't disappear when the mouse moves
 * between trigger and panel (the previous hover-only approach had a gap
 * between the trigger and the dropdown that closed it mid-move). Outside
 * clicks and Escape close any open menu.
 *
 * Mobile menu is a full-screen, slide-in panel with a brand hero, big
 * tappable CTAs, staggered nav lists, and a "Let's Gator Done." sign-off.
 */
export default function MainNav() {
  const [location] = useLocation();
  const [openMenu, setOpenMenu] = useState<"services" | "areas" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close menus whenever the route changes
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location]);

  // Outside-click closes the desktop dropdown
  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  // Escape closes everything
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
        className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          {/* Logo lockup */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-[1.04]" />
            <div className="hidden sm:block leading-none">
              <div className="font-display font-semibold text-lg sm:text-xl tracking-[-0.02em] text-foreground">Clear Gator</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                <span>Construction Services</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-gator-orange">SWFL</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm flex-1 justify-center">
            <NavTrigger label="Services"      isOpen={openMenu === "services"} onToggle={() => toggle("services")} />
            <NavTrigger label="Service Areas" isOpen={openMenu === "areas"}    onToggle={() => toggle("areas")} />
            <NavLink href="/#how-it-works">The Gator Way</NavLink>
            <NavLink href="/estimate">Estimate</NavLink>
            <NavLink href="/track">Track Job</NavLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+12392343061"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gator-orange transition-colors"
              aria-label="Call Clear Gator at 239-234-3061"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.2} />
              <span className="hidden xl:inline">(239) 234-3061</span>
              <span className="xl:hidden">Call</span>
            </a>
            <span className="hidden md:block h-5 w-px bg-border" aria-hidden="true" />
            <Link href="/estimate">
              <Button size="sm" className="bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-md shadow-sm">
                Free Estimate
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-foreground hover:bg-muted/50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop mega menus */}
        {openMenu === "services" && (
          <MegaMenuServices key="m-services" onClose={() => setOpenMenu(null)} />
        )}
        {openMenu === "areas" && (
          <MegaMenuAreas key="m-areas" onClose={() => setOpenMenu(null)} />
        )}
      </header>

      {/* Mobile overlay (lives outside the sticky header so it covers everything) */}
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
      className="relative px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors group"
    >
      {children}
      <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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
      className={`relative inline-flex items-center gap-1.5 px-3 py-2 font-medium transition-colors group ${
        isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.2} />
      <span
        className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gator-orange origin-left transition-transform ${
          isOpen ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mega menu: Services
   ───────────────────────────────────────────────────────────── */
function MegaMenuServices({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl animate-nav-drop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">02 / Capabilities</div>
          <h3 className="font-display text-2xl font-semibold tracking-tight leading-tight mb-3">
            Six disciplines.<br /><span className="text-muted-foreground/60">One Gator crew.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            From interior gut-outs to property maintenance — same standards across every line.
          </p>
          <Link href="/#services" onClick={onClose} className="text-xs font-semibold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors">
            View on home →
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li
                key={s.slug}
                className="animate-nav-stagger"
                style={{ ["--stagger-index" as never]: i } as React.CSSProperties}
              >
                <Link href={`/services/${s.slug}`} onClick={onClose}>
                  <div className="group flex items-start gap-3 p-3 -mx-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-md bg-gator-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gator-orange/15 transition-colors">
                      <Icon className="w-4 h-4 text-gator-orange" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-display font-semibold text-sm tracking-tight">{s.name}</div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.category}</p>
                    </div>
                  </div>
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
   Mega menu: Service Areas
   ───────────────────────────────────────────────────────────── */
function MegaMenuAreas({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl animate-nav-drop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">05 / Gator Country</div>
          <h3 className="font-display text-2xl font-semibold tracking-tight leading-tight mb-3">
            Eight cities,<br /><span className="text-muted-foreground/60">one route.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Cape Coral, Naples, Fort Myers, and everywhere in between. Local crew, weekly route.
          </p>
          <Link href="/#service-areas" onClick={onClose} className="text-xs font-semibold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors">
            View on home →
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-2">
          {CITIES.map((c, i) => (
            <li
              key={c.slug}
              className="animate-nav-stagger"
              style={{ ["--stagger-index" as never]: i } as React.CSSProperties}
            >
              <Link href={`/service-areas/${c.slug}`} onClick={onClose}>
                <div className="group flex items-start gap-3 p-3 -mx-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-display font-semibold text-sm tracking-tight">{c.name}</div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{c.county}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile full-screen menu — award-winning
   ───────────────────────────────────────────────────────────── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-nav-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sliding panel — full width on mobile, drawer on larger screens */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[440px] bg-background shadow-2xl animate-nav-panel flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain" />
            <div className="leading-none">
              <div className="font-display font-semibold text-base tracking-[-0.02em]">Clear Gator</div>
              <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-muted-foreground mt-1">SWFL</div>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll container */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Brand hero */}
          <div className="relative bg-ink text-white overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/images/hero-construction.png')" }} aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" aria-hidden="true" />
            <img src={logoImg} alt="" aria-hidden="true" className="absolute -right-8 -bottom-8 w-44 h-44 object-contain opacity-[0.08] pointer-events-none" />
            <div className="relative p-5 pb-6">
              <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gator-orange-light font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available · 24-hour reply
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] leading-[1.05] mb-1 text-balance">
                Let's Gator Done.
              </h2>
              <p className="text-sm text-white/70 leading-[1.55]">
                Demolition, hauling, cleanup, lot clearing &amp; property maintenance — Cape Coral, Naples, Fort Myers and across SW Florida.
              </p>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="grid grid-cols-2 gap-3 p-5">
            <Link href="/estimate" onClick={onClose}>
              <div className="group rounded-lg bg-gator-orange text-white p-4 active:bg-gator-orange-dark transition-colors h-full flex flex-col justify-between min-h-[100px] shadow-lg shadow-gator-orange/25">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mb-1.5">Get</div>
                  <div className="font-display text-lg font-bold tracking-tight leading-tight">Free Estimate</div>
                </div>
                <ArrowRight className="w-4 h-4 self-end" strokeWidth={2.4} />
              </div>
            </Link>
            <a href="tel:+12392343061" onClick={onClose}>
              <div className="group rounded-lg bg-foreground text-background p-4 active:bg-foreground/90 transition-colors h-full flex flex-col justify-between min-h-[100px]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/65 mb-1.5">Call</div>
                  <div className="font-display text-lg font-bold tracking-tight leading-tight">(239) 234-3061</div>
                </div>
                <PhoneCall className="w-4 h-4 self-end" strokeWidth={2.4} />
              </div>
            </a>
          </div>

          {/* Services */}
          <NavGroup eyebrow="02 / Services" title="What we handle">
            <ul className="space-y-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
              {SERVICES.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <li
                    key={s.slug}
                    className="animate-nav-stagger"
                    style={{ ["--stagger-index" as never]: i + 1 } as React.CSSProperties}
                  >
                    <Link href={`/services/${s.slug}`} onClick={onClose}>
                      <div className="flex items-center gap-3.5 px-4 py-4 bg-background active:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-md bg-gator-orange/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-gator-orange" strokeWidth={2.2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-base tracking-tight leading-tight">{s.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{s.category}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavGroup>

          {/* Cities */}
          <NavGroup eyebrow="05 / Gator Country" title="Where we work">
            <ul className="grid grid-cols-2 gap-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
              {CITIES.map((c, i) => (
                <li
                  key={c.slug}
                  className="animate-nav-stagger"
                  style={{ ["--stagger-index" as never]: i + 1 } as React.CSSProperties}
                >
                  <Link href={`/service-areas/${c.slug}`} onClick={onClose}>
                    <div className="flex items-center gap-2 px-4 py-3.5 bg-background active:bg-muted/50 transition-colors h-full">
                      <MapPin className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-sm tracking-tight leading-tight">{c.name}</div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{c.county.replace(" County", "")}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavGroup>

          {/* More */}
          <NavGroup eyebrow="More" title="Other pages">
            <ul className="space-y-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
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
                    <div className="flex items-center justify-between px-4 py-3.5 bg-background active:bg-muted/50 transition-colors">
                      <span className="font-medium text-sm">{label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavGroup>

          {/* Footer signature */}
          <div className="px-5 py-6 mt-2 border-t border-border bg-muted/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
              <span className="font-mono uppercase tracking-[0.24em] text-gator-orange font-semibold">Let's Gator Done.</span>
            </div>
            <span className="text-muted-foreground">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-6 border-t border-border first-of-type:border-t">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-gator-orange font-semibold mb-1">{eyebrow}</div>
          <div className="font-display text-lg font-semibold tracking-tight">{title}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
