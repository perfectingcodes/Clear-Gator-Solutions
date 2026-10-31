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

  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();

  if (!service) return <NotFound />;
  const Icon = ICONS[service.icon];
  const hero = SERVICE_IMAGES[service.slug]?.hero ?? FALLBACK_HERO;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const topScope = service.scope.slice(0, 6);
  const topFaq = service.faq.slice(0, 3);
  const topReasons = service.reasons.slice(0, 4);

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd id="svc" data={serviceLd({ name: service.name, description: service.description, slug: service.slug })} />
      <JsonLd id="faq" data={faqLd(service.faq)} />
      <JsonLd id="bc" data={breadcrumbLd([
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

      {/* ── HERO — simple, contact-focused ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-center">
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

      {/* ── BOLD STAT BAND — replaces intro paragraphs ── */}
      <section className="relative bg-asphalt text-shell border-y border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${hero}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/85 to-asphalt/60" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
          <div className="grid grid-cols-3 divide-x divide-white/15 gap-0">
            {service.stats.map(({ value, label }) => (
              <div key={label} className="px-4 sm:px-6 first:pl-0 flex flex-col gap-1">
                <div className="font-display font-black text-2xl sm:text-4xl text-gator-orange tracking-[-0.03em] leading-none">
                  {value}
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-shell/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED — asymmetric visual + compact list ── */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r1} className="max-w-7xl mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-start">
            {/* Left visual — big icon tile over photo */}
            <div className="relative lg:col-span-4 lg:sticky lg:top-24">
              <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${hero}')` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                <div className="absolute top-5 left-5 w-16 h-16 rounded-xl bg-gator-orange flex items-center justify-center shadow-lg shadow-black/40">
                  <Icon className="w-8 h-8 text-asphalt" strokeWidth={2.6} />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange mb-1.5">
                    What's Included
                  </div>
                  <div className="font-display font-black uppercase text-2xl sm:text-3xl leading-[0.95] tracking-tight text-shell">
                    Scope,<br />
                    <span className="text-gator-orange">In Writing.</span>
                  </div>
                </div>
              </div>
              {service.slug === "landscaping" && (
                <img
                  src="/images/badges/lawn-gator.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-8 -right-4 sm:-top-12 sm:-right-8 lg:-top-14 lg:-right-10 w-28 sm:w-40 lg:w-48 rotate-[-10deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
                />
              )}
            </div>

            {/* Right list — icon + label only, no long descriptions */}
            <div className="lg:col-span-8">
              <ul className="divide-y divide-asphalt/10">
                {topScope.map((s, i) => (
                  <li key={s.label} className="group flex items-start gap-4 py-4 sm:py-5">
                    <div className="w-10 h-10 rounded-md bg-asphalt text-gator-orange flex items-center justify-center flex-shrink-0 group-hover:bg-gator-orange group-hover:text-asphalt transition-colors duration-300 font-display font-black text-sm tracking-[-0.03em]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-asphalt mb-1">
                        {s.label}
                      </div>
                      <p className="text-asphalt/65 text-sm leading-[1.55]">{s.detail}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-gator-orange flex-shrink-0 mt-1.5" strokeWidth={2.4} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS — horizontal strip, 1-line each ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-12 sm:py-16">
        <div className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full bg-teal/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={r2} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-8 sm:mb-10">
            <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange mb-3">
              How It Runs
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Four Steps.<br className="sm:hidden" />
              <span className="text-gator-orange sm:ml-3">No Surprises.</span>
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {service.process.map((p) => (
              <li
                key={p.step}
                className="group relative rounded-xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 hover:bg-white/[0.08] hover:border-gator-orange/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-display font-black text-5xl text-gator-orange tracking-[-0.04em] leading-none">
                    {p.step}
                  </span>
                  <div className="w-11 h-11 rounded-md bg-gator-orange/15 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gator-orange" strokeWidth={2.6} />
                  </div>
                </div>
                <h3 className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-1.5">
                  {p.title}
                </h3>
                <p className="text-shell/60 text-[13px] leading-[1.55] line-clamp-3">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY US — 4 icon badges, no long body ── */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-shell">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-teal mb-3">
              Why Clear Gator
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Why People<br className="sm:hidden" />
              <span className="text-teal sm:ml-3">Come Back.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {topReasons.map((r) => (
              <div
                key={r.title}
                className="group relative rounded-xl bg-asphalt text-shell p-5 sm:p-6 text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/25 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-gator-orange flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-sm sm:text-base leading-tight tracking-tight text-shell mb-1.5">
                  {r.title}
                </h3>
                <p className="text-shell/60 text-xs sm:text-[13px] leading-[1.5] line-clamp-3">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — compact 3-stack ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-12 sm:py-16">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gator-orange/8 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={r3} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-8 sm:mb-10">
            <img
              src="/images/badges/faq-gator.png"
              alt=""
              aria-hidden="true"
              className="mx-auto w-32 h-32 sm:w-40 sm:h-40 object-contain mb-3 drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
            />
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Common<br className="sm:hidden" />
              <span className="text-gator-orange sm:ml-3">Questions.</span>
            </h2>
          </div>

          <ul className="space-y-3">
            {topFaq.map((f, i) => (
              <li
                key={f.q}
                className="group rounded-xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 hover:bg-white/[0.07] hover:border-gator-orange/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display font-black text-2xl text-gator-orange tracking-[-0.04em] leading-none flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-black uppercase text-base leading-tight tracking-tight text-shell mb-2">
                      {f.q}
                    </div>
                    <p className="text-shell/70 text-sm sm:text-base leading-[1.65]">{f.a}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-center text-shell/65 text-sm">
            More to ask?{" "}
            <a href="tel:+12392343061" className="text-shell font-black border-b-2 border-gator-orange hover:text-gator-orange transition-colors">
              Call (239) 234-3061
            </a>
          </p>
        </div>
      </section>

      {/* ── COVERAGE — tight pill strip ── */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-shell border-b border-asphalt/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-teal mb-1">
                Where We Work
              </div>
              <div className="font-display font-black uppercase text-xl sm:text-2xl leading-tight tracking-tight text-asphalt">
                {service.name} across SW Florida
              </div>
            </div>
            <Link href="/#service-areas">
              <span className="inline-flex items-center gap-1.5 text-asphalt font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-0.5 hover:text-teal transition-colors cursor-pointer">
                All Areas
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>

          <ul className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`}>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-asphalt text-shell hover:bg-teal transition-colors text-xs sm:text-sm font-black uppercase tracking-tight cursor-pointer">
                    <MapPin className="w-3 h-3 text-gator-orange" strokeWidth={2.6} />
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── OTHER SERVICES — compact 3-up ── */}
      <section className="relative py-12 sm:py-16 bg-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-teal mb-2">
                More from Clear Gator
              </div>
              <h2 className="font-display font-black uppercase text-xl sm:text-3xl leading-tight tracking-tight text-asphalt">
                Also handles.
              </h2>
            </div>
            <Link href="/#services">
              <span className="inline-flex items-center gap-1.5 text-asphalt font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-0.5 hover:text-teal transition-colors cursor-pointer">
                All Services
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {otherServices.map((s) => {
              const sImg = SERVICE_IMAGES[s.slug]?.hero ?? FALLBACK_HERO;
              const SIcon = ICONS[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <article className="group relative overflow-hidden rounded-xl bg-asphalt text-shell cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${sImg}')` }} aria-hidden="true" />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-asphalt/10" aria-hidden="true" />
                      <div className="absolute top-3 left-3 w-11 h-11 rounded-lg bg-gator-orange flex items-center justify-center shadow-lg shadow-black/40">
                        <SIcon className="w-5 h-5 text-asphalt" strokeWidth={2.6} />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell">
                          {s.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 sm:p-5">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">
                        {s.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gator-orange group-hover:translate-x-1 transition-transform" strokeWidth={2.6} />
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
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/85 via-asphalt/70 to-teal/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase text-white/90">
              24h Reply · Free Quote
            </span>
          </div>

          <h2 className="font-display font-black uppercase text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] tracking-[-0.035em] text-white text-balance mb-6">
            Let's<br />
            <span className="text-gator-orange">Clear It.</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-4 max-w-xl mx-auto">
            <a href="tel:+12392343061" className="flex-1">
              <button className="w-full h-14 px-6 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                <PhoneCall className="w-5 h-5" strokeWidth={2.6} />
                (239) 234-3061
              </button>
            </a>
            <Link href="/estimate" className="flex-1">
              <button className="w-full h-14 px-6 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Hidden assets reference */}
      <img src={logoImg} alt="" className="hidden" aria-hidden="true" />

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
