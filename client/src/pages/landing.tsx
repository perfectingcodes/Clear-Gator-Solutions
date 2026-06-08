import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { GatorScales, SectionRule } from "@/components/swamp-decor";
import HeroQuoteForm from "@/components/hero-quote-form";
import { useReveal } from "@/hooks/use-reveal";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  Truck, HardHat, PhoneCall, CheckCircle2,
  ArrowRight, Clock, Shield,
  FileText, DollarSign, Search, Facebook, Instagram, Twitter,
  Hammer, TreePine, Handshake, Wrench, Construction
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
    description: "Non-structural interior demolition for residential and commercial projects — from single-room tear-outs to full gut jobs. Structural elements always protected.",
    features: ["Floor Removal", "Cabinet Removal", "Drywall Removal", "Bathroom Demo", "Kitchen Tear Outs"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    slug: "outdoor-demolition",
    icon: Construction,
    title: "Outdoor Demolition",
    description: "Exterior tear-downs done right — pools, sheds, fences, decks, concrete pads, and driveways. We handle the heavy lifting, the load-out, and the final grade.",
    features: ["Pool Demolition", "Shed & Fence Removal", "Concrete & Driveway", "Deck & Patio Tear-Out", "Pergola & Outbuilding"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    slug: "hauling",
    icon: Truck,
    title: "Hauling",
    description: "Fast, reliable haul-away for any size project. We load it, we haul it — straightforward load-and-go pricing with no hidden fees.",
    features: ["Construction Debris", "Renovation Waste", "Dump Runs", "Bulk Trash", "Post-Demo Cleanup"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "site-cleanup",
    icon: HardHat,
    title: "Site Cleanup",
    description: "Thorough cleanup for construction and renovation sites. We leave every job site spotless and ready for the next phase.",
    features: ["Post-Construction", "Jobsite Cleanup", "Final Bathroom Cleanup", "Dust & Debris"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "lot-clearing",
    icon: TreePine,
    title: "Lot Clearing",
    description: "Full lot and land clearing for residential and commercial properties — from overgrown yards to abandoned property cleanouts.",
    features: ["Yard Debris Removal", "Lot Clearing", "Brush & Trash", "Abandoned Property"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "property-maintenance",
    icon: Wrench,
    title: "Property Maintenance",
    description: "Skilled property maintenance for homes, rentals, and commercial spaces — interior and exterior painting, repairs, installs, and the standing list of small jobs that keep a property sharp.",
    features: ["Interior & Exterior Painting", "Drywall Repair", "Door & Trim Install", "Fixture Replacement", "Routine Punch Lists"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
];

const stats = [
  { value: "Licensed", label: "& Fully Insured" },
  { value: "Local", label: "Southwest Florida" },
  { value: "Free", label: "Project Estimates" },
  { value: "24hr", label: "Quote Turnaround" },
];

const howItWorks = [
  { step: "01", title: "Request a Free Estimate", desc: "Fill out our quick form with your project details and upload photos.", icon: FileText },
  { step: "02", title: "Get Your Quote", desc: "Our team reviews your project and sends a detailed estimate within 24 hours.", icon: DollarSign },
  { step: "03", title: "We Get to Work", desc: "Our crew arrives on schedule and gets the job done right the first time.", icon: HardHat },
  { step: "04", title: "Track in Real Time", desc: "Use your Job ID to monitor progress, view site photos, and see your invoice.", icon: Search },
];

export default function LandingPage() {
  usePageMeta({
    title: "Clear Gator — Demolition, Hauling & Property Maintenance in SW Florida",
    description:
      "Interior & outdoor demolition, hauling, site cleanup, lot clearing, and property maintenance for Cape Coral, Naples & Southwest Florida. Licensed & insured. Let's Gator Done. Call (239) 234-3061.",
  });

  const servicesReveal = useReveal<HTMLDivElement>();
  const howReveal = useReveal<HTMLDivElement>();
  const areasReveal = useReveal<HTMLDivElement>();
  const tradeReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
            <div className="hidden sm:block leading-none">
              <div className="font-display font-semibold text-lg sm:text-xl tracking-[-0.02em] text-foreground">Clear Gator</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                <span>Construction Services</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-gator-orange">SWFL</span>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {[
              { label: "Services", href: "#services" },
              { label: "Process", href: "#how-it-works" },
              { label: "Coverage", href: "#service-areas" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="relative text-muted-foreground hover:text-foreground transition-colors py-2 group"
              >
                {label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="tel:+12392343061"
              data-testid="header-call-now"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gator-orange transition-colors"
              aria-label="Call Clear Gator at 239-234-3061"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.2} />
              (239) 234-3061
            </a>
            <span className="hidden lg:block h-5 w-px bg-border" aria-hidden="true" />
            <Link href="/track">
              <Button
                variant="ghost"
                size="sm"
                data-testid="link-track-job"
                className="hidden sm:inline-flex text-muted-foreground hover:text-foreground hover:bg-transparent font-medium px-2"
              >
                Track Job
              </Button>
            </Link>
            <Link href="/estimate">
              <Button
                size="sm"
                className="bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-md shadow-sm"
                data-testid="link-get-estimate"
              >
                Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink-hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.22]"
          style={{ backgroundImage: "url('/images/hero-construction.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-1/3 right-0 w-[55%] aspect-square rounded-full bg-gator-orange/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Brand watermark — actual logo, low opacity, anchored bottom-right */}
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 w-[560px] h-[560px] object-contain opacity-[0.06] pointer-events-none hidden md:block select-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-10 sm:gap-y-14 items-center">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange-light">
                01 / Clear Gator
              </span>
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/50">
                SW Florida
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-semibold text-white leading-[1.02] sm:leading-[0.98] mb-6 sm:mb-7 tracking-[-0.03em] sm:tracking-[-0.035em] text-balance">
              We clear the way.<br />
              <span className="text-white/45">You build </span>
              <span className="relative text-white">
                what's next
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gator-orange" aria-hidden="true" />
              </span>
              <span className="text-white/45">.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/75 mb-8 sm:mb-10 leading-[1.6] max-w-xl text-pretty">
              Interior &amp; outdoor demolition, hauling, site cleanup, lot clearing, and property maintenance for contractors and homeowners across Southwest Florida.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-x-6 sm:gap-y-3 mb-10 sm:mb-12">
              <a href="tel:+12392343061" className="group inline-flex items-center gap-3" data-testid="hero-cta-call">
                <span className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-gator-orange group-hover:border-gator-orange transition-colors">
                  <PhoneCall className="w-4 h-4 text-white" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-white/60 leading-none mb-1">
                    Direct line
                  </span>
                  <span className="block text-white text-lg sm:text-base font-semibold tracking-tight leading-none">
                    (239) 234-3061
                  </span>
                </span>
              </a>
              <span className="hidden sm:block h-8 w-px bg-white/15" aria-hidden="true" />
              <Link href="/track">
                <button
                  className="text-white/70 hover:text-white text-sm font-semibold underline underline-offset-[6px] decoration-white/30 hover:decoration-gator-orange decoration-1 transition-all text-left"
                  data-testid="hero-cta-track"
                >
                  Track an existing job
                </button>
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-1 max-w-md border-t border-white/10 pt-5 sm:pt-6">
              {[
                { label: "Licensed", sub: "& Insured" },
                { label: "24-Hour", sub: "Quote Reply" },
                { label: "Local", sub: "SW Florida" },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <dt className="font-display text-sm sm:text-base font-semibold text-white tracking-tight">{label}</dt>
                  <dd className="text-white/55 text-[10px] sm:text-[11px] tracking-wide font-mono uppercase mt-0.5">{sub}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 xl:col-span-5">
            <HeroQuoteForm />
          </div>
        </div>

        {/* Marquee ticker — service areas + signature mark */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
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
                        <span className="flex items-center gap-2 text-gator-orange-light font-semibold">
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

      <section className="relative bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/70 md:py-2">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-1.5 py-7 sm:py-8 px-5 sm:px-7 ${i >= 2 ? "border-t md:border-t-0 border-border/70" : ""}`}
              >
                <span className="text-[10px] font-semibold tracking-[0.28em] text-muted-foreground/70 uppercase">
                  0{i + 1}
                </span>
                <div className="font-display text-xl sm:text-2xl font-bold text-foreground leading-none tracking-tight">
                  {value}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer-type trust strip — who we work with, no logos, just confidence */}
      <section className="relative bg-ink text-white py-6 sm:py-7 overflow-hidden border-b border-white/5">
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -right-8 top-1/2 -translate-y-1/2 h-32 w-32 object-contain opacity-[0.05] pointer-events-none hidden sm:block" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center">
          <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-gator-orange-light flex-shrink-0">
            Trusted by
          </div>
          <div className="overflow-hidden flex-1 -mx-4 sm:mx-0 mask-fade-x">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {[
                    "General Contractors",
                    "Custom Home Builders",
                    "Property Managers",
                    "Homeowners",
                    "Short-Term Rental Operators",
                    "Commercial Developers",
                    "Realtors",
                    "Insurance Adjusters",
                  ].map((c, i) => (
                    <span key={`${dup}-${i}`} className="flex items-center mx-5 sm:mx-7 text-white/70 text-sm sm:text-base font-display font-semibold tracking-tight">
                      {c}
                      <span className="mx-5 sm:mx-7 text-white/15">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div ref={servicesReveal} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 mb-12 sm:mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  02 / Capabilities
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98]">
                Six disciplines.<br />
                <span className="text-muted-foreground/60">One Gator crew.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.65] text-balance max-w-lg">
                From interior and outdoor demolition to ongoing property maintenance, Clear Gator handles each phase of a project with the same crew, the same standards, and the same accountability.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {services.map((svc, i) => (
              <Link key={svc.title} href={`/services/${svc.slug}`}>
                <article className="group relative bg-card p-6 sm:p-8 transition-all duration-500 hover:bg-foreground hover:text-background active:bg-foreground/95 active:text-background cursor-pointer overflow-hidden">
                  {/* hover sweep line */}
                  <span
                    className="absolute top-0 left-0 right-0 h-px bg-gator-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-11 h-11 rounded-md ${svc.iconBg} flex items-center justify-center transition-all duration-500 group-hover:bg-gator-orange/20`}>
                      <svc.icon className={`w-5 h-5 ${svc.iconColor} transition-colors duration-500 group-hover:text-gator-orange-light`} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground/50 group-hover:text-background/40 transition-colors">
                      /0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.65] mb-6 group-hover:text-background/65 transition-colors duration-500">
                    {svc.description}
                  </p>
                  <ul className="space-y-2 mb-8 text-sm">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-foreground/80 group-hover:text-background/80 transition-colors duration-500">
                        <span className="w-1 h-1 rounded-full bg-gator-orange flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold border-b border-foreground/30 group-hover:border-gator-orange-light pb-0.5 transition-all">
                    Learn more &amp; request a quote
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial pull quote — owner voice */}
      <section className="relative bg-background py-16 sm:py-28 border-y border-border/60 overflow-hidden">
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -left-12 sm:-left-20 top-1/2 -translate-y-1/2 h-48 w-48 sm:h-64 sm:w-64 object-contain opacity-[0.05] pointer-events-none select-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
              On the record
            </span>
            <span className="h-px flex-1 bg-border max-w-[120px]" />
          </div>
          <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] leading-[1.04] text-balance">
            <span aria-hidden="true" className="text-gator-orange/70 mr-1">“</span>
            In Southwest Florida, when something needs to come down, come up, or
            <span className="text-muted-foreground/60"> get hauled away</span> —
            <span className="text-gator-orange"> we want to be the call.</span>
            <span aria-hidden="true" className="text-gator-orange/70 ml-1">”</span>
          </blockquote>
          <div className="mt-8 sm:mt-10 flex items-center gap-3">
            <img src={logoImg} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
            <div className="leading-none">
              <div className="font-display text-sm font-semibold tracking-tight">Clear Gator Crew</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Cape Coral · Naples · Fort Myers</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-16 sm:py-32 bg-muted/30 dark:bg-muted/10">
        <div ref={howReveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  03 / The Gator Way
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98]">
                Four steps.<br />
                <span className="text-muted-foreground/60">No back-and-forth.</span><br />
                No surprises.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.65] text-balance max-w-lg">
                Four steps from first call to invoice. No back-and-forth, no surprises, no hidden line items.
              </p>
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {howItWorks.map(({ step, title, desc, icon: Icon }) => (
              <li key={step} className="group relative bg-background p-7 sm:p-8 flex flex-col gap-4 transition-colors duration-300 hover:bg-muted/30">
                <span
                  className="absolute top-0 left-0 right-0 h-px bg-gator-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-gator-orange tracking-[-0.04em] leading-none">
                    {step}
                  </span>
                  <Icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300" strokeWidth={2} />
                </div>
                <div className="h-px bg-border/80" />
                <div>
                  <h3 className="font-display text-lg font-bold mb-2 tracking-tight">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.65]">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The Gator Promise ── */}
      <section className="relative py-16 sm:py-32 bg-background overflow-hidden">
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -right-16 -bottom-20 w-[420px] h-[420px] object-contain opacity-[0.04] pointer-events-none select-none hidden md:block" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 mb-12 sm:mb-16 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  04 / The Gator Promise
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98]">
                Four things<br />
                <span className="text-muted-foreground/60">we stake the name on.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.65] text-balance max-w-lg">
                The bar's named after us. We don't lower it.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {[
              {
                num: "I.",
                title: "We Show Up",
                body: "We arrive when we said we would. If we can't, you hear from us before the appointment window, not after.",
              },
              {
                num: "II.",
                title: "We Quote Honest",
                body: "Written estimate, scope spelled out, dump fees included. If something turns out bigger than the walk-through showed, you hear from us before we go past the quote.",
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
              <div key={p.num} className="bg-card p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-gator-orange tracking-tight">
                    {p.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">Promise</span>
                </div>
                <div className="h-px bg-border/80" />
                <div>
                  <h3 className="font-display text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.65]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/60">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-gator-orange font-semibold">
                Let's Gator Done.
              </span>
            </div>
            <Link href="/estimate">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors cursor-pointer">
                Put us to work
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section id="service-areas" className="relative py-16 sm:py-32 border-y border-border/60">
        <div ref={areasReveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  05 / Gator Country
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98] mb-6">
                Southwest Florida,<br />
                <span className="text-muted-foreground/60">end to end.</span>
              </h2>
              <p className="text-base text-muted-foreground leading-[1.65] mb-6 max-w-md">
                Headquartered in Cape Coral. We work the entire SWFL corridor — from the islands to the ranch — with the same crew on every job.
              </p>
              <p className="text-sm text-muted-foreground">
                Not on the list?{" "}
                <a href="tel:+12392343061" className="text-foreground font-semibold border-b border-foreground/40 hover:border-gator-orange hover:text-gator-orange transition-colors">
                  Call us
                </a>{" "}
                — we travel for the right job.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid grid-cols-2 sm:grid-cols-2 divide-y divide-x divide-border/70 border border-border/70 rounded-lg overflow-hidden">
                {SERVICE_AREAS.map((city, i) => (
                  <li
                    key={city}
                    data-testid={`chip-city-${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                    className={`p-0 bg-background ${
                      i < 2 ? "border-t-0" : ""
                    } ${i % 2 === 0 ? "border-l-0" : ""}`}
                  >
                    <Link
                      href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      className="group flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors"
                    >
                      <span className="font-display font-bold text-foreground text-sm sm:text-base tracking-tight">
                        {city}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contractor Partnership ── */}
      <section className="relative py-16 sm:py-32 bg-ink overflow-hidden">
        <GatorScales className="absolute inset-0 w-full h-full text-white/5 pointer-events-none" />
        <div ref={tradeReveal} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  06 / Trade Partners
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-[0.98] mb-7 text-balance">
                Built to be<br />
                <span className="text-white/40">a contractor's</span><br />
                first call.
              </h2>
              <p className="text-white/70 leading-[1.65] text-base mb-9 max-w-md">
                We extend your crew without extending your liability. Job-site ready work,
                fast turnaround, and partner pricing for steady rotation.
              </p>
              <Link href="/estimate">
                <Button
                  size="lg"
                  className="bg-white text-ink hover:bg-white/90 font-semibold gap-2 px-7 h-12 rounded-md"
                  data-testid="contractor-cta-partner"
                >
                  Become a Trade Partner
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-7">
              <dl className="grid sm:grid-cols-2 gap-px bg-white/10 ring-1 ring-white/10 rounded-lg overflow-hidden">
                {[
                  {
                    icon: Clock,
                    label: "Fast Turnaround",
                    desc: "Same-day and next-day availability on most services — your build timeline stays intact.",
                  },
                  {
                    icon: Shield,
                    label: "Licensed & Insured",
                    desc: "We show up when we say we will. Insured and OSHA-aware so your liability stays clean.",
                  },
                  {
                    icon: DollarSign,
                    label: "Partner Pricing",
                    desc: "Volume rates and priority scheduling available for trade partners on regular rotation.",
                  },
                  {
                    icon: PhoneCall,
                    label: "Direct Line",
                    desc: "Trade partners reach our crew leads directly — no queue, no triage, no runaround.",
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-ink p-7 lg:p-8">
                    <Icon className="w-4 h-4 text-gator-orange-light mb-5" strokeWidth={2.2} />
                    <dt className="font-display text-white text-lg font-bold mb-2 tracking-tight">{label}</dt>
                    <dd className="text-white/65 text-sm leading-[1.65]">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conversion trust strip — concrete numbers right above the close ── */}
      <section className="relative py-10 sm:py-12 bg-background border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {[
              { kpi: "24 hrs", label: "Average quote turnaround" },
              { kpi: "Same week", label: "Common project start" },
              { kpi: "8 cities", label: "Southwest Florida coverage" },
              { kpi: "Insured", label: "COI sent on request" },
            ].map(({ kpi, label }) => (
              <div key={label} className="bg-card p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-gator-orange flex-shrink-0" strokeWidth={2.2} />
                <div className="leading-tight">
                  <div className="font-display text-base sm:text-lg font-bold tracking-tight">{kpi}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-20 sm:py-40 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-gator-orange/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Large brand emblem behind the headline */}
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[680px] h-[680px] object-contain opacity-[0.05] pointer-events-none select-none hidden md:block"
        />

        <div ref={ctaReveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <img
            src={logoImg}
            alt="Clear Gator emblem"
            className="h-20 w-20 mx-auto object-contain mb-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          />
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-gator-orange-light/40" aria-hidden="true" />
            <span className="font-mono text-gator-orange-light tracking-[0.32em] text-[11px] font-medium uppercase">
              Let's Gator Done.
            </span>
            <span className="h-px w-8 bg-gator-orange-light/40" aria-hidden="true" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-[-0.035em] leading-[0.96] mb-8 text-balance">
            Bring us the site.<br />
            <span className="text-white/40">We'll bring</span><br className="sm:hidden" />
            <span className="text-white/40"> the Gator crew.</span>
          </h2>
          <p className="text-white/75 mb-10 sm:mb-12 text-base sm:text-lg leading-[1.65] max-w-xl mx-auto text-balance">
            Free estimates returned within 24 hours. No commitment. No hidden line items.
            <br className="hidden sm:block" />
            <span className="text-white/55"> Just the work, done right.</span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Link href="/estimate">
              <Button
                size="lg"
                className="bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold gap-2 text-base px-8 h-12 rounded-md shadow-lg shadow-gator-orange/30"
                data-testid="footer-cta-estimate"
              >
                Request an Estimate
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+12392343061">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/5 text-base px-7 h-12 rounded-md gap-2 font-semibold"
              >
                <PhoneCall className="w-4 h-4 text-gator-orange-light" strokeWidth={2.2} />
                (239) 234-3061
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative bg-ink text-white/55 pt-20 pb-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 object-contain" />
                <div className="leading-none">
                  <div className="font-display font-semibold text-xl text-white tracking-tight">Clear Gator</div>
                  <div className="text-[9px] font-semibold tracking-[0.32em] uppercase text-white/40 mt-1.5">
                    Construction Services
                  </div>
                </div>
              </div>
              <p className="text-sm leading-[1.7] mb-5 text-white/50 max-w-md">
                Interior &amp; outdoor demolition, hauling, site cleanup, lot clearing, and property maintenance for Southwest Florida.
              </p>
              <div className="flex items-center gap-2 mb-7 font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/35">
                <span className="w-6 h-px bg-white/25" aria-hidden="true" />
                <span>Est. SW FL · Locally Owned · Licensed &amp; Insured</span>
              </div>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-md border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-7">
              <div className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-5">Services</div>
              <ul className="space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.title}>
                    <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <div className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-5">Company</div>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/estimate" className="hover:text-white transition-colors">Free Estimate</Link></li>
                <li><Link href="/track" className="hover:text-white transition-colors">Track a Job</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Staff Login</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-white/40 mb-5">Contact</div>
              <a
                href="tel:+12392343061"
                className="block group mb-4"
                aria-label="Call Clear Gator"
              >
                <div className="font-display text-2xl font-bold text-white tracking-tight leading-none group-hover:text-gator-orange-light transition-colors">
                  (239) 234-3061
                </div>
                <div className="text-xs text-white/40 mt-1">Mon–Sat, 7am–6pm</div>
              </a>
              <div className="text-sm text-white/70 leading-[1.7]">
                Cape Coral · Naples<br />
                Southwest Florida
              </div>
            </div>
          </div>
          {/* Sitemap row — services + cities for crawlability and discovery */}
          <div className="grid sm:grid-cols-2 gap-8 mb-10 pt-10 border-t border-white/10">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-4">All Services</div>
              <ul className="grid grid-cols-1 gap-y-2 text-sm text-white/70">
                {services.map((s) => (
                  <li key={s.title}>
                    <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">
                      {s.title} in SW Florida
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-4">Service Areas</div>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-white/70">
                {SERVICE_AREAS.map((city) => (
                  <li key={city}>
                    <Link
                      href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      className="hover:text-white transition-colors"
                    >
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between text-xs">
            <div className="text-white/40">
              &copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.
            </div>
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
              <div className="font-mono text-gator-orange-light tracking-[0.32em] text-[11px] font-medium uppercase">
                Let's Gator Done.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky Call CTA — solid edge-to-edge orange bar */}
      <a
        href="tel:+12392343061"
        data-testid="mobile-call-now-bar"
        aria-label="Call Clear Gator at 239-234-3061"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gator-orange text-white flex items-center gap-3.5 active:bg-gator-orange-dark transition-colors border-t border-gator-orange-dark/40"
        style={{
          paddingTop: "14px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 14px)",
          paddingLeft: "18px",
          paddingRight: "18px",
        }}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/15 flex-shrink-0">
          <PhoneCall className="w-5 h-5" strokeWidth={2.4} />
        </span>
        <span className="flex flex-col leading-tight flex-1 min-w-0 text-left">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
            Tap to Call · 24h Reply
          </span>
          <span className="font-display text-lg font-semibold tracking-[-0.01em]">
            (239) 234-3061
          </span>
        </span>
        <ArrowRight className="w-5 h-5 text-white/85 flex-shrink-0" strokeWidth={2.4} />
      </a>
    </div>
  );
}
