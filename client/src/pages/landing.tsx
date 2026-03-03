import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoImg from "@assets/logo_1772579467504.png";
import {
  Truck, HardHat, Building2, PhoneCall, CheckCircle2,
  ArrowRight, MapPin, Clock, Shield, Star, ChevronRight,
  FileText, DollarSign, Search, Facebook, Instagram, Twitter
} from "lucide-react";

const services = [
  {
    icon: HardHat,
    title: "Construction Cleanup",
    description: "Post-construction debris removal and site cleanup for residential and commercial projects. We leave your site clean, safe, and ready for occupancy.",
    features: ["Post-build debris removal", "Dust & material cleanup", "Final walk-through ready"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Building2,
    title: "Demolition",
    description: "Controlled interior and exterior demolition for renovation and new construction projects. Licensed, insured, and compliant with all local codes.",
    features: ["Selective demolition", "Full structural removal", "Salvage & recycling"],
    accent: "bg-gator-orange",
    iconBg: "bg-gator-orange/10",
    iconColor: "text-gator-orange",
  },
  {
    icon: Truck,
    title: "Dumpster Rentals",
    description: "Flexible dumpster rental sizes for any project. Drop-off and pickup on your schedule. No hidden fees — straightforward pricing you can count on.",
    features: ["10, 20, 30-yard containers", "Flexible rental terms", "Same-day availability"],
    accent: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "12+", label: "Years in Business" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24hr", label: "Response Time" },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "General Contractor",
    initials: "MT",
    text: "Clear Gator showed up on time, worked fast, and the site was spotless. They're my go-to for every build now.",
    rating: 5,
  },
  {
    name: "Sandra K.",
    role: "Property Developer",
    initials: "SK",
    text: "The job tracking feature is a game changer. I could see exactly what was happening on site without being there.",
    rating: 5,
  },
  {
    name: "Derek M.",
    role: "Homeowner",
    initials: "DM",
    text: "Ordered a dumpster for my kitchen reno. They delivered it exactly when they said and picked it up the next day. Flawless.",
    rating: 5,
  },
];

const howItWorks = [
  { step: "01", title: "Request a Free Estimate", desc: "Fill out our quick form with your project details and upload photos.", icon: FileText },
  { step: "02", title: "Get Your Quote", desc: "Our team reviews your project and sends a detailed estimate within 24 hours.", icon: DollarSign },
  { step: "03", title: "We Get to Work", desc: "Our crew arrives on schedule and gets the job done right the first time.", icon: HardHat },
  { step: "04", title: "Track in Real Time", desc: "Use your Job ID to monitor progress, view site photos, and see your invoice.", icon: Search },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain" />
            <span className="font-black text-xl tracking-tight text-foreground">Clear Gator</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">Services</a>
            <a href="#how-it-works" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">How It Works</a>
            <a href="#testimonials" className="hover:text-foreground px-3 py-2 rounded-md transition-colors hover:bg-muted/50">Reviews</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/track">
              <Button variant="outline" size="sm" data-testid="link-track-job" className="hidden sm:inline-flex">
                Track My Job
              </Button>
            </Link>
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
                  Florida's #1 Construction Crew
                </Badge>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-gator-orange-light" />
                  <span>Miami · Fort Lauderdale · West Palm Beach</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
              We Clear the Way.{" "}
              <span className="text-gator-orange-light relative">
                You Build the Future.
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,2 Q50,0 100,2" stroke="hsl(30 100% 62% / 0.5)" strokeWidth="2" fill="none"/>
                </svg>
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl">
              Construction cleanup, demolition, and dumpster rentals — done right, done safe, done on time. Trusted by contractors and homeowners across the region.
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
              <Link href="/track">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-base px-8"
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
              From the first swing of the sledgehammer to the final sweep of the broom, Clear Gator handles every stage of site cleanup and clearance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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

      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 font-semibold">Client Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Real feedback from the contractors and homeowners who trust us most.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-card-border rounded-lg p-7 hover-elevate hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                <div className="text-6xl leading-none text-primary/20 font-serif mb-2 select-none">"</div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gator-orange text-gator-orange" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-foreground/80">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{t.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <p className="text-sm leading-relaxed mb-5">Construction cleanup, demolition, and dumpster rentals done right, done safe, done on time.</p>
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
                <li><Link href="/estimate" className="hover:text-white transition-colors">Debris Removal</Link></li>
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
                  <span>(305) 555-0190</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Miami · Fort Lauderdale · West Palm Beach</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Mon–Sat, 7am–6pm</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
