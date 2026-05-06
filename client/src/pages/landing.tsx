import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { GatorScales, SectionRule, GatorMark } from "@/components/swamp-decor";
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
    icon: Hammer,
    title: "Interior Demolition",
    description: "Non-structural interior demolition for residential and commercial projects — from single-room tear-outs to full gut jobs. Structural elements always protected.",
    features: ["Floor Removal", "Cabinet Removal", "Drywall Removal", "Bathroom Demo", "Kitchen Tear Outs"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    icon: Construction,
    title: "Outdoor Demolition",
    description: "Exterior tear-downs done right — pools, sheds, fences, decks, concrete pads, and driveways. We handle the heavy lifting, the load-out, and the final grade.",
    features: ["Pool Demolition", "Shed & Fence Removal", "Concrete & Driveway", "Deck & Patio Tear-Out", "Pergola & Outbuilding"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    icon: Truck,
    title: "Hauling",
    description: "Fast, reliable haul-away for any size project. We load it, we haul it — straightforward load-and-go pricing with no hidden fees.",
    features: ["Construction Debris", "Renovation Waste", "Dump Runs", "Bulk Trash", "Post-Demo Cleanup"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: HardHat,
    title: "Site Cleanup",
    description: "Thorough cleanup for construction and renovation sites. We leave every job site spotless and ready for the next phase.",
    features: ["Post-Construction", "Jobsite Cleanup", "Final Bathroom Cleanup", "Dust & Debris"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TreePine,
    title: "Lot Clearing",
    description: "Full lot and land clearing for residential and commercial properties — from overgrown yards to abandoned property cleanouts.",
    features: ["Yard Debris Removal", "Lot Clearing", "Brush & Trash", "Abandoned Property"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
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
    <div className="min-h-screen bg-background text-foreground pb-[calc(88px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Clear Gator Logo" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
            <div className="leading-none">
              <div className="font-display font-semibold text-lg sm:text-xl tracking-[-0.02em] text-foreground">Clear Gator</div>
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
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
            <a href="tel:+12392343061" className="sm:hidden" aria-label="Call Clear Gator">
              <Button size="sm" variant="outline" className="gap-1.5 rounded-md" data-testid="header-call-icon">
                <PhoneCall className="w-3.5 h-3.5" strokeWidth={2.2} />
                Call
              </Button>
            </a>
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.16]"
          style={{ backgroundImage: "url('/images/hero-construction.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-1/3 right-0 w-[55%] aspect-square rounded-full bg-gator-orange/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Editorial brand watermark — large GatorMark anchored low-left */}
        <GatorMark
          className="absolute -bottom-12 -left-16 w-[780px] h-[208px] text-white/[0.025] pointer-events-none hidden md:block"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-14 items-center">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange-light">
                01 / Clear Gator
              </span>
              <span className="h-px w-10 bg-white/25" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/40">
                Southwest Florida
              </span>
            </div>

            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5rem] font-semibold text-white leading-[0.98] mb-7 tracking-[-0.035em] text-balance">
              We clear the way.<br />
              <span className="text-white/40">You build </span>
              <span className="relative text-white">
                what's next
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gator-orange" aria-hidden="true" />
              </span>
              <span className="text-white/40">.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/65 mb-10 leading-[1.65] max-w-xl text-pretty">
              Interior &amp; outdoor demolition, hauling, site cleanup, lot clearing, and property maintenance
              <span className="text-white/90"> — property maintenance</span>.
              Built for the coast, the canal, and everywhere in between.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-12">
              <a href="tel:+12392343061" className="group inline-flex items-center gap-3" data-testid="hero-cta-call">
                <span className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center group-hover:bg-gator-orange group-hover:border-gator-orange transition-colors">
                  <PhoneCall className="w-4 h-4 text-white" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-white/45 leading-none mb-1">
                    Direct line
                  </span>
                  <span className="block text-white text-base font-semibold tracking-tight leading-none">
                    (239) 234-3061
                  </span>
                </span>
              </a>
              <span className="hidden sm:block h-8 w-px bg-white/15" aria-hidden="true" />
              <Link href="/track">
                <button
                  className="text-white/55 hover:text-white text-sm font-medium underline underline-offset-[6px] decoration-white/20 hover:decoration-gator-orange decoration-1 transition-all"
                  data-testid="hero-cta-track"
                >
                  Track an existing job
                </button>
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-x-6 gap-y-1 max-w-md border-t border-white/10 pt-6">
              {[
                { label: "Licensed", sub: "& Insured" },
                { label: "24-Hour", sub: "Quote Reply" },
                { label: "Local", sub: "SW Florida" },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <dt className="font-display text-base font-semibold text-white tracking-tight">{label}</dt>
                  <dd className="text-white/40 text-[11px] tracking-wide font-mono uppercase mt-0.5">{sub}</dd>
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
                        <span className="flex items-center gap-3 text-gator-orange-light font-semibold">
                          <GatorMark className="w-10 h-3 text-gator-orange-light" aria-hidden="true" />
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

      <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div ref={servicesReveal} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  02 — Capabilities
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98]">
                Six disciplines.<br />
                <span className="text-muted-foreground/60">One crew.</span>
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
              <Link key={svc.title} href="/estimate">
                <article className="group relative bg-card p-7 sm:p-8 transition-all duration-500 hover:bg-foreground hover:text-background cursor-pointer overflow-hidden">
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
                    Request a quote
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-24 sm:py-32 bg-muted/30 dark:bg-muted/10">
        <div ref={howReveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  03 — Process
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-balance leading-[0.98]">
                A simple,<br />
                <span className="text-muted-foreground/60">transparent</span><br />
                handoff.
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

      {/* ── Service Areas ── */}
      <section id="service-areas" className="relative py-24 sm:py-32 border-y border-border/60">
        <div ref={areasReveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  04 — Coverage
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
                    data-testid={`chip-city-${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`group flex items-center justify-between px-5 py-4 bg-background hover:bg-muted/30 transition-colors ${
                      i < 2 ? "border-t-0" : ""
                    } ${i % 2 === 0 ? "border-l-0" : ""}`}
                  >
                    <span className="font-display font-bold text-foreground text-sm sm:text-base tracking-tight">
                      {city}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contractor Partnership ── */}
      <section className="relative py-24 sm:py-32 bg-ink overflow-hidden">
        <GatorScales className="absolute inset-0 w-full h-full text-white/5 pointer-events-none" />
        <div ref={tradeReveal} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange">
                  05 — Trade Partners
                </span>
                <SectionRule className="w-16 h-1.5 text-gator-orange/60" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-[0.98] mb-7 text-balance">
                Built to be<br />
                <span className="text-white/40">a contractor's</span><br />
                first call.
              </h2>
              <p className="text-white/55 leading-[1.65] text-base mb-9 max-w-md">
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
                    <dd className="text-white/50 text-sm leading-[1.65]">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 sm:py-40 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-gator-orange/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={ctaReveal} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <GatorMark className="w-24 h-8 mx-auto text-gator-orange-light/70 mb-6" />
          <div className="font-mono text-gator-orange-light tracking-[0.32em] text-[11px] font-medium uppercase mb-8">
            Let's Gator Done.
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-[-0.035em] leading-[0.96] mb-8 text-balance">
            Bring us the site.<br />
            <span className="text-white/40">We'll bring the crew.</span>
          </h2>
          <p className="text-white/55 mb-12 text-base sm:text-lg leading-[1.65] max-w-xl mx-auto text-balance">
            Free estimates, returned within 24 hours. No commitment. No hidden line items.
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
                <span>Locally Owned · Licensed &amp; Insured</span>
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
                    <Link href="/estimate" className="hover:text-white transition-colors">{s.title}</Link>
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
              <div className="text-sm text-white/55 leading-[1.7]">
                Cape Coral · Naples<br />
                Southwest Florida
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between text-xs">
            <div className="text-white/40">
              &copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <GatorMark className="w-16 h-5 text-gator-orange-light/60" />
              <div className="font-mono text-gator-orange-light tracking-[0.32em] text-[11px] font-medium uppercase">
                Let's Gator Done.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky Call CTA — professional gator-orange */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pt-3 pointer-events-none"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <div className="absolute inset-x-0 -top-8 bottom-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />
        <a
          href="tel:+12392343061"
          data-testid="mobile-call-now-bar"
          aria-label="Call Clear Gator at 239-234-3061"
          className="relative pointer-events-auto flex items-center gap-3 w-full h-[60px] pl-3 pr-4 rounded-full bg-gator-orange text-white shadow-[0_10px_30px_-6px_hsl(25_95%_50%_/_0.55)] ring-1 ring-gator-orange-dark/30 active:scale-[0.985] transition-transform"
        >
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/15 flex-shrink-0">
            <PhoneCall className="w-4 h-4" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight flex-1 min-w-0 text-left">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/80">
              Tap to Call · 24h Reply
            </span>
            <span className="font-display text-base font-semibold tracking-[-0.01em]">
              (239) 234-3061
            </span>
          </span>
          <ArrowRight className="w-4 h-4 text-white/75 flex-shrink-0" strokeWidth={2.2} />
        </a>
      </div>
    </div>
  );
}
