import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  Truck, HardHat, PhoneCall, CheckCircle2,
  ArrowRight, MapPin, Clock, Shield, ChevronRight,
  FileText, DollarSign, Search, Facebook, Instagram, Twitter,
  Hammer, TreePine, Users, Handshake, Wrench
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
    <div className="min-h-screen bg-background text-foreground pb-[calc(68px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain" />
            <span className="font-black text-xl tracking-tight text-foreground">Clear Gator</span>
          </div>
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

      <section className="relative overflow-hidden bg-gator-slate min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-construction.png')",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <img src={logoImg} alt="Clear Gator Logo" className="h-24 w-24 object-contain drop-shadow-2xl" />
              <div>
                <Badge className="bg-gator-orange/20 text-gator-orange-light border-gator-orange/40 font-semibold mb-1">
                  Southwest Florida · Licensed &amp; Insured
                </Badge>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-gator-orange-light" />
                  <span>Cape Coral · Naples · Fort Myers · Southwest Florida</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-4 tracking-tight">
              We Clear the Way.{" "}
              <span className="text-gator-orange-light relative">
                You Build the Future.
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,2 Q50,0 100,2" stroke="hsl(30 100% 62% / 0.5)" strokeWidth="2" fill="none"/>
                </svg>
              </span>
            </h1>
            <div className="text-gator-orange-light font-black tracking-wide text-xl sm:text-2xl uppercase mb-6">
              Let's Gator Done.
            </div>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl">
              Demo, hauling, site cleanup, lot clearing, and handyman services (including painting) for Southwest Florida — done right, done safe, done on time.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/estimate">
                <Button
                  size="lg"
                  className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-xl shadow-gator-orange/25 gap-2 text-base px-8"
                  data-testid="hero-cta-estimate"
                >
                  Get a Free Estimate <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+12392343061" data-testid="hero-cta-call">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-base px-8 gap-2"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call (239) 234-3061
                </Button>
              </a>
              <Link href="/track">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 text-base px-6"
                  data-testid="hero-cta-track"
                >
                  Track My Job
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Clock, text: "Same-Day Service" },
                { icon: CheckCircle2, text: "Satisfaction Guaranteed" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/65 text-sm">
                  <Icon className="w-4 h-4 text-gator-orange-light flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(215_16%_14%)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="border-l-2 border-primary pl-5 py-2">
                <div className="text-3xl font-black text-gator-orange-light leading-none mb-1">{value}</div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 font-semibold">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Built Tough. Done Right.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              From non-structural demo to full site cleanup and land clearing — Clear Gator handles every stage of your project start to finish.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.title} className="group bg-card border border-card-border rounded-lg overflow-hidden hover-elevate transition-all duration-200 hover:border-primary/30 hover:shadow-lg">
                <div className={`h-1 w-full ${svc.accent}`} />
                <div className="p-7">
                  <div className={`w-14 h-14 rounded-xl ${svc.iconBg} flex items-center justify-center mb-5`}>
                    <svc.icon className={`w-7 h-7 ${svc.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{svc.title}</h3>
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

      <section id="how-it-works" className="py-24 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 font-semibold">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Getting started is fast and easy. No back-and-forth, no surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {howItWorks.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px border-t-2 border-dashed border-primary/30 z-0" />
                )}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-5xl font-black text-primary/10 dark:text-primary/15 leading-none -mt-2 mb-3 select-none">{step}</div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section id="service-areas" className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 font-semibold">Where We Work</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Serving Southwest Florida</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              From the coast to the ranch — we bring the same quality and reliability to every city we serve.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {SERVICE_AREAS.map((city) => (
              <div
                key={city}
                data-testid={`chip-city-${city.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 bg-background border border-primary/25 text-foreground rounded-full px-5 py-2.5 text-sm font-medium shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-200"
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
      <section className="py-20 bg-[hsl(215_16%_14%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-[hsl(215_16%_10%)] overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left column */}
              <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-primary/15">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-10 rounded-full bg-primary" />
                  <Badge className="bg-primary/20 text-primary-foreground border-primary/30 font-semibold text-xs">
                    Trade Partners Welcome
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-5 tracking-tight leading-snug">
                  Are You a Contractor?
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 text-sm sm:text-base">
                  We work hand-in-hand with general contractors and trade partners as a reliable extension of your crew.
                  Fast turnaround, job-site ready work, and partner-friendly rates — so cleanup and demolition never
                  hold up your schedule.
                </p>
                <Link href="/estimate">
                  <Button
                    size="lg"
                    className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-lg shadow-gator-orange/25 gap-2"
                    data-testid="contractor-cta-partner"
                  >
                    <Handshake className="w-5 h-5" />
                    Become a Partner
                  </Button>
                </Link>
              </div>

              {/* Right column */}
              <div className="p-10 lg:p-14">
                <div className="flex items-center gap-2 mb-8">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">Why Contractors Choose Us</span>
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
      <section className="py-24 bg-[hsl(215_16%_12%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px"
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 font-semibold">Ready to Start?</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
            Ready to Clear the Site?
          </h2>
          <p className="text-white/60 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            Get your free estimate in minutes. No commitment required. Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/estimate">
              <Button
                size="lg"
                className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold shadow-xl shadow-gator-orange/30 gap-2 text-base px-10"
                data-testid="footer-cta-estimate"
              >
                Get Your Free Estimate <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/track">
              <Button size="lg" variant="outline" className="border-white/25 text-white bg-white/8 hover:bg-white/15 text-base px-8">
                <Clock className="w-4 h-4 mr-2" />
                Track Existing Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(215_16%_8%)] text-white/55 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logoImg} alt="Clear Gator Logo" className="h-10 w-10 object-contain" />
                <span className="font-black text-lg text-white">Clear Gator</span>
              </div>
              <p className="text-sm leading-relaxed mb-5">Demo, hauling, site cleanup, lot clearing, and handyman services (including painting) — done right, done safe, done on time.</p>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</div>
              <ul className="space-y-2.5 text-sm">
                {services.map((s) => (
                  <li key={s.title}>
                    <Link href="/estimate" className="hover:text-white transition-colors">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Portal</div>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/estimate" className="hover:text-white transition-colors">Get a Free Estimate</Link></li>
                <li><Link href="/track" className="hover:text-white transition-colors">Track My Job</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Staff Login</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <PhoneCall className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>(239) 234-3061</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Cape Coral · Naples · Southwest Florida</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Mon–Sat, 7am–6pm</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="text-gator-orange-light font-black uppercase tracking-wide">Let's Gator Done.</span>
              <span className="text-white/30">·</span>
              <span>&copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky Call Now bar */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gator-orange shadow-[0_-4px_24px_rgba(0,0,0,0.18)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <a
          href="tel:+12392343061"
          data-testid="mobile-call-now-bar"
          className="flex items-center justify-center gap-3 hover:bg-gator-orange-dark active:bg-gator-orange-dark w-full h-[68px] text-white font-bold text-lg transition-colors"
        >
          <PhoneCall className="w-5 h-5" />
          Call Now
        </a>
      </div>
    </div>
  );
}
