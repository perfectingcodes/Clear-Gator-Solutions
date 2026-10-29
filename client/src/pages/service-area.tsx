import { Link, useRoute } from "wouter";
import {
  ArrowRight, PhoneCall, MapPin, ShieldCheck, Clock, ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getCity, CITIES } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { CITY_IMAGES, SERVICE_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import LeadFormCompact from "@/components/lead-form-compact";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
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
  const hero = CITY_IMAGES[city.slug]?.hero ?? FALLBACK_HERO;
  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd id="place" data={placeLd({ name: city.name, state: city.state, description: city.description, slug: city.slug })} />
      <JsonLd id="faq" data={faqLd(city.faq)} />
      <JsonLd id="bc"  data={breadcrumbLd([
        { name: "Home",          url: BASE_URL },
        { name: "Service Areas", url: `${BASE_URL}/#service-areas` },
        { name: `${city.name}, ${city.state}`, url: `${BASE_URL}/service-areas/${city.slug}` },
      ])} />

      <MainNav />

      {/* Breadcrumbs */}
      <div className="bg-asphalt text-shell/60 border-b border-asphalt/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono uppercase tracking-[0.18em] flex items-center gap-2">
          <Link href="/" className="hover:text-gator-orange transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/#service-areas" className="hover:text-gator-orange transition-colors">Service Areas</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-shell">{city.name}, {city.state}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <div className="w-6 h-6 rounded-md bg-gator-orange flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-asphalt" strokeWidth={2.4} />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
                {city.county}
              </span>
            </div>

            <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 text-[clamp(2.25rem,8vw,6rem)]">
              {city.name},<br />
              <span className="text-gator-orange">{city.state}.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/85 leading-[1.5] max-w-2xl mb-6 text-pretty">
              {city.lede}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-[1.7] mb-8 max-w-2xl">
              {city.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 max-w-xl">
              <Link href="/estimate" className="flex-1 sm:flex-initial">
                <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/30">
                  Request a Quote
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </Link>
              <a href="tel:+12392343061" className="flex-1 sm:flex-initial">
                <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                  <PhoneCall className="w-4 h-4 text-gator-orange" strokeWidth={2.4} />
                  (239) 234-3061
                </button>
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-x-6 max-w-md border-t border-white/15 pt-5">
              {city.stats.map(({ value, label }) => (
                <div key={label}>
                  <dt className="font-display font-black uppercase text-sm sm:text-base text-shell tracking-tight">{value}</dt>
                  <dd className="text-shell/55 text-[10px] font-mono uppercase tracking-wide mt-1">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <LeadFormCompact defaultLocation={`${city.name}, ${city.state}`} surface="dark" source={`city:${city.slug}`} />
          </div>
        </div>
      </section>

      {/* ── COMMON WORK ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r1} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Local Work
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              What We Run<br /><span className="text-teal">in {city.name}.</span>
            </h2>
            <p className="mt-6 text-asphalt/70 text-base sm:text-lg leading-[1.6] max-w-xl mx-auto">
              Real projects we run regularly here. If yours isn't on the list, call us — chances are we know it.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {city.commonWork.map((w) => (
              <li
                key={w.label}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-6 sm:p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle2 className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell mb-2.5">
                  {w.label}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{w.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Neighborhoods ── */}
      {city.neighborhoods.length > 0 && (
        <section className="relative py-14 sm:py-20 bg-asphalt text-shell overflow-hidden">
          <img src={logoImg} alt="" aria-hidden="true" className="absolute -right-16 -bottom-16 w-[320px] h-[320px] object-contain opacity-[0.04] pointer-events-none hidden md:block" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10">
              <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
                Neighborhoods
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.95] tracking-[-0.03em] text-shell">
                Where We're<br /><span className="text-gator-orange">On Call.</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {city.neighborhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-semibold text-shell/85 hover:border-gator-orange/40 hover:bg-white/10 transition-colors">
                  <MapPin className="w-3 h-3 text-gator-orange" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Services available ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r2} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Services Available
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Every Service<br /><span className="text-teal">Runs Here.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s) => {
              const sImg = SERVICE_IMAGES[s.slug]?.hero ?? FALLBACK_HERO;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <article className="group relative overflow-hidden rounded-xl bg-asphalt border border-asphalt/40 h-full cursor-pointer hover:border-gator-orange/50 hover:-translate-y-1 transition-all duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${sImg}')` }} aria-hidden="true" />
                      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="font-display font-black uppercase text-xl leading-tight tracking-tight text-shell">
                          {s.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 bg-asphalt text-shell">
                      <p className="text-shell/65 text-sm leading-[1.6] mb-5">{s.lede}</p>
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

      {/* ── Why us locally ── */}
      <section className="relative py-16 sm:py-24 lg:py-28 bg-asphalt text-shell overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gator-orange/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={r3} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              Why We're the {city.name} Call
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Local Advantage.<br /><span className="text-gator-orange">Local Standards.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {city.reasons.map((r) => (
              <div
                key={r.title}
                className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
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
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r4} className="max-w-4xl mx-auto reveal">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-teal mb-4">
              Frequently Asked
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              {city.name}<br /><span className="text-teal">Questions.</span>
            </h2>
          </div>

          <ul className="space-y-4">
            {city.faq.map((f) => (
              <li key={f.q} className="group rounded-xl bg-asphalt text-shell p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300">
                <div className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-2.5">
                  {f.q}
                </div>
                <div className="text-shell/70 text-sm sm:text-base leading-[1.7]">{f.a}</div>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-asphalt/70 text-sm sm:text-base">
            {city.name}-specific question?{" "}
            <a href="tel:+12392343061" className="text-asphalt font-black border-b-2 border-gator-orange hover:text-teal transition-colors">
              Call (239) 234-3061
            </a>.
          </p>
        </div>
      </section>

      {/* ── Other cities ── */}
      <section className="relative py-16 sm:py-24 bg-asphalt text-shell overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                Nearby Coverage
              </div>
              <h2 className="font-display font-black uppercase text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-shell">
                Also Working<br /><span className="text-gator-orange">In These Cities.</span>
              </h2>
            </div>
            <Link href="/#service-areas">
              <span className="inline-flex items-center gap-2 text-shell font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-1 hover:text-gator-orange transition-colors cursor-pointer">
                All Gator Country
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`}>
                  <article className="group relative h-full p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-gator-orange/50 transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-9 h-9 rounded-md bg-gator-orange flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-asphalt" strokeWidth={2.4} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-shell/40 group-hover:text-gator-orange group-hover:translate-x-1 transition-all" strokeWidth={2.4} />
                    </div>
                    <h3 className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-shell/55 text-xs font-mono uppercase tracking-[0.18em]">
                      {c.county.replace(" County", "")}
                    </p>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
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
              Project in {city.name}?
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
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gator-orange" /> {city.county}</span>
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
