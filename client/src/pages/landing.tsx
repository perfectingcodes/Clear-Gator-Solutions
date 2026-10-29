import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { useReveal } from "@/hooks/use-reveal";
import logoImg from "@assets/clear_gator_1775663894887.png";
import { SERVICE_IMAGES, CITY_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import {
  Truck, HardHat, PhoneCall, CheckCircle2,
  ArrowRight, Clock, Shield,
  FileText, DollarSign, Search, MapPin,
  Hammer, Handshake, Construction, Leaf, Droplets
} from "lucide-react";

const SERVICE_AREAS = [
  "Cape Coral",
  "Naples",
  "Bonita Springs",
  "Punta Gorda",
  "Sanibel Island",
  "St. James City",
  "Babcock Ranch",
  "Fort Myers",
];

const services = [
  {
    slug: "interior-demolition",
    icon: Hammer,
    title: "Interior Demolition",
    description: "Getting ready for a renovation? We handle the dirty part — kitchen tear-outs, bath gut-outs, old floors and drywall. Floors protected, dust contained, debris hauled.",
    features: ["Kitchen Tear-Outs", "Bathroom Gut-Outs", "Floor Removal", "Drywall & Plaster", "Popcorn Ceiling"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    slug: "outdoor-demolition",
    icon: Construction,
    title: "Outdoor Demolition",
    description: "Pool you don't want? Shed falling apart? Old deck wrecked by the last storm? We take it out, haul it off, and leave the yard flat and clean.",
    features: ["Pool Removal", "Shed & Fence Removal", "Concrete & Driveway", "Deck & Patio Tear-Out", "Storm Debris"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    slug: "hauling",
    icon: Truck,
    title: "Junk Hauling",
    description: "Garage full of stuff that needs to go? Old furniture, broken appliances, renovation debris, yard pile? Point at it. We load it. We haul it. Flat-rate, same-day.",
    features: ["Garage Cleanouts", "Old Furniture", "Appliance Removal", "Yard Debris", "Rental Turnovers"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "site-cleanup",
    icon: HardHat,
    title: "Site Cleanup",
    description: "Renovation done and construction dust everywhere? Just moved into a new house? We handle move-in deep cleans and post-renovation detail — floor to ceiling.",
    features: ["Post-Renovation", "Move-In Deep Clean", "HEPA Dust Removal", "Kitchen & Bath Detail", "Pre-Listing"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "landscaping",
    icon: Leaf,
    title: "Lawn Care",
    description: "Weekly lawn care for Southwest Florida homes. Mow, edge, line-trim, blow-off every walkway and driveway — same day each week, flat-rate per visit.",
    features: ["Weekly Mowing", "Clean Edges", "Line Trim", "Blow-Off", "Hedge Trim", "Mulch Refresh"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "pressure-washing",
    icon: Droplets,
    title: "Pressure Washing",
    description: "Whole-house soft wash, driveway refresh, pool deck, roof streaks, lanai cage. No stripes, plant-safe chemistry, your house looking brand-new.",
    features: ["House Soft Wash", "Driveway & Walkway", "Pool Deck", "Roof Wash", "Lanai Cage"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
];

const howItWorks = [
  { step: "01", title: "Request a Free Estimate", desc: "Fill out our quick form with your project details and upload photos.", icon: FileText },
  { step: "02", title: "Get Your Quote", desc: "Our team reviews your project and sends a detailed estimate within 24 hours.", icon: DollarSign },
  { step: "03", title: "We Get to Work", desc: "Our crew arrives on schedule and gets the job done right the first time.", icon: HardHat },
  { step: "04", title: "Track in Real Time", desc: "Use your Job ID to monitor progress, view site photos, and see your invoice.", icon: Search },
];

export default function LandingPage() {
  usePageMeta({
    title: "Clear Gator — Demolition, Junk Hauling, Lawn Care & Pressure Washing in SW Florida",
    description:
      "Residential demolition, junk hauling, move-in cleanup, weekly lawn care, and pressure washing for Cape Coral, Naples & Southwest Florida homes. Licensed & insured. Let's Gator Done. Call (239) 234-3061.",
  });

  const servicesReveal = useReveal<HTMLDivElement>();
  const howReveal = useReveal<HTMLDivElement>();
  const areasReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <MainNav />

      {/* ── HERO — photo-dominant overlay, reference-style ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/stock/florida-home.jpg')" }}
          aria-hidden="true"
        />
        {/* Darken for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36">
          {/* Service eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Demolition · Junk Hauling · Lawn Care
            </span>
          </div>

          {/* Massive headline */}
          <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 sm:mb-8 max-w-5xl text-[clamp(2.5rem,8vw,6.5rem)]">
            Clear the way<br />
            <span className="text-gator-orange">for what's next.</span>
          </h1>

          {/* Lede */}
          <p className="text-base sm:text-xl text-white/80 leading-[1.5] max-w-2xl mb-8 sm:mb-10 text-pretty">
            Demolition, junk hauling, move-in cleanup, weekly lawn care, and pressure washing for Southwest Florida homes.
          </p>

          {/* Two CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14 max-w-xl">
            <Link href="/estimate" className="flex-1 sm:flex-initial">
              <button
                className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/30"
                data-testid="hero-cta-estimate"
              >
                Get a Free Estimate
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
            <a href="#services" className="flex-1 sm:flex-initial">
              <button
                className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all"
                data-testid="hero-cta-services"
              >
                Our Services
              </button>
            </a>
          </div>

          {/* Trust pill strip */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4">
            {[
              { icon: Clock, label: "On Time, On Budget" },
              { icon: Shield, label: "Licensed & Insured" },
              { icon: CheckCircle2, label: "Serving SW Florida" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" strokeWidth={2.4} />
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Area marquee */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-3.5">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {[
                    "Cape Coral",
                    "Naples",
                    "Fort Myers",
                    "Bonita Springs",
                    "Punta Gorda",
                    "Sanibel Island",
                    "Babcock Ranch",
                    "St. James City",
                    "Let's Gator Done.",
                  ].map((c, i) => (
                    <span key={`${dup}-${i}`} className="flex items-center text-white/45 mx-6 text-xs font-mono uppercase tracking-[0.22em]">
                      {c === "Let's Gator Done." ? (
                        <span className="flex items-center gap-2 text-gator-orange font-semibold">
                          <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                          {c}
                        </span>
                      ) : (
                        c
                      )}
                      <span className="mx-6 text-white/15">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY — one-line credential strip ── */}
      <section className="relative bg-shell border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-teal flex-shrink-0">
            Trusted By
          </div>
          <div className="overflow-hidden flex-1 -mx-4 sm:mx-0 mask-fade-x">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {[
                    "Homeowners",
                    "Snowbirds",
                    "Rental Owners",
                    "Realtors",
                    "Property Managers",
                    "Flippers",
                    "First-Time Buyers",
                    "HOA Communities",
                  ].map((c, i) => (
                    <span key={`${dup}-${i}`} className="flex items-center mx-5 sm:mx-7 text-asphalt/70 text-sm sm:text-base font-display font-black uppercase tracking-tight">
                      {c}
                      <span className="mx-5 sm:mx-7 text-asphalt/20">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES — editorial 1-up + grid ── */}
      <section id="services" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell overflow-hidden">
        {/* Editorial header — asymmetric, left-weighted */}
        <div ref={servicesReveal} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-black text-5xl sm:text-6xl text-gator-orange tracking-[-0.04em] leading-none">
                  06
                </span>
                <div className="h-px w-10 bg-asphalt/30" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-teal">
                  Services for Homes
                </span>
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(2.25rem,7vw,5rem)] leading-[0.92] tracking-[-0.035em] text-asphalt text-balance">
                Everything your<br />
                <span className="text-teal">yard, driveway</span><br />
                &amp; walls need.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-asphalt/70 text-base sm:text-lg leading-[1.6] text-pretty border-l-2 border-gator-orange pl-5">
                Six crews under one roof — demo, haul, clean, mow, soft-wash. One call, one standard, one invoice. We own every step from the first walk-through to the last blow-off.
              </p>
            </div>
          </div>

          {/* Featured hero service — Lawn Care (the one most homeowners book first) */}
          {(() => {
            const featured = services.find((s) => s.slug === "landscaping")!;
            return (
              <Link href={`/services/${featured.slug}`}>
                <article className="group relative overflow-hidden rounded-2xl bg-asphalt text-shell mb-5 sm:mb-6 cursor-pointer transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                  <div className="grid lg:grid-cols-12 gap-0 min-h-[340px] sm:min-h-[400px]">
                    {/* Image side */}
                    <div className="relative lg:col-span-7 min-h-[260px] lg:min-h-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('${SERVICE_IMAGES[featured.slug]?.hero ?? FALLBACK_HERO}')` }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-asphalt/20 to-asphalt lg:to-asphalt" aria-hidden="true" />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt/60 via-transparent to-transparent lg:hidden" aria-hidden="true" />
                      {/* Featured label */}
                      <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gator-orange text-asphalt font-mono text-[10px] font-black tracking-[0.22em] uppercase shadow-lg shadow-black/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-asphalt animate-pulse" />
                        Most booked
                      </div>
                    </div>
                    {/* Text side */}
                    <div className="relative lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-asphalt">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-md bg-gator-orange flex items-center justify-center flex-shrink-0">
                          <featured.icon className="w-5 h-5 text-asphalt" strokeWidth={2.6} />
                        </div>
                        <span className="font-mono text-[10px] font-black tracking-[0.26em] uppercase text-gator-orange">
                          Mow · Edge · Trim
                        </span>
                      </div>
                      <h3 className="font-display font-black uppercase text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.03em] text-shell mb-4">
                        {featured.title}
                      </h3>
                      <p className="text-shell/70 text-base leading-[1.6] mb-6">
                        {featured.description}
                      </p>
                      <ul className="flex flex-wrap gap-1.5 mb-7">
                        {featured.features.slice(0, 4).map((f) => (
                          <li key={f} className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-shell/80 text-[11px] font-semibold">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 text-gator-orange font-black uppercase text-sm tracking-[0.18em] group-hover:gap-3 transition-all">
                        Weekly Service
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.6} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })()}

          {/* 5 secondary services — smaller tiles, 2-col mobile, 3-col lg */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.filter((s) => s.slug !== "landscaping").map((svc, i) => (
              <Link key={svc.title} href={`/services/${svc.slug}`}>
                <article className="group relative h-full flex flex-col overflow-hidden rounded-xl bg-asphalt text-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-asphalt/30 cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden bg-asphalt">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
                      style={{ backgroundImage: `url('${SERVICE_IMAGES[svc.slug]?.hero ?? FALLBACK_HERO}')` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-asphalt/70 via-asphalt/40 to-teal/60 group-hover:from-asphalt/60 group-hover:via-asphalt/30 transition-all duration-500" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-md bg-gator-orange flex items-center justify-center shadow-lg shadow-black/40">
                      <svc.icon className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
                    </div>
                    <span className="absolute top-5 right-5 font-mono text-[10px] font-black tracking-[0.22em] uppercase text-shell/60">
                      /0{i + 2}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display font-black uppercase text-xl sm:text-2xl leading-[0.95] tracking-tight text-shell">
                        {svc.title}
                      </h3>
                    </div>
                  </div>
                  <div className="relative flex-1 p-5 sm:p-6 flex flex-col bg-asphalt">
                    <p className="text-shell/65 text-[13px] leading-[1.6] mb-4 flex-1">
                      {svc.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gator-orange font-black uppercase text-[11px] tracking-[0.2em] group-hover:gap-3 transition-all pt-3 border-t border-white/10">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.6} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE — dark trust section ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-16 sm:py-24 lg:py-32">
        {/* ambient brand glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gator-orange/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute -right-20 bottom-0 w-[480px] h-[480px] object-contain opacity-[0.04] pointer-events-none select-none hidden md:block"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 lg:gap-y-14 items-center">
            {/* Left — big photo column */}
            <div className="lg:col-span-5 relative order-1 lg:order-none">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/stock/florida-home.jpg')" }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/30 to-transparent" aria-hidden="true" />
                {/* overlay stats pill */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gator-orange text-asphalt font-mono text-[10px] font-black tracking-[0.22em] uppercase mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-asphalt" />
                    SW Florida · Est. 2026
                  </div>
                  <div className="font-display font-black uppercase text-2xl sm:text-3xl text-shell leading-[0.95] tracking-tight">
                    Boots on<br />the ground.
                  </div>
                </div>
              </div>
              {/* Floating stat card */}
              <div className="hidden sm:block absolute -right-4 -bottom-6 lg:-right-6 lg:-bottom-8 rounded-xl bg-gator-orange text-asphalt p-5 shadow-2xl shadow-black/40 rotate-[-2deg] max-w-[200px]">
                <div className="font-mono text-[9px] font-black uppercase tracking-[0.26em] mb-1">
                  Avg Reply
                </div>
                <div className="font-display font-black text-4xl leading-none tracking-[-0.03em]">
                  &lt;24h
                </div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] mt-1 opacity-80">
                  Every quote, every time
                </div>
              </div>
            </div>

            {/* Right — editorial header + numbered reasons */}
            <div className="lg:col-span-7 lg:pl-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange">
                  Why Clear Gator
                </span>
                <div className="h-px flex-1 bg-shell/15 max-w-[120px]" aria-hidden="true" />
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.9] tracking-[-0.035em] text-shell text-balance mb-10 sm:mb-12">
                Work Harder.<br />
                <span className="text-gator-orange">Cleaner. Better.</span>
              </h2>

              <ol className="space-y-5 sm:space-y-6">
                {[
                  { num: "01", icon: Handshake, title: "Local & Trusted", body: "We live in Cape Coral. We work the same streets you drive. This is home — not a route." },
                  { num: "02", icon: Shield, title: "Licensed & Insured", body: "Fully licensed and insured. If something's not right, you have recourse — not a disconnected phone number." },
                  { num: "03", icon: Clock, title: "On Time & Responsive", body: "24-hour quote reply. We show up when we said we would. If plans change, you hear it before the appointment window." },
                  { num: "04", icon: CheckCircle2, title: "Quality Results", body: "We don't trade speed for damage. Floor protection, daily cleanup, no call-backs. You're not chasing us after the job." },
                ].map(({ num, icon: Icon, title, body }) => (
                  <li
                    key={num}
                    className="group relative grid grid-cols-[auto_1fr] gap-5 sm:gap-7 items-start pb-5 sm:pb-6 border-b border-white/10 last:border-b-0"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-display font-black text-4xl sm:text-5xl text-gator-orange tracking-[-0.04em] leading-none">
                        {num}
                      </span>
                      <div className="w-9 h-9 rounded-md bg-white/[0.05] border border-white/15 group-hover:bg-gator-orange group-hover:border-gator-orange flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-4 h-4 text-shell/70 group-hover:text-asphalt transition-colors" strokeWidth={2.4} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-black uppercase text-lg sm:text-2xl leading-tight tracking-tight text-shell mb-1.5">
                        {title}
                      </h3>
                      <p className="text-shell/65 text-sm sm:text-base leading-[1.6]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE GATOR WAY — editorial timeline ── */}
      <section id="how-it-works" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell overflow-hidden">
        <div ref={howReveal} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 items-end mb-10 sm:mb-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-black text-5xl sm:text-6xl text-asphalt/15 tracking-[-0.04em] leading-none">
                  04
                </span>
                <div className="h-px w-10 bg-asphalt/30" aria-hidden="true" />
                <span className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-teal">
                  The Gator Way
                </span>
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(2.25rem,7vw,5rem)] leading-[0.92] tracking-[-0.035em] text-asphalt text-balance">
                From first call<br />
                <span className="text-teal">to drive-off.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-asphalt/70 text-base sm:text-lg leading-[1.6] text-pretty border-l-2 border-gator-orange pl-5">
                Four steps. No back-and-forth, no surprises, no hidden line items. The job runs the way we told you it would.
              </p>
            </div>
          </div>

          {/* Horizontal timeline rail */}
          <div className="relative">
            {/* Connecting dashed rail (desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-px pointer-events-none" aria-hidden="true">
              <div className="w-full h-full border-t-2 border-dashed border-asphalt/15" />
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6">
              {howItWorks.map(({ step, title, desc, icon: Icon }, idx) => (
                <li key={step} className="relative">
                  {/* Numbered badge node */}
                  <div className="flex justify-center mb-4 lg:mb-6">
                    <div className="relative">
                      <div className="w-[104px] h-[104px] rounded-full bg-asphalt text-shell flex items-center justify-center shadow-xl shadow-asphalt/30 ring-4 ring-shell relative z-10">
                        <span className="font-display font-black text-4xl text-gator-orange tracking-[-0.04em] leading-none">
                          {step}
                        </span>
                      </div>
                      {/* Floating icon chip */}
                      <div className="absolute -top-1 -right-1 w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center shadow-lg shadow-black/40 z-20 ring-4 ring-shell">
                        <Icon className="w-4 h-4 text-asphalt" strokeWidth={2.6} />
                      </div>
                      {/* Mobile connector arrow */}
                      {idx < howItWorks.length - 1 && (
                        <div className="lg:hidden absolute left-full top-1/2 -translate-y-1/2 ml-4 w-6 h-px bg-asphalt/30 hidden sm:block" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  <div className="text-center lg:px-2">
                    <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-asphalt mb-2">
                      {title}
                    </h3>
                    <p className="text-asphalt/65 text-sm leading-[1.6] text-balance">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Footer CTA */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-asphalt/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] font-black tracking-[0.26em] uppercase text-asphalt/70">
                24h quote reply · Same-week starts
              </span>
            </div>
            <Link href="/estimate">
              <span className="inline-flex items-center gap-2 text-asphalt font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-0.5 hover:text-teal transition-colors cursor-pointer">
                Start a Project
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE GATOR PROMISE — four things we stake the name on ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-16 sm:py-24 lg:py-32">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute -right-24 -bottom-24 w-[460px] h-[460px] object-contain opacity-[0.04] pointer-events-none select-none hidden md:block"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Big pull quote — the editorial centerpiece */}
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-start mb-14 sm:mb-20">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange">
                  The Gator Promise
                </span>
                <div className="h-px flex-1 bg-shell/15 max-w-[160px]" aria-hidden="true" />
              </div>
              <blockquote className="font-display font-black uppercase text-[clamp(2rem,5.5vw,4.25rem)] leading-[0.95] tracking-[-0.035em] text-shell text-balance">
                <span className="text-gator-orange">"</span>The bar's named<br />
                after us.{" "}
                <span className="text-shell/50">We don't</span><br />
                <span className="text-shell/50">lower it.</span>
                <span className="text-gator-orange">"</span>
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <img src={logoImg} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
                <div className="leading-tight">
                  <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange">
                    — Clear Gator Crew
                  </div>
                  <div className="font-mono text-[10px] text-shell/50 tracking-[0.22em] uppercase mt-1">
                    Cape Coral · Est. 2026
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-20">
              <p className="text-shell/65 text-base sm:text-lg leading-[1.7] text-pretty border-l-2 border-gator-orange pl-5">
                Four things, no excuses. Every job, every crew. If any of these slip, you've got standing to hold us to it — because we told you first.
              </p>
            </div>
          </div>

          {/* Horizontal row of 4 promise commitments */}
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {[
              { num: "I.",   title: "We Show Up",       body: "Appointment windows kept. If plans change, you hear from us before the window — not after." },
              { num: "II.",  title: "We Quote Honest",  body: "Written scope, dump fees included. If something runs bigger, we tell you before we go past the number." },
              { num: "III.", title: "We Clean As We Go", body: "Floor protection, plastic walls where it matters, daily clean-up. Not a dust-covered mess at the end." },
              { num: "IV.",  title: "We Stand By It",   body: "If something isn't right, we come back and make it right. No chasing us for a callback." },
            ].map((p) => (
              <li key={p.num} className="group bg-asphalt p-6 sm:p-7 hover:bg-white/[0.03] transition-colors duration-300">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="font-display font-black text-4xl text-gator-orange tracking-[-0.04em] leading-none">
                    {p.num}
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.26em] text-shell/35 pt-1">
                    Promise
                  </span>
                </div>
                <h3 className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-2">
                  {p.title}
                </h3>
                <p className="text-shell/60 text-sm leading-[1.6]">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/estimate">
              <button className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] transition-all shadow-lg shadow-black/30">
                Put Us to Work
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS — SW FLORIDA ── */}
      <section id="service-areas" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell overflow-hidden">
        <div ref={areasReveal} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-black text-5xl sm:text-6xl text-gator-orange tracking-[-0.04em] leading-none">
                  08
                </span>
                <div className="h-px w-10 bg-asphalt/30" aria-hidden="true" />
                <span className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-teal">
                  Gator Country
                </span>
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(2.25rem,7vw,5rem)] leading-[0.92] tracking-[-0.035em] text-asphalt text-balance">
                Southwest Florida.<br />
                <span className="text-teal">End to end.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-asphalt/70 text-base sm:text-lg leading-[1.6] text-pretty border-l-2 border-gator-orange pl-5">
                Headquartered in Cape Coral. Weekly route from Punta Gorda to Naples, with a boat for the islands. Same crew, same day, every week.
              </p>
            </div>
          </div>

          {/* Featured cities — 2 up with photos */}
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
            {["Cape Coral", "Naples"].map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
              const img = (CITY_IMAGES as Record<string, { hero: string }>)[slug]?.hero ?? FALLBACK_HERO;
              const isHQ = city === "Cape Coral";
              return (
                <Link key={city} href={`/service-areas/${slug}`}>
                  <article className="group relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-asphalt cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-asphalt/40">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${img}')` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-asphalt/55 via-asphalt/30 to-asphalt/70" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <div className="w-9 h-9 rounded-md bg-gator-orange flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-asphalt" strokeWidth={2.6} />
                      </div>
                      {isHQ && (
                        <span className="font-mono text-[10px] font-black tracking-[0.26em] uppercase text-gator-orange px-2.5 py-1 rounded-full bg-asphalt/60 backdrop-blur">
                          HQ
                        </span>
                      )}
                    </div>
                    <ArrowRight className="absolute top-5 right-5 w-5 h-5 text-shell/60 group-hover:text-gator-orange group-hover:translate-x-1 transition-all" strokeWidth={2.4} />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-display font-black uppercase text-3xl sm:text-4xl leading-[0.95] tracking-tight text-shell">
                        {city}
                      </h3>
                      <p className="mt-1.5 text-shell/75 text-xs font-mono uppercase tracking-[0.22em]">
                        {isHQ ? "Where it all starts" : "Flagship coverage"}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* 6 smaller cities */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {SERVICE_AREAS.filter((c) => c !== "Cape Coral" && c !== "Naples").map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
              return (
                <li key={city} data-testid={`chip-city-${slug}`}>
                  <Link href={`/service-areas/${slug}`}>
                    <article className="group relative h-full px-4 py-5 rounded-lg bg-asphalt text-shell hover:bg-teal transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} />
                        <ArrowRight className="w-3.5 h-3.5 text-shell/40 group-hover:text-shell group-hover:translate-x-0.5 transition-all ml-auto" strokeWidth={2.4} />
                      </div>
                      <h3 className="font-display font-black uppercase text-sm sm:text-base leading-tight tracking-tight text-shell">
                        {city}
                      </h3>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 sm:mt-14 pt-7 border-t border-asphalt/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-asphalt/70 text-sm sm:text-base">
              Not on the list?{" "}
              <a href="tel:+12392343061" className="text-asphalt font-black border-b-2 border-gator-orange hover:text-teal transition-colors">
                Call us
              </a>{" "}
              — we travel for the right job.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] font-black tracking-[0.26em] uppercase text-asphalt/60">
                Weekly route · same day each week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — LET'S CLEAR IT. ── */}
      <section className="relative overflow-hidden bg-asphalt">
        {/* Photo backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/stock/florida-home.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/85 via-asphalt/70 to-teal/70" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div ref={ctaReveal} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Ready when you are
            </span>
          </div>

          <h2 className="font-display font-black uppercase text-[clamp(2.75rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.035em] text-white text-balance mb-6 sm:mb-8">
            Let's<br />
            <span className="text-gator-orange">Clear It.</span>
          </h2>

          <p className="text-white/80 text-base sm:text-xl leading-[1.5] max-w-2xl mx-auto mb-10 sm:mb-12 text-pretty">
            Free estimates returned within 24 hours. No commitment. No hidden line items.
            Just the work, done right.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <Link href="/estimate" className="flex-1">
              <button
                className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40"
                data-testid="footer-cta-estimate"
              >
                Get a Free Estimate
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
            <a href="tel:+12392343061" className="flex-1">
              <button
                className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-gator-orange" strokeWidth={2.4} />
                (239) 234-3061
              </button>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile sticky Call CTA — solid edge-to-edge orange bar */}
      <a
        href="tel:+12392343061"
        data-testid="mobile-call-now-bar"
        aria-label="Call Clear Gator at 239-234-3061"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gator-orange text-asphalt flex items-center gap-3.5 active:bg-gator-orange-dark transition-colors border-t border-gator-orange-dark/40"
        style={{
          paddingTop: "14px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 14px)",
          paddingLeft: "18px",
          paddingRight: "18px",
        }}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-asphalt/15 flex-shrink-0">
          <PhoneCall className="w-5 h-5" strokeWidth={2.4} />
        </span>
        <span className="flex flex-col leading-tight flex-1 min-w-0 text-left">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-asphalt/85">
            Tap to Call · 24h Reply
          </span>
          <span className="font-display text-lg font-semibold tracking-[-0.01em]">
            (239) 234-3061
          </span>
        </span>
        <ArrowRight className="w-5 h-5 text-asphalt/85 flex-shrink-0" strokeWidth={2.4} />
      </a>
    </div>
  );
}
