import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { GatorScales, SectionRule } from "@/components/swamp-decor";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { useReveal } from "@/hooks/use-reveal";
import logoImg from "@assets/clear_gator_1775663894887.png";
import { SERVICE_IMAGES, FALLBACK_HERO } from "@/data/page-images";
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
  const tradeReveal = useReveal<HTMLDivElement>();
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

      {/* ── OUR SERVICES — REAL WORK. REAL RESULTS. ── */}
      <section id="services" className="relative py-16 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={servicesReveal} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Our Services
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Real Work.<br />
              <span className="text-teal">Real Results.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((svc, i) => (
              <Link key={svc.title} href={`/services/${svc.slug}`}>
                <article className="group relative h-full flex flex-col overflow-hidden rounded-xl bg-asphalt text-shell transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-asphalt/30 cursor-pointer">
                  {/* Per-service photo header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-asphalt">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
                      style={{ backgroundImage: `url('${SERVICE_IMAGES[svc.slug]?.hero ?? FALLBACK_HERO}')` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-asphalt/70 via-asphalt/40 to-teal/60 group-hover:from-asphalt/60 group-hover:via-asphalt/30 transition-all duration-500" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                    {/* big icon */}
                    <div className="absolute top-5 left-5 w-14 h-14 rounded-lg bg-gator-orange flex items-center justify-center shadow-lg shadow-black/40">
                      <svc.icon className="w-7 h-7 text-asphalt" strokeWidth={2.4} />
                    </div>
                    <span className="absolute top-5 right-5 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-shell/70">
                      /0{i + 1}
                    </span>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-display font-black uppercase text-2xl sm:text-3xl leading-[0.95] tracking-tight text-shell">
                        {svc.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative flex-1 p-6 sm:p-7 flex flex-col bg-asphalt">
                    <p className="text-shell/70 text-sm leading-[1.6] mb-5 flex-1">
                      {svc.description}
                    </p>
                    <ul className="flex flex-wrap gap-1.5 mb-6">
                      {svc.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-shell/75 text-[11px] font-medium"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-gator-orange font-black uppercase text-xs tracking-[0.18em] group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.6} />
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
          <div className="text-center mb-14 sm:mb-20">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              Why Choose Clear Gator
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Work Harder.<br />
              <span className="text-gator-orange">Cleaner. Better.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { icon: Handshake, title: "Local & Trusted", body: "Boots on the ground across SW Florida. We live here, we build here." },
              { icon: Shield, title: "Licensed & Insured", body: "Fully licensed and insured. Every job, every crew, every time." },
              { icon: Clock, title: "On Time & Responsive", body: "24-hour quote reply. We show up when we said. If plans change, you hear it first." },
              { icon: CheckCircle2, title: "Quality Results", body: "We don't trade speed for damage. Floor protection, daily cleanup, call-back-free work." },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-lg bg-gator-orange flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Icon className="w-7 h-7 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell mb-2.5">
                  {title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE GATOR WAY — HOW IT WORKS ── */}
      <section id="how-it-works" className="relative py-16 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={howReveal} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              The Gator Way
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Four Steps.<br />
              <span className="text-teal">No Surprises.</span>
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {howItWorks.map(({ step, title, desc, icon: Icon }) => (
              <li
                key={step}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-asphalt/30"
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-gator-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-5xl text-gator-orange tracking-[-0.04em] leading-none">
                    {step}
                  </span>
                  <div className="w-11 h-11 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-gator-orange group-hover:border-gator-orange transition-colors duration-300">
                    <Icon className="w-5 h-5 text-shell/80 group-hover:text-asphalt transition-colors duration-300" strokeWidth={2.2} />
                  </div>
                </div>
                <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell mb-2.5">
                  {title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{desc}</p>
              </li>
            ))}
          </ol>
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
          <div className="text-center mb-14 sm:mb-20">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              The Gator Promise
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              The Bar's Named<br />
              <span className="text-gator-orange">After Us.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                num: "I.",
                title: "We Show Up",
                body: "We arrive when we said we would. If we can't, you hear from us before the appointment window, not after.",
              },
              {
                num: "II.",
                title: "We Quote Honest",
                body: "Written estimate, scope spelled out, dump fees included. If something runs bigger than the walk-through showed, you hear from us before we go past the quote.",
              },
              {
                num: "III.",
                title: "We Clean As We Go",
                body: "We don't trade speed for damage. Floor protection, daily clean-up, debris loaded same-day where access allows.",
              },
              {
                num: "IV.",
                title: "We Stand By It",
                body: "If something we did isn't right, we come back and make it right. You're not chasing us for a callback.",
              },
            ].map((p) => (
              <div
                key={p.num}
                className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display font-black text-4xl text-gator-orange tracking-[-0.04em] leading-none">
                    {p.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-shell/40">Promise</span>
                </div>
                <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell mb-2.5">
                  {p.title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      <section id="service-areas" className="relative py-16 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={areasReveal} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Service Areas
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Southwest Florida.<br />
              <span className="text-teal">End to End.</span>
            </h2>
            <p className="mt-6 text-asphalt/70 text-base sm:text-lg leading-[1.6] max-w-xl mx-auto">
              Headquartered in Cape Coral. Same crew, same standards, from the islands to the ranch.
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SERVICE_AREAS.map((city) => (
              <li
                key={city}
                data-testid={`chip-city-${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
              >
                <Link
                  href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                >
                  <article className="group relative h-full p-5 sm:p-6 rounded-xl bg-asphalt text-shell hover:bg-teal transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30 cursor-pointer">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-shell/40 group-hover:text-gator-orange group-hover:translate-x-1 transition-all" strokeWidth={2.4} />
                    </div>
                    <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell">
                      {city}
                    </h3>
                    <p className="mt-1 text-shell/60 text-xs font-mono uppercase tracking-[0.18em]">
                      Gator Country
                    </p>
                  </article>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 sm:mt-14 text-center">
            <p className="text-asphalt/70 text-sm sm:text-base">
              Not on the list?{" "}
              <a href="tel:+12392343061" className="text-asphalt font-black border-b-2 border-gator-orange hover:text-teal transition-colors">
                Call us
              </a>{" "}
              — we travel for the right job.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTRACTOR PARTNERSHIP — a contractor's first call ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-16 sm:py-24 lg:py-32">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gator-orange/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <GatorScales className="absolute inset-0 w-full h-full text-shell/[0.03] pointer-events-none" />

        <div ref={tradeReveal} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-14 sm:mb-20">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              Trade Partners
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              A Contractor's<br />
              <span className="text-gator-orange">First Call.</span>
            </h2>
            <p className="mt-6 text-shell/75 text-base sm:text-lg leading-[1.6] max-w-xl mx-auto">
              We extend your crew without extending your liability. Job-site ready work, fast turnaround, partner pricing for steady rotation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-14">
            {[
              { icon: Clock, label: "Fast Turnaround", desc: "Same-day and next-day availability on most services — your build timeline stays intact." },
              { icon: Shield, label: "Licensed & Insured", desc: "We show up when we say we will. Insured and OSHA-aware so your liability stays clean." },
              { icon: DollarSign, label: "Partner Pricing", desc: "Volume rates and priority scheduling for trade partners on regular rotation." },
              { icon: PhoneCall, label: "Direct Line", desc: "Trade partners reach our crew leads directly — no queue, no triage, no runaround." },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-gator-orange flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Icon className="w-6 h-6 text-asphalt" strokeWidth={2.4} />
                </div>
                <div className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-2">
                  {label}
                </div>
                <div className="text-shell/65 text-sm leading-[1.6]">{desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/estimate">
              <button
                data-testid="contractor-cta-partner"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] transition-all shadow-lg shadow-black/40"
              >
                Become a Trade Partner
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
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
