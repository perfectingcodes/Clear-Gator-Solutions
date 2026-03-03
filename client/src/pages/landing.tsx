import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck, HardHat, Trash2, Building2, PhoneCall, CheckCircle2,
  ArrowRight, MapPin, Clock, Shield, Star, ChevronRight
} from "lucide-react";

const services = [
  {
    icon: HardHat,
    title: "Construction Cleanup",
    description: "Post-construction debris removal and site cleanup for residential and commercial projects. We leave your site clean, safe, and ready for occupancy.",
    features: ["Post-build debris removal", "Dust & material cleanup", "Final walk-through ready"],
    color: "text-primary",
    bg: "bg-primary/10 dark:bg-primary/20",
  },
  {
    icon: Building2,
    title: "Demolition",
    description: "Controlled interior and exterior demolition for renovation and new construction projects. Licensed, insured, and compliant with all local codes.",
    features: ["Selective demolition", "Full structural removal", "Salvage & recycling"],
    color: "text-[hsl(25_95%_50%)]",
    bg: "bg-[hsl(25_95%_50%/0.1)] dark:bg-[hsl(25_95%_50%/0.15)]",
  },
  {
    icon: Truck,
    title: "Dumpster Rentals",
    description: "Flexible dumpster rental sizes for any project. Drop-off and pickup on your schedule. No hidden fees — straightforward pricing you can count on.",
    features: ["10, 20, 30-yard containers", "Flexible rental terms", "Same-day availability"],
    color: "text-primary",
    bg: "bg-primary/10 dark:bg-primary/20",
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
    text: "Clear Gator showed up on time, worked fast, and the site was spotless. They're my go-to for every build now.",
    rating: 5,
  },
  {
    name: "Sandra K.",
    role: "Property Developer",
    text: "The job tracking feature is a game changer. I could see exactly what was happening on site without being there.",
    rating: 5,
  },
  {
    name: "Derek M.",
    role: "Homeowner",
    text: "Ordered a dumpster for my kitchen reno. They delivered it exactly when they said and picked it up the next day. Flawless.",
    rating: 5,
  },
];

const howItWorks = [
  { step: "01", title: "Request a Free Estimate", desc: "Fill out our quick form with your project details and upload photos." },
  { step: "02", title: "Get Your Quote", desc: "Our team reviews your project and sends a detailed estimate within 24 hours." },
  { step: "03", title: "We Get to Work", desc: "Our crew arrives on schedule and gets the job done right the first time." },
  { step: "04", title: "Track in Real Time", desc: "Use your Job ID to monitor progress, view site photos, and see your invoice." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Clear Gator</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover-elevate rounded-md px-2 py-1 transition-colors">Services</a>
            <a href="#how-it-works" className="hover-elevate rounded-md px-2 py-1 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover-elevate rounded-md px-2 py-1 transition-colors">Reviews</a>
          </nav>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/track">
              <Button variant="outline" size="sm" data-testid="link-track-job">
                Track My Job
              </Button>
            </Link>
            <Link href="/estimate">
              <Button size="sm" className="bg-[hsl(25_95%_50%)] text-white border-[hsl(25_90%_40%)]" data-testid="link-get-estimate">
                Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gator-slate dark:bg-[hsl(215_16%_14%)] min-h-[88vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-construction.png')",
            filter: "brightness(0.35)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl animate-fade-in">
            <Badge className="mb-6 bg-[hsl(25_95%_50%/0.2)] text-[hsl(25_95%_70%)] border-[hsl(25_95%_50%/0.4)]">
              Florida's #1 Construction Cleanup Crew
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We Clear the Way.{" "}
              <span className="text-[hsl(30_100%_62%)]">You Build the Future.</span>
            </h1>
            <p className="text-lg text-white/75 mb-10 leading-relaxed">
              Construction cleanup, demolition, and dumpster rentals — done right, done safe, done on time. Trusted by contractors and homeowners across the region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/estimate">
                <Button
                  size="lg"
                  className="bg-[hsl(25_95%_50%)] text-white border-[hsl(25_90%_40%)] gap-2"
                  data-testid="hero-cta-estimate"
                >
                  Get a Free Estimate <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/track">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm"
                  data-testid="hero-cta-track"
                >
                  Track My Job
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Clock, text: "Same-Day Service Available" },
                { icon: MapPin, text: "Serving the Tri-County Area" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon className="w-4 h-4 text-[hsl(30_100%_62%)]" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-primary-foreground">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Badge className="mb-4">Our Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built Tough. Done Right.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From the first swing of the sledgehammer to the final sweep of the broom, Clear Gator handles every stage of site cleanup and clearance.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Card key={svc.title} className="hover-elevate group">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-md ${svc.bg} flex items-center justify-center mb-4`}>
                  <svc.icon className={`w-6 h-6 ${svc.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Getting started is fast and easy. No back-and-forth, no surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%-0px)] w-full h-px bg-border z-0" style={{ left: "calc(100% - 0px)", width: "100%" }} />
                )}
                <div className="relative z-10 bg-background border border-card-border rounded-md p-6">
                  <div className="text-4xl font-black text-primary/20 dark:text-primary/30 mb-3 leading-none">{step}</div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Badge className="mb-4">Reviews</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[hsl(25_95%_50%)] text-[hsl(25_95%_50%)]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-foreground/80">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Clear the Site?
          </h2>
          <p className="text-primary-foreground/70 mb-8 text-lg">
            Get your free estimate in minutes. No commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/estimate">
              <Button
                size="lg"
                className="bg-[hsl(25_95%_50%)] text-white border-[hsl(25_90%_40%)] gap-2"
                data-testid="footer-cta-estimate"
              >
                Get Your Free Estimate <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/track">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10">
                <PhoneCall className="w-4 h-4 mr-2" />
                Track Existing Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(215_16%_10%)] dark:bg-[hsl(215_16%_6%)] text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="font-bold text-white">Clear Gator</span>
              </div>
              <p className="text-sm leading-relaxed">Construction cleanup, demolition, and dumpster rentals done right.</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-3 text-sm">Services</div>
              <ul className="space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3 text-sm">Portal</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/estimate" className="hover:text-white transition-colors">Get a Free Estimate</Link></li>
                <li><Link href="/track" className="hover:text-white transition-colors">Track My Job</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Staff Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
