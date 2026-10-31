import { Link, useRoute } from "wouter";
import {
  ArrowRight, PhoneCall, CheckCircle2, Shield, Clock, MapPin, Star,
  Hammer, Construction, Truck, HardHat, Leaf, Droplets,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useReveal } from "@/hooks/use-reveal";
import { getService } from "@/data/services";
import { SERVICE_IMAGES, FALLBACK_HERO } from "@/data/page-images";
import LeadFormCompact from "@/components/lead-form-compact";
import JsonLd, { localBusinessLd, serviceLd, faqLd, BASE_URL } from "@/components/json-ld";
import NotFound from "@/pages/not-found";
import logoImg from "@assets/clear_gator_1775663894887.png";

const ICONS = { Hammer, Construction, Truck, HardHat, Leaf, Droplets } as const;

/**
 * LandingPage (lp) — a stripped, conversion-focused per-service landing
 * meant for paid ads. No full MainNav. Lead form prominent above the fold.
 * Six-ish sections, short copy, strong CTAs. Minimal footer.
 */
export default function LpPage() {
  const [, params] = useRoute<{ slug: string }>("/lp/:slug");
  const slug = params?.slug ?? "";
  const service = getService(slug);

  usePageMeta({
    title: service ? `${service.name} in SW Florida — Clear Gator` : "Clear Gator",
    description: service?.lede ?? "",
    noindex: true,
  });

  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();

  if (!service) return <NotFound />;

  const Icon = ICONS[service.icon];
  const hero = SERVICE_IMAGES[service.slug]?.hero ?? FALLBACK_HERO;
  const topReasons = service.reasons.slice(0, 4);
  const topScope = service.scope.slice(0, 6);
  const topFaq = service.faq.slice(0, 3);

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <JsonLd id="biz" data={localBusinessLd()} />
      <JsonLd id="svc" data={serviceLd({ name: service.name, description: service.description, slug: `lp/${service.slug}` })} />
      <JsonLd id="faq" data={faqLd(topFaq)} />

      {/* ── MINIMAL AD-NAV — logo + phone only ── */}
      <header className="sticky top-0 z-50 text-shell bg-asphalt/95 backdrop-blur-sm border-b border-white/5">
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gator-orange to-transparent opacity-60" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 lg:h-28 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Clear Gator — Home">
            <img
              src={logoImg}
              alt="Clear Gator Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain transition-transform duration-300 group-hover:scale-[1.05] drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]"
            />
            <div className="hidden sm:block leading-none">
              <div className="font-display font-black text-xl lg:text-[22px] tracking-[-0.01em] text-shell uppercase">Clear Gator</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-4 h-0.5 bg-gator-orange" aria-hidden="true" />
                <span className="font-mono text-[9px] lg:text-[10px] font-black tracking-[0.28em] uppercase text-gator-orange">
                  {service.category}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+12392343061"
              className="inline-flex items-center gap-2 bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase tracking-[0.1em] rounded-md px-3 sm:px-4 h-10 sm:h-11 transition-colors shadow-[0_8px_24px_-6px_rgba(198,244,50,0.5)]"
              aria-label="Call Clear Gator at 239-234-3061"
              data-testid="lp-nav-call"
            >
              <PhoneCall className="w-4 h-4" strokeWidth={2.8} />
              <span className="hidden md:inline text-sm">(239) 234-3061</span>
              <span className="md:hidden text-sm">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO — photo-dominant, lead-form prominent ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-12 gap-x-10 gap-y-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <div className="w-6 h-6 rounded-md bg-gator-orange flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-asphalt" strokeWidth={2.4} />
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase text-white/90">
                {service.category} · SW Florida
              </span>
            </div>

            <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 text-[clamp(2.25rem,7vw,5.5rem)]">
              {service.name.split(" ")[0]}<br />
              <span className="text-gator-orange">{service.name.split(" ").slice(1).join(" ") || "Done Right."}</span>
            </h1>

            <p className="text-base sm:text-xl text-white/90 leading-[1.5] max-w-2xl mb-7 text-pretty font-medium">
              {service.lede}
            </p>

            {/* Fast facts strip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3 mb-8">
              {[
                { icon: Clock, label: "24-Hour Reply" },
                { icon: Shield, label: "Licensed & Insured" },
                { icon: MapPin, label: "Same-Week Starts" },
              ].map(({ icon: I, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm"
                >
                  <I className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" strokeWidth={2.4} />
                  <span className="text-white/90 text-xs sm:text-sm font-black uppercase tracking-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
              <a href="#request" className="flex-1 sm:flex-initial">
                <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                  Get My Free Quote
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </a>
              <a href="tel:+12392343061" className="flex-1 sm:flex-initial">
                <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                  <PhoneCall className="w-4 h-4 text-gator-orange" strokeWidth={2.4} />
                  (239) 234-3061
                </button>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gator-orange text-gator-orange" strokeWidth={0} />
                ))}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-white/80">
                Trusted across Cape Coral · Naples · Fort Myers
              </div>
            </div>
          </div>

          {/* Lead form card — right rail */}
          <div id="request" className="lg:col-span-5">
            <LeadFormCompact defaultService={service.name} surface="dark" source={`lp:${service.slug}`} />
          </div>
        </div>
      </section>

      {/* ── SCOPE HIGHLIGHTS ── */}
      <section className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r1} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-mono text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-teal mb-4">
              What You Get
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Scope<br /><span className="text-teal">In Writing.</span>
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topScope.map((s) => (
              <li
                key={s.label}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-md bg-gator-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle2 className="w-4 h-4 text-asphalt" strokeWidth={2.6} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-black uppercase text-base leading-tight tracking-tight text-shell mb-1">
                      {s.label}
                    </h3>
                    <p className="text-shell/65 text-sm leading-[1.6]">{s.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative overflow-hidden bg-asphalt text-shell py-14 sm:py-20 lg:py-24">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal/15 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={r2} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-mono text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-gator-orange mb-4">
              How It Works
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Four Steps.<br /><span className="text-gator-orange">No Surprises.</span>
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {service.process.map((p) => (
              <li
                key={p.step}
                className="relative rounded-xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 hover:bg-white/[0.06] hover:border-gator-orange/40 transition-all duration-500"
              >
                <div className="font-display font-black text-5xl text-gator-orange tracking-[-0.04em] leading-none mb-4">
                  {p.step}
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell mb-2">
                  {p.title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-shell">
        <div ref={r3} className="max-w-7xl mx-auto reveal">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-mono text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-teal mb-4">
              Why Clear Gator
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-asphalt text-balance">
              Why People<br /><span className="text-teal">Come Back.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {topReasons.map((r) => (
              <div
                key={r.title}
                className="group relative overflow-hidden rounded-xl bg-asphalt text-shell p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-asphalt/30 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-md bg-gator-orange flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <CheckCircle2 className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell mb-2">
                  {r.title}
                </h3>
                <p className="text-shell/65 text-sm leading-[1.6]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (top 3) ── */}
      <section className="relative py-14 sm:py-20 lg:py-24 bg-asphalt text-shell overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gator-orange/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="font-mono text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-gator-orange mb-4">
              Common Questions
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-shell text-balance">
              Quick<br /><span className="text-gator-orange">Answers.</span>
            </h2>
          </div>

          <ul className="space-y-4">
            {topFaq.map((f) => (
              <li
                key={f.q}
                className="rounded-xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="font-display font-black uppercase text-base sm:text-lg leading-tight tracking-tight text-shell mb-2">
                  {f.q}
                </div>
                <div className="text-shell/70 text-sm sm:text-base leading-[1.7]">{f.a}</div>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-shell/70 text-sm sm:text-base">
            More to ask?{" "}
            <a href="tel:+12392343061" className="text-shell font-black border-b-2 border-gator-orange hover:text-gator-orange transition-colors">
              Call (239) 234-3061
            </a>
            {" "}— we'll talk through your job.
          </p>
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
            <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase text-white/90">
              Free · 24-Hour Reply
            </span>
          </div>

          <h2 className="font-display font-black uppercase text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.035em] text-white text-balance mb-6">
            Let's<br />
            <span className="text-gator-orange">Clear It.</span>
          </h2>

          <p className="text-white/85 text-base sm:text-xl leading-[1.5] max-w-2xl mx-auto mb-10 font-medium">
            Written quote inside 24 hours. Same-week starts common. No commitment to ask.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <a href="#request" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                Get My Free Quote
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </a>
            <a href="tel:+12392343061" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                <PhoneCall className="w-4 h-4 text-gator-orange" strokeWidth={2.4} />
                (239) 234-3061
              </button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 mt-10 text-xs font-mono text-white/55 tracking-wide uppercase">
            <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-gator-orange" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gator-orange" /> 24h Reply</span>
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gator-orange" /> SW Florida</span>
          </div>
        </div>
      </section>

      {/* ── MINIMAL AD-LP FOOTER ── */}
      <footer className="bg-asphalt text-shell/55 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
            <span className="text-shell/50">&copy; {new Date().getFullYear()} Clear Gator Construction Services</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-shell transition-colors">Full Site</Link>
            <Link href="/privacy" className="hover:text-shell transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-shell transition-colors">Terms</Link>
            <a href={`${BASE_URL}/lp/${service.slug}`} className="font-mono tracking-[0.22em] uppercase text-shell/35 hidden sm:inline">LP · {service.slug}</a>
          </div>
        </div>
      </footer>

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
