import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowLeft, PhoneCall, CheckCircle2,
  Hammer, Construction, Truck, HardHat, TreePine, Wrench,
  ShieldCheck, Clock, MapPin, ChevronRight,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getService, SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SERVICE_IMAGES } from "@/data/page-images";
import LeadFormCompact from "@/components/lead-form-compact";
import MainNav from "@/components/main-nav";
import JsonLd, { breadcrumbLd, faqLd, localBusinessLd, serviceLd, BASE_URL } from "@/components/json-ld";
import NotFound from "@/pages/not-found";
import logoImg from "@assets/clear_gator_1775663894887.png";

const ICONS = { Hammer, Construction, Truck, HardHat, TreePine, Wrench } as const;

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const slug = params?.slug ?? "";
  const service = getService(slug);

  usePageMeta({
    title: service?.title ?? "Service — Clear Gator Construction Services",
    description: service?.description ?? "",
  });

  const reveal1 = useReveal<HTMLDivElement>();
  const reveal2 = useReveal<HTMLDivElement>();
  const reveal3 = useReveal<HTMLDivElement>();
  const reveal4 = useReveal<HTMLDivElement>();
  const reveal5 = useReveal<HTMLDivElement>();

  if (!service) return <NotFound />;
  const Icon = ICONS[service.icon];
  const accentText = service.accent === "orange" ? "text-gator-orange" : "text-primary";
  const accentBg = service.accent === "orange" ? "bg-gator-orange" : "bg-primary";
  const images = SERVICE_IMAGES[service.slug];
  // Cross-link: pick 3 other services to surface at the bottom
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd id="svc" data={serviceLd({ name: service.name, description: service.description, slug: service.slug })} />
      <JsonLd id="faq" data={faqLd(service.faq)} />
      <JsonLd id="bc"  data={breadcrumbLd([
        { name: "Home",     url: BASE_URL },
        { name: "Services", url: `${BASE_URL}/services` },
        { name: service.name, url: `${BASE_URL}/services/${service.slug}` },
      ])} />

      <MainNav />

      {/* Breadcrumbs */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/#services" className="hover:text-foreground">Services</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-foreground">{service.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        {/* Brand-controlled construction photo backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.22]"
          style={{ backgroundImage: "url('/images/hero-construction.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-1/3 right-0 w-[60%] aspect-square rounded-full bg-gator-orange/[0.08] blur-3xl pointer-events-none" aria-hidden="true" />
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -bottom-16 -right-16 w-[480px] h-[480px] object-contain opacity-[0.06] pointer-events-none hidden md:block select-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange-light">{service.category}</span>
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/55">Southwest Florida</span>
            </div>

            <div className="inline-flex items-center gap-3 mb-6 px-3 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm">
              <div className={`w-6 h-6 rounded-md ${service.accent === "orange" ? "bg-gator-orange/20" : "bg-primary/20"} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${service.accent === "orange" ? "text-gator-orange-light" : "text-gator-green-light"}`} strokeWidth={2.4} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/70">Service</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-[-0.03em] mb-5 text-balance">
              {service.name}.<br />
              <span className="text-white/45">{service.lede}</span>
            </h1>

            <div className="space-y-5 text-base sm:text-lg text-white/75 leading-[1.65] mb-8 max-w-2xl">
              {service.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/estimate">
                <Button size="lg" className="bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold gap-2 px-7 h-12 rounded-md shadow-lg shadow-gator-orange/30">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+12392343061" className="inline-flex items-center gap-3 group">
                <span className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-gator-orange group-hover:border-gator-orange transition-colors">
                  <PhoneCall className="w-4 h-4 text-white" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-white/60 leading-none mb-1">Direct line</span>
                  <span className="block text-white text-lg sm:text-base font-semibold tracking-tight leading-none">(239) 234-3061</span>
                </span>
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-x-6 max-w-md border-t border-white/10 pt-5">
              {service.stats.map(({ value, label }) => (
                <div key={label}>
                  <dt className="font-display text-base font-semibold text-white tracking-tight">{value}</dt>
                  <dd className="text-white/55 text-[10px] font-mono uppercase tracking-wide mt-0.5">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <LeadFormCompact defaultService={service.name} surface="dark" source={`service:${service.slug}`} />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div ref={reveal1} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">02 / Scope</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                What's actually <br /><span className="text-muted-foreground/60">included.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                We price the scope you see here, in writing, before we start. If something turns out bigger than the walk-through showed, you'll hear from us before we go past the quote.
              </p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {service.scope.map((s) => (
              <li key={s.label} className="bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${accentBg}`} />
                  <h3 className="font-display font-bold text-base tracking-tight">{s.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65]">{s.detail}</p>
              </li>
            ))}
          </ul>

          {service.doNot && service.doNot.length > 0 && (
            <div className="mt-8 p-5 sm:p-6 rounded-lg border border-border/60 bg-muted/20">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">What we won't do</div>
              <ul className="space-y-2.5 text-sm">
                {service.doNot.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 mt-2 flex-shrink-0" />
                    <span className="text-foreground/80 leading-[1.6]">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4">Setting expectations up front is part of doing this honestly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial brand-card break */}
      <section className="relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-border/60 bg-ink">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url('/images/hero-construction.png')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" aria-hidden="true" />
            <img src={logoImg} alt="" aria-hidden="true" className="absolute -bottom-12 -right-12 w-[360px] h-[360px] object-contain opacity-[0.08] pointer-events-none hidden md:block" />

            <div className="relative grid md:grid-cols-12 gap-6 sm:gap-10 p-6 sm:p-10 lg:p-14 items-center">
              <div className="md:col-span-7">
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-gator-orange-light mb-3 sm:mb-4">
                  On the job
                </div>
                <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05] mb-4 sm:mb-6 text-balance">
                  {service.name}<br className="hidden sm:block" />
                  <span className="text-white/45"> done the Gator way</span> —<br className="hidden sm:block" />
                  every job, every time.
                </h3>
                <p className="text-white/65 text-base sm:text-lg leading-[1.65] max-w-xl">
                  Same crew. Same standards. Same write-it-down honesty — from the
                  first walk-through to the final sweep.
                </p>
              </div>
              <div className="md:col-span-5 md:pl-6 md:border-l border-white/10">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                  {service.stats.map(({ value, label }) => (
                    <div key={label} className="col-span-2 sm:col-span-1">
                      <dt className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none">{value}</dt>
                      <dd className="text-white/55 text-[10px] sm:text-[11px] font-mono uppercase tracking-wide mt-1.5">{label}</dd>
                    </div>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-white/10 mt-1">
                    <Link href="/estimate">
                      <span className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white/30 hover:border-gator-orange-light hover:text-gator-orange-light pb-0.5 transition-colors cursor-pointer">
                        Request a quote
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.4} />
                      </span>
                    </Link>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-16 sm:py-24 bg-muted/30">
        <div ref={reveal2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">03 / Process</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                How it runs.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Four steps from first call to drive-off. No back-and-forth, no surprises.
              </p>
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {service.process.map((p) => (
              <li key={p.step} className="bg-background p-6 sm:p-7 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`font-display text-3xl font-semibold tracking-[-0.04em] leading-none ${accentText}`}>{p.step}</span>
                </div>
                <div className="h-px bg-border/80" />
                <div>
                  <h3 className="font-display text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.65]">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div ref={reveal3} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">04 / Why us</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                Why people pick<br /><span className="text-muted-foreground/60">Clear Gator for this.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Specifics. Not "professionalism" and "quality" — the actual reasons customers come back.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {service.reasons.map((r) => (
              <div key={r.title} className="border border-border/70 rounded-lg p-5 sm:p-6 bg-card">
                <CheckCircle2 className={`w-5 h-5 mb-3 ${accentText}`} strokeWidth={2.2} />
                <h3 className="font-display font-bold text-base mb-2 tracking-tight">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.65]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-24 bg-muted/30">
        <div ref={reveal4} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">05 / FAQ</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] mb-10 text-balance">
            Common questions.
          </h2>
          <ul className="divide-y divide-border/70 border-y border-border/70">
            {service.faq.map((f) => (
              <li key={f.q} className="py-5">
                <div className="font-display font-bold text-base mb-2 tracking-tight">{f.q}</div>
                <div className="text-sm text-muted-foreground leading-[1.7]">{f.a}</div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Question not answered? <a href="tel:+12392343061" className="text-foreground font-semibold border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange transition-colors">Call (239) 234-3061</a> — we'll talk through your specific job.
          </p>
        </div>
      </section>

      {/* Service areas */}
      <section className="relative py-16 sm:py-24 border-y border-border/60">
        <div ref={reveal5} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-10 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">06 / Coverage</div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-balance">
                {service.name} across<br /><span className="text-muted-foreground/60">Southwest Florida.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Same crew, same standards, same accountability — wherever your project is.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`}>
                <div className="group bg-background hover:bg-muted/40 transition-colors p-5 flex items-center justify-between cursor-pointer">
                  <span className="font-display font-semibold text-sm tracking-tight">{c.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-gator-orange group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More services — cross-link to keep visitors moving */}
      <section className="relative py-16 sm:py-20 bg-muted/30 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">07 / More from Clear Gator</div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em]">
                Other things <span className="text-muted-foreground/60">we handle.</span>
              </h2>
            </div>
            <Link href="/#services" className="text-xs font-semibold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange pb-0.5 transition-colors">
              View all services →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <article className="group bg-card p-5 sm:p-6 hover:bg-foreground hover:text-background transition-colors duration-500 h-full flex flex-col cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-lg tracking-tight">{s.name}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-gator-orange-light group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-[1.6] flex-1">{s.lede}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-32 bg-ink overflow-hidden">
        <img src={logoImg} alt="" aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[560px] h-[560px] object-contain opacity-[0.05] pointer-events-none select-none hidden md:block" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logoImg} alt="Clear Gator emblem" className="h-16 w-16 mx-auto object-contain mb-6" />
          <div className="font-mono text-gator-orange-light tracking-[0.32em] text-[11px] font-medium uppercase mb-6">
            Let's Gator Done.
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.02] mb-6 text-balance">
            Ready to talk about<br /><span className="text-white/45">your {service.name.toLowerCase()} project?</span>
          </h2>
          <p className="text-white/75 mb-8 text-base sm:text-lg leading-[1.65] max-w-xl mx-auto">
            24-hour estimate turnaround. Same-week starts common. No commitment to ask.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/estimate">
              <Button size="lg" className="bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold gap-2 px-8 h-12 rounded-md shadow-lg shadow-gator-orange/30">
                Get Your Free Estimate <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+12392343061">
              <Button size="lg" variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/5 px-7 h-12 rounded-md gap-2 font-semibold">
                <PhoneCall className="w-4 h-4 text-gator-orange-light" /> (239) 234-3061
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10 text-xs font-mono text-white/45 tracking-wide uppercase">
            <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-gator-orange-light" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gator-orange-light" /> 24h Reply</span>
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gator-orange-light" /> SW Florida</span>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-white/55 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-0 items-start sm:items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
            <span>&copy; {new Date().getFullYear()} Clear Gator Construction Services</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/estimate" className="hover:text-white">Estimate</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Mobile sticky call bar */}
      <a
        href="tel:+12392343061"
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
        <span className="flex flex-col leading-tight flex-1 min-w-0">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">Tap to Call · 24h Reply</span>
          <span className="font-display text-lg font-semibold">(239) 234-3061</span>
        </span>
        <ArrowRight className="w-5 h-5 text-white/85 flex-shrink-0" strokeWidth={2.4} />
      </a>
    </div>
  );
}
