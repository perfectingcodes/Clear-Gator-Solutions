import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import MainNav from "@/components/main-nav";
import { ArrowRight, PhoneCall } from "lucide-react";

const EFFECTIVE_DATE = "May 6, 2026";
const HERO = "/images/stock/home-exterior.jpg";

const SECTIONS: { num: string; title: string; body: React.ReactNode }[] = [
  {
    num: "01",
    title: "Estimates & Quotes",
    body: (
      <p>
        Estimates and quotes are provided based on the information you supply. They are good-faith
        approximations and may be revised after a site visit or upon discovery of conditions not visible
        at the time of quoting. Final pricing is confirmed in writing before work begins.
      </p>
    ),
  },
  {
    num: "02",
    title: "Scope of Work",
    body: (
      <p>
        Clear Gator performs non-structural interior and outdoor demolition, hauling, site cleanup,
        landscaping, and pressure washing. We do not perform structural demolition, electrical, plumbing,
        HVAC, or roofing work. Any work outside our scope must be coordinated with appropriately
        licensed trades.
      </p>
    ),
  },
  {
    num: "03",
    title: "Customer Responsibilities",
    body: (
      <ul className="list-none space-y-3">
        {[
          "Provide safe, legal, and reasonable access to the work site.",
          "Disclose any known hazards (asbestos, lead, mold, unmarked utilities) prior to work beginning.",
          "Secure or remove valuables and personal property from work areas.",
          "Obtain any permits or HOA approvals required for the work, unless otherwise agreed in writing.",
        ].map((t) => (
          <li key={t} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange mt-2.5 flex-shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: "04",
    title: "Payment",
    body: (
      <p>
        Unless otherwise agreed in writing, payment is due upon completion of the Services. A deposit may
        be required for larger projects. Late payments may be subject to reasonable collection costs and
        interest as permitted by Florida law.
      </p>
    ),
  },
  {
    num: "05",
    title: "Cancellations & Rescheduling",
    body: (
      <p>
        We ask for at least 24 hours' notice for cancellations or rescheduling. Same-day cancellations may
        be subject to a service-call fee to cover crew dispatch and reserved time.
      </p>
    ),
  },
  {
    num: "06",
    title: "Warranties & Disclaimers",
    body: (
      <p>
        Clear Gator performs Services in a workmanlike manner consistent with industry standards. Except
        as expressly stated in writing, the Site and Services are provided "as is" without warranties of
        any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free,
        or free of harmful components.
      </p>
    ),
  },
  {
    num: "07",
    title: "Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, Clear Gator's total liability arising out of or related
        to the Services shall not exceed the amount you paid for the specific Services giving rise to the
        claim. We are not liable for indirect, incidental, special, consequential, or punitive damages.
      </p>
    ),
  },
  {
    num: "08",
    title: "Photos & Job Documentation",
    body: (
      <p>
        We may take photos of work sites for project records, internal training, and quality control.
        Identifying details will not be shared publicly without your consent.
      </p>
    ),
  },
  {
    num: "09",
    title: "Intellectual Property",
    body: (
      <p>
        All content on the Site — including logos, text, graphics, and the Clear Gator name — is owned by
        or licensed to Clear Gator and is protected by applicable intellectual-property laws. You may not
        copy, reproduce, or use the content without our prior written permission.
      </p>
    ),
  },
  {
    num: "10",
    title: "Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law
        principles. Any dispute shall be resolved in the state or federal courts located in Lee County,
        Florida.
      </p>
    ),
  },
  {
    num: "11",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. The "Effective Date" above shows the latest version.
        Continued use of the Site or Services after changes are posted constitutes acceptance of the
        updated Terms.
      </p>
    ),
  },
  {
    num: "12",
    title: "Contact",
    body: (
      <>
        <p className="mb-4">Questions about these Terms? Reach out:</p>
        <div className="rounded-xl bg-asphalt text-shell p-5 space-y-1">
          <div className="font-display font-black uppercase text-base tracking-tight">Clear Gator Construction Services</div>
          <div className="text-shell/70 text-sm">Phone: <a href="tel:+12392343061" className="text-gator-orange font-black">(239) 234-3061</a></div>
          <div className="text-shell/70 text-sm">Service Area: Cape Coral · Naples · Southwest Florida</div>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  usePageMeta({
    title: "Terms & Conditions — Clear Gator Construction Services",
    description: "The terms and conditions that apply to use of Clear Gator's website and services.",
  });

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <MainNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/92 via-asphalt/75 to-teal/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Legal · Effective {EFFECTIVE_DATE}
            </span>
          </div>
          <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 max-w-4xl text-[clamp(2.25rem,8vw,5.5rem)]">
            Terms &amp;<br />
            <span className="text-gator-orange">Conditions.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-xl leading-[1.5] max-w-2xl">
            The rules that govern using our site and the services we deliver on your project.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-base sm:text-lg mb-10 text-asphalt/85 leading-[1.75]">
          These Terms &amp; Conditions ("Terms") govern your use of the Clear Gator Construction Services
          website ("Site") and any services we provide ("Services"). By accessing the Site, requesting an
          estimate, or engaging Clear Gator for work, you agree to these Terms. If you do not agree,
          please do not use the Site or our Services.
        </p>

        <div className="space-y-6 text-asphalt/85 leading-[1.75]">
          {SECTIONS.map(({ num, title, body }) => (
            <section key={num} className="rounded-xl bg-shell border border-asphalt/10 p-6 sm:p-7">
              <div className="flex items-start gap-5 mb-4">
                <span className="font-display font-black text-3xl text-gator-orange tracking-[-0.04em] leading-none">
                  {num}
                </span>
                <h2 className="font-display font-black uppercase text-xl sm:text-2xl leading-tight tracking-tight text-asphalt flex-1">
                  {title}
                </h2>
              </div>
              <div className="text-sm sm:text-base">{body}</div>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-asphalt/15 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/privacy" className="flex-1">
            <button className="w-full h-12 px-6 rounded-md border-2 border-asphalt/20 hover:border-asphalt text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
              Privacy Policy
            </button>
          </Link>
          <Link href="/estimate" className="flex-1">
            <button className="w-full h-12 px-6 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-gator-orange/25">
              Get a Free Estimate
              <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
            </button>
          </Link>
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
