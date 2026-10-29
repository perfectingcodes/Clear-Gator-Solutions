import { Link } from "wouter";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import MainNav from "@/components/main-nav";
import logoImg from "@assets/clear_gator_1775663894887.png";

const HERO = "/images/stock/site-sunset.jpg";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-asphalt text-shell flex flex-col">
      <MainNav />

      <main className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-teal/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute -right-24 -bottom-24 w-[480px] h-[480px] object-contain opacity-[0.06] pointer-events-none hidden md:block"
        />

        <div className="relative z-10 max-w-2xl text-center px-4 py-24 sm:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              404 · Not Found
            </span>
          </div>
          <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 text-[clamp(2.75rem,10vw,6.5rem)]">
            Page<br />
            <span className="text-gator-orange">Cleared.</span>
          </h1>
          <p className="text-white/80 text-base sm:text-xl leading-[1.5] max-w-xl mx-auto mb-10">
            The link you followed may be broken, or the page may have moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <Link href="/" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                <ArrowLeft className="w-4 h-4" strokeWidth={2.6} />
                Back Home
              </button>
            </Link>
            <Link href="/estimate" className="flex-1">
              <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
                Free Estimate
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </Link>
          </div>
        </div>
      </main>

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
