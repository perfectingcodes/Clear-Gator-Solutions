import { Link } from "wouter";
import { Facebook, Instagram, Twitter, PhoneCall, Mail, MapPin } from "lucide-react";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import logoImg from "@assets/clear_gator_1775663894887.png";

const TAGLINE_BG = "/images/stock/site-sunset.jpg";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* ── TAGLINE BAND — photo-backed ── */}
      <div className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${TAGLINE_BG}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/92 via-asphalt/80 to-teal/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <img src={logoImg} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-white/90">
              Let's Gator Done.
            </span>
          </div>
          <div className="font-display font-black uppercase text-[clamp(2rem,6.5vw,4.75rem)] leading-[0.95] tracking-[-0.03em] text-white text-balance">
            Clear Spaces.<br />
            <span className="text-gator-orange">Brighter Tomorrows.</span>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="relative bg-asphalt text-shell/70 border-t border-white/10 pt-14 sm:pt-20 pb-10">
        <img
          src={logoImg}
          alt=""
          aria-hidden="true"
          className="absolute -right-24 -bottom-24 w-[420px] h-[420px] object-contain opacity-[0.03] pointer-events-none hidden md:block"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            {/* Brand block */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-5 group" aria-label="Clear Gator — Home">
                <img src={logoImg} alt="Clear Gator Logo" className="h-14 w-14 object-contain transition-transform group-hover:scale-105" />
                <div className="leading-none">
                  <div className="font-display font-black text-xl text-shell tracking-tight uppercase">Clear Gator</div>
                  <div className="font-mono text-[9px] font-semibold tracking-[0.22em] uppercase text-shell/50 mt-1.5">
                    Cleanup &amp; Site Reset
                  </div>
                </div>
              </Link>
              <p className="text-sm leading-[1.7] mb-6 text-shell/60 max-w-sm">
                Demolition, hauling, cleanup, landscaping &amp; pressure washing — one crew,
                one standard, for Southwest Florida.
              </p>

              <div className="flex items-center gap-2 mb-6 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-shell/50">
                <span className="w-6 h-px bg-gator-orange" />
                <span>Est. SW FL · Licensed &amp; Insured</span>
              </div>

              <div className="flex gap-2">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-md border border-white/10 bg-white/[0.02] hover:border-gator-orange hover:bg-gator-orange hover:text-asphalt text-shell/70 flex items-center justify-center transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange mb-5">
                Services
              </div>
              <ul className="space-y-2.5 text-sm">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group inline-flex items-center gap-2 text-shell/70 hover:text-shell transition-colors"
                    >
                      <span className="w-0 h-px bg-gator-orange group-hover:w-4 transition-all duration-300" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div className="lg:col-span-3">
              <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange mb-5">
                Service Areas
              </div>
              <ul className="space-y-2.5 text-sm">
                {CITIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/service-areas/${c.slug}`}
                      className="group inline-flex items-center gap-2 text-shell/70 hover:text-shell transition-colors"
                    >
                      <span className="w-0 h-px bg-gator-orange group-hover:w-4 transition-all duration-300" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <div className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-gator-orange mb-5">
                Contact
              </div>

              <a href="tel:+12392343061" className="block mb-5 group">
                <div className="flex items-center gap-2 mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.6} />
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-shell/50">Direct</span>
                </div>
                <div className="font-display text-xl font-black text-shell tracking-tight group-hover:text-gator-orange transition-colors leading-tight">
                  (239) 234-3061
                </div>
                <div className="text-xs text-shell/50 mt-1">Mon–Sat · 7a–6p</div>
              </a>

              <div className="flex items-start gap-2 text-sm text-shell/60 leading-[1.6]">
                <MapPin className="w-3.5 h-3.5 text-gator-orange flex-shrink-0 mt-0.5" strokeWidth={2.4} />
                <span>Cape Coral · Naples<br />Southwest Florida</span>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-shell/50 mb-3">
                  Quick Links
                </div>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/estimate" className="text-shell/70 hover:text-gator-orange transition-colors">Free Estimate</Link></li>
                  <li><Link href="/track" className="text-shell/70 hover:text-gator-orange transition-colors">Track a Job</Link></li>
                  <li><Link href="/privacy" className="text-shell/70 hover:text-gator-orange transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="text-shell/70 hover:text-gator-orange transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between text-xs">
            <div className="text-shell/40">
              &copy; {new Date().getFullYear()} Clear Gator Construction Services. All rights reserved.
            </div>
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
              <span className="font-mono text-gator-orange tracking-[0.3em] text-[11px] font-black uppercase">
                Let's Gator Done.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
