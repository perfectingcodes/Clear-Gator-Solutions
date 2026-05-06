import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePageMeta } from "@/hooks/use-page-meta";
import {
  CypressCanopy,
  PalmFrond,
  BayouDivider,
  GatorScales,
  Cattail,
  FloridaOutline,
  BrandFlourish,
} from "@/components/swamp-decor";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  Truck, HardHat, PhoneCall, CheckCircle2,
  ArrowRight, MapPin, Clock, Shield, ChevronRight,
  FileText, DollarSign, Search, Facebook, Instagram, Twitter,
  Hammer, TreePine, Users, Handshake, Wrench, Leaf, Award, Sparkles
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
    title: "Demo",
    description: "Professional interior demolition for residential and commercial projects — from single-room tear-outs to full gut jobs. Structural elements always protected.",
    features: ["Floor Removal", "Cabinet Removal", "Drywall Removal", "Bathroom Demo", "Kitchen Tear Outs"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    icon: Truck,
    title: "Hauling",
    description: "Fast, reliable haul-away for any size project. We load it, we haul it — straightforward load-and-go pricing with no hidden fees.",
    features: ["Construction Debris", "Renovation Waste", "Dump Runs", "Bulk Trash", "Post Demo Cleanup"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: HardHat,
    title: "Site Cleanup",
    description: "Thorough cleanup services for construction and renovation sites. We leave every job site spotless and ready for the next phase.",
    features: ["Post Construction", "Jobsite Cleanup", "Final Bathroom Cleanup", "Dust & Debris"],
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
    title: "Handyman Services",
    description: "Skilled handyman work for homes and businesses — from interior and exterior painting to repairs, installs, and the small jobs that keep your property sharp.",
    features: ["Interior & Exterior Painting", "Drywall Repair", "Door & Trim Install", "Fixture Replacement", "Honey-Do Lists"],
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
    title: "Clear Gator — Demo, Hauling, Site Cleanup & Handyman in SW Florida",
    description:
      "Demo, hauling, site cleanup, lot clearing, and handyman work (including painting) for Cape Coral, Naples & Southwest Florida. Licensed & insured. Let's Gator Done. Call (239) 234-3061.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(96px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-1 -mx-1 py-1">
            <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain drop-shadow-sm" />
            <div className="leading-none">
              <div className="font-display font-black text-lg sm:text-xl tracking-tight text-foreground">Clear Gator</div>
              <div className="hidden sm:block text-[9px] font-bold tracking-[0.22em] uppercase text-gator-orange mt-0.5">
                Construction Services
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">Services</a>
            <a href="#how-it-works" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">How It Works</a>
            <a href="#service-areas" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">Service Areas</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="tel:+12392343061"
              data-testid="header-call-now"
              className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Call Clear Gator at 239-234-3061"
            >
              <PhoneCall className="w-4 h-4 text-gator-orange" />
              (239) 234-3061
            </a>
            <Link href="/track">
              <Button variant="outline" size="sm" data-testid="link-track-job" className="hidden sm:inline-flex">
                Track My Job
              </Button>
            </Link>
            <a href="tel:+12392343061" className="sm:hidden" aria-label="Call Clear Gator">
              <Button size="sm" variant="outline" className="gap-1.5" data-testid="header-call-icon">
                <PhoneCall className="w-4 h-4" />
                Call
              </Button>
            </a>
            <Link href="/estimate">
              <Button size="sm" className="bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold shadow-md" data-testid="link-get-estimate">
                Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-swamp-sunset min-h-[92vh] flex items-center">
        {/* Layered atmosphere */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/images/hero-construction.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-swamp-950/95 via-swamp-900/70 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-canopy-haze" aria-hidden="true" />

        {/* Cypress canopy silhouette at the top */}
        <CypressCanopy className="absolute top-0 left-0 w-full h-32 sm:h-44 pointer-events-none" />

        {/* Subtle gator-scale texture in the right side */}
        <GatorScales className="absolute right-0 top-1/4 w-[55%] h-[55%] text-gator-green-light opacity-30 pointer-events-none hidden md:block" />

        {/* Decorative palm fronds */}
        <PalmFrond className="absolute -bottom-6 -left-8 w-56 h-56 text-gator-green/35 animate-palm-sway pointer-events-none hidden sm:block" />
        <PalmFrond
          className="absolute -bottom-10 -right-10 w-64 h-64 text-gator-green/25 animate-palm-sway pointer-events-none hidden lg:block"
          style={{ ["--palm-flip" as never]: -1, animationDelay: "1.5s" }}
        />

        {/* Cattails along the bottom edge */}
        <div className="absolute bottom-0 right-12 hidden xl:flex items-end gap-3 opacity-50 pointer-events-none">
          <Cattail className="w-6 h-44 text-moss-light" />
          <Cattail className="w-6 h-56 text-moss-light" />
          <Cattail className="w-6 h-40 text-moss-light" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gator-orange-light opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gator-orange" />
              </span>
              <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">
                Southwest Florida · Licensed &amp; Insured
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] mb-5 tracking-tight text-balance">
              We Clear the Way.
              <span className="block mt-1">
                <span className="relative inline-block text-gator-orange-light">
                  You Build the Future.
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M0,4 Q25,0 50,4 T100,4" stroke="hsl(30 100% 62%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-10 bg-gator-orange-light/60" aria-hidden="true" />
              <div className="font-display text-gator-orange-light font-extrabold tracking-[0.2em] text-base sm:text-lg uppercase">
                Let's Gator Done.
              </div>
            </div>

            <p className="text-lg text-white/75 mb-10 leading-relaxed max-w-xl text-balance">
              Demo, hauling, site cleanup, lot clearing, and handyman services
              <span className="text-white/90 font-semibold"> (including painting)</span> —
              built for Southwest Florida properties from the coast to the cypress.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/estimate">
                <Button
                  size="lg"
                  className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-xl shadow-gator-orange/30 gap-2 text-base px-8 h-12"
                  data-testid="hero-cta-estimate"
                >
                  Get a Free Estimate <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+12392343061" data-testid="hero-cta-call">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 text-base px-7 gap-2 h-12"
                >
                  <PhoneCall className="w-5 h-5 text-gator-orange-light" />
                  (239) 234-3061
                </Button>
              </a>
              <Link href="/track">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/75 hover:text-white hover:bg-white/8 text-base px-5 h-12"
                  data-testid="hero-cta-track"
                >
                  Track My Job
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              {[
                { icon: Shield, label: "Licensed", sub: "& Insured" },
                { icon: Clock, label: "24-Hour", sub: "Quote Turnaround" },
                { icon: CheckCircle2, label: "Quality", sub: "Backed Workmanship" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <Icon className="w-5 h-5 text-gator-orange-light flex-shrink-0" strokeWidth={2.2} />
                  <div>
                    <div className="text-white text-sm font-bold leading-tight">{label}</div>
                    <div className="text-white/55 text-xs leading-tight">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bayou waterline at the very bottom */}
        <BayouDivider className="absolute bottom-0 left-0 w-full h-16 text-background pointer-events-none" />
      </section>

      <section className="relative bg-background py-10 sm:py-14 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden ring-1 ring-border/60 shadow-sm">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="bg-card p-6 sm:p-7 flex flex-col gap-2 hover-elevate transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gator-orange" />
                  <span className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                    0{i + 1}
                  </span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-black text-foreground leading-none tracking-tight">{value}</div>
                <div className="text-muted-foreground text-sm leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle gator-scale watermark */}
        <GatorScales className="absolute -right-20 -top-20 w-[480px] h-[480px] text-primary/30 pointer-events-none hidden md:block" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Leaf className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Our Services</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black mb-5 tracking-tight text-balance leading-[1.05]">
              Built Tough.<br className="sm:hidden" />
              <span className="text-gator-orange"> Done Right.</span>
            </h2>
            <BrandFlourish className="w-32 h-3 mx-auto text-gator-orange/70 mb-5" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-balance">
              From non-structural demo to full site cleanup and land clearing — Clear Gator handles every stage of your project start to finish.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="group relative bg-card border border-card-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className={`h-1.5 w-full ${svc.accent}`} />
                <div className="p-7 relative">
                  <div className="absolute top-5 right-5 text-[60px] font-display font-black text-foreground/[0.03] leading-none pointer-events-none select-none">
                    {String(services.indexOf(svc) + 1).padStart(2, "0")}
                  </div>
                  <div className={`relative w-14 h-14 rounded-xl ${svc.iconBg} flex items-center justify-center mb-5 ring-1 ring-current/5`}>
                    <svc.icon className={`w-7 h-7 ${svc.iconColor}`} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{svc.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/estimate">
                    <button className={`text-sm font-semibold ${svc.iconColor} flex items-center gap-1 hover:gap-2 transition-all`}>
                      Get a Quote <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-24 sm:py-28 bg-muted/40 dark:bg-muted/10 overflow-hidden">
        <PalmFrond className="absolute -bottom-12 -right-12 w-64 h-64 text-primary/8 pointer-events-none hidden md:block" style={{ transform: "scaleX(-1) rotate(20deg)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Simple Process</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black mb-5 tracking-tight text-balance leading-[1.05]">
              How It Works
            </h2>
            <BrandFlourish className="w-32 h-3 mx-auto text-gator-orange/70 mb-5" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-balance">
              Getting started is fast and easy. No back-and-forth, no surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {howItWorks.map(({ step, title, desc, icon: Icon }, i) => (
              <div
                key={step}
                className="relative flex flex-col items-center text-center bg-background/60 backdrop-blur-sm border border-card-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px z-0" aria-hidden="true">
                    <svg viewBox="0 0 48 8" className="w-full h-2 -mt-1 text-primary/40" preserveAspectRatio="none">
                      <path d="M0,4 L42,4 M38,1 L42,4 L38,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-gator-green-dark flex items-center justify-center mb-5 shadow-lg shadow-primary/25 ring-4 ring-primary/10">
                  <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2.2} />
                </div>
                <div className="font-display text-4xl font-black text-primary/15 leading-none mb-2 select-none">{step}</div>
                <h3 className="font-display text-lg font-bold mb-2 tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section id="service-areas" className="relative py-24 sm:py-28 bg-primary/5 border-y border-primary/10 overflow-hidden">
        <FloridaOutline className="absolute right-4 top-4 w-32 h-40 text-primary/10 pointer-events-none hidden md:block" />
        <FloridaOutline className="absolute left-4 bottom-4 w-24 h-28 text-primary/8 pointer-events-none hidden md:block" style={{ transform: "scaleX(-1)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Where We Work</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black mb-5 tracking-tight text-balance leading-[1.05]">
              Serving Southwest Florida
            </h2>
            <BrandFlourish className="w-32 h-3 mx-auto text-gator-orange/70 mb-5" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-balance">
              From the coast to the cypress — we bring the same quality and reliability to every city we serve.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {SERVICE_AREAS.map((city) => (
              <div
                key={city}
                data-testid={`chip-city-${city.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 bg-background border border-primary/25 text-foreground rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {city}
              </div>
            ))}
            <div className="flex items-center gap-2 bg-muted/50 border border-dashed border-muted-foreground/30 text-muted-foreground rounded-full px-5 py-2.5 text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              &amp; Surrounding Southwest Florida
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Not sure if we cover your area?{" "}
            <a href="tel:+12392343061" className="text-primary font-semibold hover:underline">
              Give us a call
            </a>{" "}
            — we travel for the right job.
          </p>
        </div>
      </section>

      {/* ── Contractor Partnership ── */}
      <section className="relative py-24 bg-swamp overflow-hidden">
        <GatorScales className="absolute inset-0 w-full h-full text-white/5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-cypress-dark/80 to-swamp-900/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left column */}
              <div className="relative p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-primary/15">
                <PalmFrond className="absolute -bottom-8 -left-8 w-44 h-44 text-primary/10 pointer-events-none" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30">
                    <Handshake className="w-3.5 h-3.5 text-gator-green-light" />
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-gator-green-light">Trade Partners Welcome</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight leading-[1.05]">
                    Are You a <span className="text-gator-orange-light">Contractor</span>?
                  </h2>
                  <p className="text-white/65 leading-relaxed mb-8 text-base">
                    We work hand-in-hand with general contractors and trade partners as a reliable extension of your crew.
                    Fast turnaround, job-site ready work, and partner-friendly rates — so cleanup and demolition never
                    hold up your schedule.
                  </p>
                  <Link href="/estimate">
                    <Button
                      size="lg"
                      className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-lg shadow-gator-orange/30 gap-2"
                      data-testid="contractor-cta-partner"
                    >
                      <Handshake className="w-5 h-5" />
                      Become a Partner
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right column */}
              <div className="p-10 lg:p-14">
                <div className="flex items-center gap-2 mb-8">
                  <Users className="w-5 h-5 text-gator-green-light" />
                  <span className="text-white/70 text-xs font-bold uppercase tracking-[0.18em]">Why Contractors Choose Us</span>
                </div>
                <ul className="space-y-6">
                  {[
                    {
                      icon: Clock,
                      label: "Fast Turnaround",
                      desc: "Same-day and next-day availability on most services so your build timeline stays intact.",
                    },
                    {
                      icon: Shield,
                      label: "Reliable & Fully Insured",
                      desc: "We show up when we say we will — licensed, insured, and OSHA-aware so your liability stays zero.",
                    },
                    {
                      icon: DollarSign,
                      label: "Partner-Friendly Rates",
                      desc: "Volume pricing and priority scheduling available for ongoing trade partners.",
                    },
                    {
                      icon: PhoneCall,
                      label: "Dedicated Contact Line",
                      desc: "Skip the queue — partners get a direct number to reach our crew leads directly.",
                    },
                  ].map(({ icon: Icon, label, desc }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm mb-1">{label}</div>
                        <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 bg-swamp-sunset overflow-hidden">
        <CypressCanopy className="absolute top-0 left-0 w-full h-32 pointer-events-none" />
        <div className="absolute inset-0 bg-canopy-haze pointer-events-none" />
        <GatorScales className="absolute inset-0 w-full h-full text-white/4 pointer-events-none" />
        <PalmFrond className="absolute -bottom-12 -left-16 w-72 h-72 text-primary/20 animate-palm-sway pointer-events-none hidden md:block" />
        <PalmFrond className="absolute -bottom-12 -right-16 w-72 h-72 text-primary/20 animate-palm-sway pointer-events-none hidden md:block" style={{ ["--palm-flip" as never]: -1, animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-gator-orange/15 border border-gator-orange/30">
            <Sparkles className="w-3.5 h-3.5 text-gator-orange-light" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gator-orange-light">Ready to Start?</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-[1.02] text-balance">
            Ready to <span className="text-gator-orange-light">Clear the Site?</span>
          </h2>
          <BrandFlourish className="w-32 h-3 mx-auto text-gator-orange/70 mb-6" />
          <p className="text-white/70 mb-10 text-base sm:text-lg leading-relaxed max-w-xl mx-auto text-balance">
            Get your free estimate in minutes. No commitment required. Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/estimate">
              <Button
                size="lg"
                className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-xl shadow-gator-orange/40 gap-2 text-base px-10 h-12"
                data-testid="footer-cta-estimate"
              >
                Get Your Free Estimate <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+12392343061">
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 text-white bg-white/8 hover:bg-white/15 text-base px-8 h-12 gap-2"
              >
                <PhoneCall className="w-4 h-4 text-gator-orange-light" />
                (239) 234-3061
              </Button>
            </a>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 text-white/45 text-xs uppercase tracking-[0.18em] font-semibold">
            <span className="h-px w-8 bg-white/30" />
            <span>Let's Gator Done.</span>
            <span className="h-px w-8 bg-white/30" />
          </div>
        </div>
      </section>

      <footer className="relative bg-swamp-950 text-white/60 pt-20 pb-12 overflow-hidden">
        <GatorScales className="absolute inset-0 w-full h-full text-white/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 object-contain drop-shadow-md" />
                <div>
                  <div className="font-display font-black text-xl text-white tracking-tight leading-none">Clear Gator</div>
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gator-orange-light mt-0.5">Construction Services</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-white/55">
                Demo, hauling, site cleanup, lot clearing, and handyman work — done right, done safe, done on time across Southwest Florida.
              </p>
              <div className="flex gap-2.5">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-gator-orange/20 hover:border-gator-orange/40 hover:text-gator-orange-light flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-xs uppercase tracking-[0.18em]">Services</div>
              <ul className="space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.title}>
                    <Link href="/estimate" className="hover:text-gator-orange-light transition-colors">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-xs uppercase tracking-[0.18em]">Portal</div>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/estimate" className="hover:text-gator-orange-light transition-colors">Get a Free Estimate</Link></li>
                <li><Link href="/track" className="hover:text-gator-orange-light transition-colors">Track My Job</Link></li>
                <li><Link href="/admin" className="hover:text-gator-orange-light transition-colors">Staff Login</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-xs uppercase tracking-[0.18em]">Contact</div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+12392343061" className="group flex items-start gap-3 hover:text-white transition-colors">
                    <span className="w-9 h-9 rounded-lg bg-gator-orange/15 border border-gator-orange/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gator-orange/25 transition-colors">
                      <PhoneCall className="w-4 h-4 text-gator-orange-light" />
                    </span>
                    <span className="leading-tight">
                      <div className="font-bold text-white">(239) 234-3061</div>
                      <div className="text-xs text-white/45">Tap to call</div>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gator-green-light" />
                  </span>
                  <span className="leading-tight pt-1">Cape Coral · Naples · SW Florida</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gator-green-light" />
                  </span>
                  <span className="leading-tight pt-1">Mon–Sat, 7am–6pm</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-white/55">
              <span className="font-display font-black uppercase tracking-[0.2em] text-gator-orange-light">Let's Gator Done.</span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="hidden sm:inline">&copy; {new Date().getFullYear()} Clear Gator Construction Services</span>
            </div>
            <div className="flex items-center gap-5 text-white/55">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky Call CTA — refined floating bar */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pt-4 pb-3 pointer-events-none"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" />
        <a
          href="tel:+12392343061"
          data-testid="mobile-call-now-bar"
          aria-label="Call Clear Gator at 239-234-3061"
          className="relative pointer-events-auto flex items-center gap-3 w-full h-[64px] pl-3 pr-5 rounded-2xl bg-gradient-to-r from-gator-orange-dark via-gator-orange to-gator-orange-light text-white shadow-2xl shadow-gator-orange/40 overflow-hidden active:scale-[0.98] transition-transform animate-sheen"
        >
          <span className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex-shrink-0">
            <span className="absolute inset-0 rounded-xl bg-white/20 animate-ripple" aria-hidden="true" />
            <PhoneCall className="relative w-5 h-5 animate-phone-shake" strokeWidth={2.6} />
          </span>
          <span className="flex-1 min-w-0 leading-tight">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">Tap to call · 24h Quotes</span>
            <span className="font-display block text-lg font-black tracking-tight">(239) 234-3061</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex-shrink-0">
            Call <ArrowRight className="w-3 h-3" strokeWidth={3} />
          </span>
        </a>
      </div>
    </div>
  );
}
