import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, PhoneCall, MapPin, ShieldCheck, Clock, ChevronRight,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getCity } from "@/data/cities";
import { SERVICES } from "@/data/services";
import LeadFormCompact from "@/components/lead-form-compact";
import JsonLd, { breadcrumbLd, faqLd, localBusinessLd, placeLd, BASE_URL } from "@/components/json-ld";
import NotFound from "@/pages/not-found";
import logoImg from "@assets/clear_gator_1775663894887.png";

export default function ServiceAreaPage() {
  const [, params] = useRoute<{ slug: string }>("/service-areas/:slug");
  const slug = params?.slug ?? "";
  const city = getCity(slug);

  usePageMeta({
    title: city?.title ?? "Service Area — Clear Gator Construction Services",
    description: city?.description ?? "",
  });

  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();
  const r4 = useReveal<HTMLDivElement>();

  if (!city) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd id="place" data={placeLd({ name: city.name, state: city.state, description: city.description, slug: city.slug })} />
      <JsonLd id="faq" data={faqLd(city.faq)} />
      <JsonLd id="bc"  data={breadcrumbLd([
        { name: "Home",          url: BASE_URL },
        { name: "Service Areas", url: `${BASE_URL}/#service-areas` },
        { name: `${city.name}, ${city.state}`, url: `${BASE_URL}/service-areas/${city.slug}` },
      ])} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Clear Gator — Home">
            <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-[1.04]" />
            <div className="hidden sm:block leading-none">
              <div className="font-display font-semibold text-lg sm:text-xl tracking-[-0.02em]">Clear Gator</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                <span>Construction Services</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-gator-orange">SWFL</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <a href="tel:+12392343061" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gator-orange">
              <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.2} /> (239) 234-3061
            </a>
            <Link href="/estimate">
              <Button size="sm" className="bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-md">
                Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/#service-areas" className="hover:text-foreground">Service Areas</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-foreground">{city.name}, {city.state}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute -top-1/3 right-0 w-[60%] aspect-square rounded-full bg-gator-orange/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -bottom-16 -right-16 w-[480px] h-[480px] object-contain opacity-[0.06] pointer-events-none hidden md:block select-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange-light">{city.category}</span>
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/55">{city.county}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-[-0.03em] mb-5 text-balance">
              {city.name}, {city.state}.<br /><span className="text-white/45">{city.lede}</span>
            </h1>

            <div className="space-y-5 text-base sm:text-lg text-white/75 leading-[1.65] mb-8 max-w-2xl">
              {city.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/estimate">
                <Button size="lg" className="bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold gap-2 px-7 h-12 rounded-md shadow-lg shadow-gator-orange/20">
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
              {city.stats.map(({ value, label }) => (
                <div key={label}>
                  <dt className="font-display text-base font-semibold text-white tracking-tight">{value}</dt>
                  <dd className="text-white/55 text-[10px] font-mono uppercase tracking-wide mt-0.5">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <LeadFormCompact defaultLocation={`${city.name}, ${city.state}`} surface="dark" source={`city:${city.slug}`} />
          </div>
        </div>
      </section>

      {/* Common work */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div ref={r1} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">02 / Local work</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                What we work on<br /><span className="text-muted-foreground/60">in {city.name}.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Real projects we run regularly here. If yours isn't on the list, call us — chances are we know it.
              </p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {city.commonWork.map((w) => (
              <li key={w.label} className="bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gator-orange" />
                  <h3 className="font-display font-bold text-base tracking-tight">{w.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65]">{w.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Neighborhoods */}
      {city.neighborhoods.length > 0 && (
        <section className="relative py-12 sm:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-4">Neighborhoods we cover</div>
            <div className="flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/70 text-sm font-medium">
                  <MapPin className="w-3 h-3 text-gator-orange" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services available */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div ref={r2} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">03 / Services</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                Services available<br /><span className="text-muted-foreground/60">in {city.name}.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Every Clear Gator service runs in {city.name}. Same crew, same standards, same accountability.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <article className="group bg-card p-6 hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-xl tracking-tight">{s.name}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-gator-orange-light group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-[1.65] flex-1">{s.lede}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us locally */}
      <section className="relative py-16 sm:py-24 bg-muted/30">
        <div ref={r3} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-12 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">04 / Why us here</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] text-balance">
                Why we're the<br /><span className="text-muted-foreground/60">{city.name} call.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base text-muted-foreground leading-[1.65] max-w-lg">
                Specific to your market. The general "professionalism" stuff is on the homepage.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {city.reasons.map((r) => (
              <div key={r.title} className="bg-background border border-border/70 rounded-lg p-5 sm:p-6">
                <h3 className="font-display font-bold text-base mb-2 tracking-tight">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.65]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-24">
        <div ref={r4} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">05 / FAQ</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] mb-10 text-balance">
            {city.name} questions.
          </h2>
          <ul className="divide-y divide-border/70 border-y border-border/70">
            {city.faq.map((f) => (
              <li key={f.q} className="py-5">
                <div className="font-display font-bold text-base mb-2 tracking-tight">{f.q}</div>
                <div className="text-sm text-muted-foreground leading-[1.7]">{f.a}</div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Got a {city.name}-specific question? <a href="tel:+12392343061" className="text-foreground font-semibold border-b border-foreground/30 hover:border-gator-orange hover:text-gator-orange transition-colors">Call (239) 234-3061</a>.
          </p>
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
            Project in {city.name}?<br /><span className="text-white/45">Let's talk.</span>
          </h2>
          <p className="text-white/75 mb-8 text-base sm:text-lg leading-[1.65] max-w-xl mx-auto">
            24-hour estimate turnaround. Same-week starts common. No commitment.
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
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gator-orange-light" /> {city.county}</span>
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
