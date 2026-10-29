import { Link, useRoute } from "wouter";
import {
  ArrowRight, PhoneCall, CheckCircle2,
  Hammer, Construction, Truck, HardHat, Leaf, Droplets,
  ShieldCheck, Clock, MapPin, ChevronRight,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getService, SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SERVICE_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import LeadFormCompact from "@/components/lead-form-compact";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import JsonLd, { breadcrumbLd, faqLd, localBusinessLd, serviceLd, BASE_URL } from "@/components/json-ld";
import NotFound from "@/pages/not-found";
import logoImg from "@assets/clear_gator_1775663894887.png";

const ICONS = { Hammer, Construction, Truck, HardHat, Leaf, Droplets } as const;

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
  const hero = SERVICE_IMAGES[service.slug]?.hero ?? FALLBACK_HERO;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
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
      <div className="bg-asphalt text-shell/60 border-b border-asphalt/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono uppercase tracking-[0.18em] flex items-center gap-2">
          <Link href="/" className="hover:text-gator-orange transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/#services" className="hover:text-gator-orange transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-shell">{service.name}</span>
        </div>
      </div>

      {/* ── HERO — photo-dominant ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
              <div className="w-7 h-7 rounded-md bg-gator-orange flex items-center justify-center">
                <Icon className="w-4 h-4 text-asphalt" strokeWidth={2.6} />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase text-white/90">
                {service.category}
              </span>
            </div>

            <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-5 text-[clamp(2.25rem,7vw,5rem)]">
              {service.name.split(" ")[0]}<br />
              <span className="text-gator-orange">{service.name.split(" ").slice(1).join(" ") || "Done Right."}</span>
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-[1.5] max-w-xl mb-7 text-pretty">
              {service.lede}
            </p>

            {/* Prominent contact CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl">
              <a href="tel:+12392343061" className="flex-1">
                <button className="w-full h-14 px-6 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                  <PhoneCall className="w-5 h-5" strokeWidth={2.6} />
                  (239) 234-3061
                </button>
              </a>
              <Link href="/estimate" className="flex-1">
                <button className="w-full h-14 px-6 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                  Request a Quote
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> 24h Reply</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> SW Florida</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LeadFormCompact defaultService={service.name} surface="dark" source={`service:${service.slug}`} />
          </div>
        </div>
      </section>

      {/* ── Intro — moved below the hero so hero stays simple ── */}
      {service.intro.length > 0 && (
        <section className="relative py-10 sm:py-14 bg-shell border-b border-asphalt/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-asphalt/80 leading-[1.75] text-base sm:text-lg">
            {service.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>
      )}

      {/* ── SCOPE — what's actually included ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={reveal1} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              What's Included
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Scope,<br /><span className="text-teal">in Writing.</span>
            </h2>
            <p className="mt-6 text-asphalt/70 text-base sm:text-lg leading-[1.6] max-w-xl mx-auto">
              We price what you see here, line by line, before we start. If something turns out bigger than the walk-through, you'll hear from us before we go past the quote.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {service.scope.map((s) => (
              <li
                key={s.label}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30"
              >
                <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle2 className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell mb-2.5">
                  {s.label}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{s.detail}</p>
              </li>
            ))}
          </ul>

          {service.doNot && service.doNot.length > 0 && (
            <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-xl border border-asphalt/15 bg-asphalt/5">
              <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-teal mb-4">
                What We Won't Do
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {service.doNot.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gator-orange mt-2 flex-shrink-0" />
                    <span className="text-asphalt/80 leading-[1.6]">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-asphalt/60 mt-5">Setting expectations up front is part of doing this honestly.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-16 sm:py-24 lg:py-28">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <img src={logoImg} alt="" aria-hidden="true" className="absolute -right-20 bottom-0 w-[400px] h-[400px] object-contain opacity-[0.04] pointer-events-none hidden md:block" />

        <div ref={reveal2} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              The Process
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              How It Runs.<br /><span className="text-gator-orange">Four Steps.</span>
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {service.process.map((p) => (
              <li
                key={p.step}
                className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display font-black text-5xl text-gator-orange tracking-[-0.04em] leading-none">
                    {p.step}
                  </span>
                </div>
                <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell mb-2.5">
                  {p.title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={reveal3} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Why Clear Gator
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Why People<br /><span className="text-teal">Come Back.</span>
            </h2>
            <p className="mt-6 text-asphalt/70 text-base sm:text-lg leading-[1.6] max-w-xl mx-auto">
              Specifics — not "professionalism" or "quality" — the actual reasons customers rebook.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {service.reasons.map((r) => (
              <div
                key={r.title}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-gator-orange flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <CheckCircle2 className="w-6 h-6 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-lg sm:text-xl leading-tight tracking-tight text-shell mb-2.5">
                  {r.title}
                </h3>
                <p className="text-shell/65 text-sm sm:text-base leading-[1.6]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 bg-asphalt text-shell overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gator-orange/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={reveal4} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              Frequently Asked
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Common<br /><span className="text-gator-orange">Questions.</span>
            </h2>
          </div>

          <ul className="space-y-4">
            {service.faq.map((f) => (
              <li
                key={f.q}
                className="group rounded-xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-300"
              >
                <div className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-2.5">
                  {f.q}
                </div>
                <div className="text-shell/70 text-sm sm:text-base leading-[1.7]">{f.a}</div>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-shell/70 text-sm sm:text-base">
            Not answered?{" "}
            <a href="tel:+12392343061" className="text-shell font-black border-b-2 border-gator-orange hover:text-gator-orange transition-colors">
              Call (239) 234-3061
            </a>{" "}
            — we'll talk through your job.
          </p>
        </div>
      </section>

      {/* ── Coverage: service areas ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={reveal5} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Where We Work
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              {service.name}<br /><span className="text-teal">Across SW Florida.</span>
            </h2>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`}>
                  <article className="group relative h-full p-5 rounded-xl bg-asphalt text-shell hover:bg-teal transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-9 h-9 rounded-md bg-gator-orange flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-asphalt" strokeWidth={2.4} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-shell/40 group-hover:text-gator-orange group-hover:translate-x-1 transition-all" strokeWidth={2.4} />
                    </div>
                    <h3 className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell">
                      {c.name}
                    </h3>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Other services ── */}
      <section className="relative py-16 sm:py-24 bg-asphalt text-shell overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                More from Clear Gator
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-shell">
                Other Things<br /><span className="text-gator-orange">We Handle.</span>
              </h2>
            </div>
            <Link href="/#services">
              <span className="inline-flex items-center gap-2 text-shell font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-1 hover:text-gator-orange transition-colors cursor-pointer">
                All Services
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {otherServices.map((s) => {
              const sImg = SERVICE_IMAGES[s.slug]?.hero ?? FALLBACK_HERO;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <article className="group relative overflow-hidden rounded-xl bg-asphalt border border-white/10 h-full cursor-pointer hover:border-gator-orange/50 hover:-translate-y-1 transition-all duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${sImg}')` }} aria-hidden="true" />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="font-display font-black uppercase text-xl leading-tight tracking-tight text-shell">
                          {s.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="text-shell/70 text-sm leading-[1.6] mb-5">{s.lede}</p>
                      <span className="inline-flex items-center gap-2 text-gator-orange font-black uppercase text-xs tracking-[0.18em] group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/85 via-asphalt/70 to-teal/70" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Ready when you are
            </span>
          </div>

          <h2 className="font-display font-black uppercase text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.035em] text-white text-balance mb-6">
            Let's<br />
            <span className="text-gator-orange">Clear It.</span>
          </h2>

          <p className="text-white/80 text-base sm:text-xl leading-[1.5] max-w-2xl mx-auto mb-10">
            24-hour estimate turnaround. Same-week starts common. No commitment to ask.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <Link href="/estimate" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                Get a Free Estimate
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
            <a href="tel:+12392343061" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                <PhoneCall className="w-4 h-4 text-gator-orange" strokeWidth={2.4} />
                (239) 234-3061
              </button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 mt-10 text-xs font-mono text-white/55 tracking-wide uppercase">
            <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-gator-orange" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gator-orange" /> 24h Reply</span>
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gator-orange" /> SW Florida</span>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile sticky call bar */}
      <a
        href="tel:+12392343061"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gator-orange text-asphalt flex items-center gap-3.5 active:bg-gator-orange-dark transition-colors border-t border-gator-orange-dark/40"
        style={{ paddingTop: "14px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 14px)", paddingLeft: "18px", paddingRight: "18px" }}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-asphalt/15 flex-shrink-0">
          <PhoneCall className="w-5 h-5" strokeWidth={2.4} />
        </span>
        <span className="flex flex-col leading-tight flex-1 min-w-0">
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-asphalt/85">Tap to Call · 24h Reply</span>
          <span className="font-display text-lg font-black">(239) 234-3061</span>
        </span>
        <ArrowRight className="w-5 h-5 text-asphalt/85 flex-shrink-0" strokeWidth={2.4} />
      </a>
    </div>
  );
}
