import { Link, useRoute } from "wouter";
import {
  ArrowRight, PhoneCall, CheckCircle2, ChevronRight,
  Hammer, Construction, Truck, HardHat, Leaf, Droplets,
  ShieldCheck, Clock, MapPin,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getService, SERVICES } from "@/data/services";
import { getCity, CITIES } from "@/data/cities";
import { SERVICE_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import LeadFormCompact from "@/components/lead-form-compact";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import JsonLd, {
  BASE_URL,
  breadcrumbLd,
  faqLd,
  localBusinessLd,
  placeLd,
  serviceLd,
} from "@/components/json-ld";
import NotFound from "@/pages/not-found";

const ICONS = { Hammer, Construction, Truck, HardHat, Leaf, Droplets } as const;

/**
 * Service × City long-tail landing page. One per combo of 6 services × 8
 * cities = 48 total pages. Each targets "{Service} in {City}, FL" and
 * surrounding long-tail queries. Content is composed from the shared
 * service + city catalogs — no new content to write per combo.
 */
export default function ServiceInCityPage() {
  const [, params] = useRoute<{ slug: string; cityPrefixed: string }>("/services/:slug/:cityPrefixed");
  const serviceSlug = params?.slug ?? "";
  const cityPrefixed = params?.cityPrefixed ?? "";
  // The combo path shape is /services/{slug}/in-{citySlug} so Google treats
  // the city axis as a labeled segment, not a bare second slug.
  const citySlug = cityPrefixed.startsWith("in-") ? cityPrefixed.slice(3) : "";
  const service = getService(serviceSlug);
  const city = citySlug ? getCity(citySlug) : undefined;

  usePageMeta({
    title: service && city
      ? `${service.name} in ${city.name}, ${city.state} — Clear Gator`
      : "Clear Gator",
    description: service && city
      ? `Local ${service.name.toLowerCase()} in ${city.name}, ${city.state} — ${service.lede}`
      : "",
  });

  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();

  if (!service || !city) return <NotFound />;

  const Icon = ICONS[service.icon];
  const hero = SERVICE_IMAGES[service.slug]?.hero ?? FALLBACK_HERO;
  const canonical = `${BASE_URL}/services/${service.slug}/in-${city.slug}`;
  const nameInCity = `${service.name} in ${city.name}, ${city.state}`;
  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const topScope = service.scope.slice(0, 5);
  const topReasons = service.reasons.slice(0, 3);
  const combinedFaq = [...service.faq, ...city.faq].slice(0, 5);

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd
        id="svc"
        data={serviceLd({
          name: service.name,
          description: `Local ${service.name.toLowerCase()} in ${city.name}, ${city.state} by Clear Gator. ${service.lede}`,
          slug: service.slug,
          cityName: city.name,
          cityState: city.state,
          canonicalUrl: canonical,
        })}
      />
      <JsonLd id="place" data={placeLd({ name: city.name, state: city.state, description: city.description, slug: city.slug })} />
      <JsonLd id="faq" data={faqLd(combinedFaq)} />
      <JsonLd
        id="bc"
        data={breadcrumbLd([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/#services` },
          { name: service.name, url: `${BASE_URL}/services/${service.slug}` },
          { name: `${city.name}, ${city.state}`, url: canonical },
        ])}
      />

      <MainNav />

      <div className="bg-asphalt text-shell/60 border-b border-asphalt/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono uppercase tracking-[0.18em] flex items-center gap-2 overflow-x-auto">
          <Link href="/" className="hover:text-gator-orange transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/#services" className="hover:text-gator-orange transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href={`/services/${service.slug}`} className="hover:text-gator-orange transition-colors">{service.name}</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-shell">{city.name}, {city.state}</span>
        </div>
      </div>

      {/* ── HERO ── */}
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
                {service.category} · {city.county}
              </span>
            </div>

            {/* H1 carries the target keyword. Display slogan lives in a sub-div so
                search engines index the service+location phrase, not the hook. */}
            <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-5 text-[clamp(2rem,6vw,4.5rem)]">
              {service.name} in{" "}
              <span className="text-gator-orange">{city.name}, {city.state}.</span>
            </h1>
            <div className="font-display font-black uppercase text-shell/80 text-xl sm:text-2xl tracking-tight mb-6">
              {service.heroHeadline.line1} <span className="text-gator-orange">{service.heroHeadline.line2}</span>
            </div>

            <p className="text-base sm:text-lg text-white/85 leading-[1.55] max-w-xl mb-7 text-pretty">
              {service.lede} Serving {city.name} and the rest of {city.county} across {city.state === "FL" ? "Southwest Florida" : city.state}.
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
                  Free {city.name} Quote
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> 24h Reply</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} /> {city.name}, {city.state}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LeadFormCompact defaultService={service.name} surface="dark" source={`combo:${service.slug}/${city.slug}`} />
          </div>
        </div>
      </section>

      {/* ── LOCAL CONTEXT ── */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-shell border-b border-asphalt/10">
        <div ref={r1} className="max-w-6xl mx-auto reveal">
          <div className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-teal mb-3">
            Why {city.name} calls Clear Gator
          </div>
          <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.95] tracking-tight text-asphalt mb-5 text-balance">
            {service.name} that fits {city.name}, {city.state}.
          </h2>
          <div className="space-y-4 text-asphalt/80 text-sm sm:text-base leading-[1.7] max-w-3xl">
            {city.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {city.neighborhoods.length > 0 && (
            <div className="mt-6">
              <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-asphalt/60 mb-2">
                Neighborhoods we cover
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {city.neighborhoods.map((n) => (
                  <li key={n} className="px-3 py-1.5 rounded-full bg-asphalt text-shell text-xs font-black uppercase tracking-tight">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r2} className="max-w-6xl mx-auto reveal">
          <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange mb-3">
            What's included
          </div>
          <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.95] tracking-tight text-asphalt mb-6 text-balance">
            Every {service.name.toLowerCase()} job in {city.name}, in writing.
          </h2>
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
      </section>

      {/* ── WHY US ── */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-asphalt text-shell">
        <div ref={r3} className="max-w-6xl mx-auto reveal">
          <div className="font-mono text-[11px] font-black tracking-[0.3em] uppercase text-gator-orange mb-3">
            Why {city.name} picks us
          </div>
          <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.95] tracking-tight text-shell mb-6 text-balance">
            Local crew. Local calls. Local follow-through.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {topReasons.map((r) => (
              <div key={r.title} className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
                <h3 className="font-display font-black uppercase text-base sm:text-lg tracking-tight text-shell mb-1.5">
                  {r.title}
                </h3>
                <p className="text-shell/70 text-sm leading-[1.55]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS: other cities for this service ── */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-shell border-t border-asphalt/10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-teal mb-3">
            {service.name} in nearby cities
          </div>
          <ul className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/services/${service.slug}/in-${c.slug}`}>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-asphalt text-shell hover:bg-teal transition-colors text-xs sm:text-sm font-black uppercase tracking-tight cursor-pointer">
                    <MapPin className="w-3 h-3 text-gator-orange" strokeWidth={2.6} />
                    {service.name} in {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CROSS-LINKS: other services in this city ── */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-shell border-t border-asphalt/10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-teal mb-3">
            More Clear Gator work in {city.name}
          </div>
          <ul className="grid sm:grid-cols-3 gap-3">
            {otherServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/in-${city.slug}`}>
                  <article className="group block px-5 py-4 rounded-xl bg-asphalt text-shell hover:bg-teal transition-colors cursor-pointer">
                    <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60 mb-1">{s.category}</div>
                    <div className="font-display font-black uppercase text-base sm:text-lg tracking-tight text-shell">
                      {s.name} in {city.name}
                    </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/85 via-asphalt/70 to-teal/60" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3rem)] leading-[0.95] tracking-[-0.03em] text-white text-balance mb-5">
            Ready for {service.name.toLowerCase()} in {city.name}?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-7">
            24-hour reply, flat-rate pricing, licensed &amp; insured — covering {city.name} every week.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 max-w-xl mx-auto">
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
    </div>
  );
}
