import { useEffect, useState } from "react";
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

type Surface = "light" | "transparent-dark";

/**
 * MainNav — sticky top navigation used across landing, service, and city pages.
 *
 * Desktop: logo + nav (Services, Service Areas, Process, Estimate) with two
 * mega-menu dropdowns that surface every service + every city. Hover-open on
 * mouse, focus-open on keyboard.
 *
 * Mobile: hamburger that opens a full-screen overlay listing every page,
 * grouped by section. Big tap-targets, brand-orange call CTA at the bottom.
 */
export default function MainNav({ surface = "light" }: { surface?: Surface }) {
  const [location] = useLocation();
  const [openMenu, setOpenMenu] = useState<"services" | "areas" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileOpen]);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const dark = surface === "transparent-dark";

  const headerBg = dark
    ? "bg-ink/70 backdrop-blur-md border-white/10 text-white"
    : "bg-background/85 backdrop-blur-md border-border/70 text-foreground";

  const navLink = dark
    ? "text-white/65 hover:text-white"
    : "text-muted-foreground hover:text-foreground";

  const subEyebrow = dark ? "text-white/45" : "text-muted-foreground";

  return (
    <header className={`sticky top-0 z-50 border-b ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="Clear Gator — Home">
          <img
            src={logoImg}
            alt="Clear Gator Logo"
            className="h-12 w-12 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-[1.04]"
          />
          <div className="hidden sm:block leading-none">
            <div className={`font-display font-semibold text-lg sm:text-xl tracking-[-0.02em] ${dark ? "text-white" : "text-foreground"}`}>
              Clear Gator
            </div>
            <div className={`flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.22em] uppercase mt-1 ${subEyebrow}`}>
              <span>Construction Services</span>
              <span className={dark ? "text-white/25" : "text-muted-foreground/40"}>·</span>
              <span className="text-gator-orange">SWFL</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-1 text-sm flex-1 justify-center"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <DropdownTrigger
            label="Services"
            isOpen={openMenu === "services"}
            onOpen={() => setOpenMenu("services")}
            className={navLink}
          />
          <DropdownTrigger
            label="Service Areas"
            isOpen={openMenu === "areas"}
            onOpen={() => setOpenMenu("areas")}
            className={navLink}
          />
          <a href="/#how-it-works" className={`px-3 py-2 font-medium transition-colors ${navLink}`}>The Gator Way</a>
          <Link href="/estimate" className={`px-3 py-2 font-medium transition-colors ${navLink}`}>Estimate</Link>
          <Link href="/track" className={`px-3 py-2 font-medium transition-colors ${navLink}`}>Track Job</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:+12392343061"
            className={`hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors ${dark ? "text-white hover:text-gator-orange-light" : "text-foreground hover:text-gator-orange"}`}
            aria-label="Call Clear Gator at 239-234-3061"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.2} />
            <span className="hidden xl:inline">(239) 234-3061</span>
            <span className="xl:hidden">Call</span>
          </a>
          <span className={`hidden md:block h-5 w-px ${dark ? "bg-white/15" : "bg-border"}`} aria-hidden="true" />
          <Link href="/estimate">
            <Button
              size="sm"
              className={
                dark
                  ? "bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold rounded-md shadow-sm"
                  : "bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-md shadow-sm"
              }
            >
              Free Estimate
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border transition-colors ${
              dark
                ? "border-white/15 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-muted/50"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      {openMenu === "services" && (
        <MegaMenuServices onClose={() => setOpenMenu(null)} />
      )}
      {openMenu === "areas" && (
        <MegaMenuAreas onClose={() => setOpenMenu(null)} />
      )}

      {/* Mobile overlay */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   Desktop dropdown trigger
   ───────────────────────────────────────────────────────────── */
function DropdownTrigger({
  label,
  isOpen,
  onOpen,
  className,
}: {
  label: string;
  isOpen: boolean;
  onOpen: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={`relative inline-flex items-center gap-1.5 px-3 py-2 font-medium transition-colors ${className} ${isOpen ? "text-foreground" : ""}`}
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
    <div
      className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">02 / Capabilities</div>
          <h3 className="font-display text-2xl font-semibold tracking-tight leading-tight mb-3">
            Six disciplines.<br /><span className="text-muted-foreground/60">One Gator crew.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            From interior gut-outs to property maintenance — same standards across every line.
          </p>
          <Link href="/#services" className="text-xs font-semibold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors">
            View on home →
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  <div className="group flex items-start gap-3 p-3 -mx-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-md bg-gator-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gator-orange/15 transition-colors">
                      <Icon className="w-4 h-4 text-gator-orange" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-display font-semibold text-sm tracking-tight">{s.name}</div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">{s.category}</p>
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
    <div
      className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">05 / Gator Country</div>
          <h3 className="font-display text-2xl font-semibold tracking-tight leading-tight mb-3">
            Eight cities,<br /><span className="text-muted-foreground/60">one route.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Cape Coral, Naples, Fort Myers, and everywhere in between. Local crew, weekly route.
          </p>
          <Link href="/#service-areas" className="text-xs font-semibold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors">
            View on home →
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-2">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/service-areas/${c.slug}`}>
                <div className="group flex items-start gap-3 p-3 -mx-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-display font-semibold text-sm tracking-tight">{c.name}</div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-1">{c.county}</p>
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
   Mobile full-screen menu
   ───────────────────────────────────────────────────────────── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-y-auto lg:hidden">
      {/* Top bar */}
      <div className="sticky top-0 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 h-18">
          <Link href="/" onClick={onClose} className="flex items-center gap-3" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 object-contain" />
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
      </div>

      <div className="px-5 py-8 space-y-10">
        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/estimate" onClick={onClose}>
            <div className="rounded-lg bg-gator-orange text-white p-4 active:bg-gator-orange-dark transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mb-1">Get</div>
              <div className="font-display text-lg font-bold tracking-tight">Free Estimate</div>
              <ArrowRight className="w-4 h-4 mt-2" />
            </div>
          </Link>
          <a href="tel:+12392343061" onClick={onClose}>
            <div className="rounded-lg bg-foreground text-background p-4 active:bg-foreground/90 transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/65 mb-1">Call</div>
              <div className="font-display text-lg font-bold tracking-tight">(239) 234-3061</div>
              <PhoneCall className="w-4 h-4 mt-2" />
            </div>
          </a>
        </div>

        {/* Services */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange">02 / Services</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <ul className="space-y-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={onClose}>
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-background active:bg-muted/40 transition-colors">
                      <div className="w-9 h-9 rounded-md bg-gator-orange/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gator-orange" strokeWidth={2.2} />
                      </div>
                      <span className="flex-1 font-display font-semibold text-base tracking-tight">{s.name}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange">05 / Gator Country</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <ul className="grid grid-cols-2 gap-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`} onClick={onClose}>
                  <div className="flex items-center gap-2 px-4 py-3.5 bg-background active:bg-muted/40 transition-colors h-full">
                    <MapPin className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" />
                    <span className="flex-1 font-display font-semibold text-sm tracking-tight">{c.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Misc */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange">More</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <ul className="space-y-px bg-border/60 rounded-lg overflow-hidden ring-1 ring-border/60">
            {[
              { href: "/track", label: "Track an existing job" },
              { href: "/#how-it-works", label: "The Gator Way (process)" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms & Conditions" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={onClose}>
                  <div className="flex items-center justify-between px-4 py-3.5 bg-background active:bg-muted/40 transition-colors">
                    <span className="font-medium text-sm">{label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer signature */}
        <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-[0.22em] text-gator-orange font-semibold">Let's Gator Done.</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
