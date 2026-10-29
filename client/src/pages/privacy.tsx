import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import MainNav from "@/components/main-nav";
import { ArrowRight, PhoneCall } from "lucide-react";

const EFFECTIVE_DATE = "May 6, 2026";
const HERO = "/images/stock/blueprint.jpg";

export default function PrivacyPage() {
  usePageMeta({
    title: "Privacy Policy — Clear Gator Construction Services",
    description: "How Clear Gator Construction Services collects, uses, and protects your information.",
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
            Privacy<br />
            <span className="text-gator-orange">Policy.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-xl leading-[1.5] max-w-2xl">
            How we collect, use, and protect your information when you work with Clear Gator.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="space-y-10 text-asphalt/85 leading-[1.75]">
          <section>
            <p className="text-base sm:text-lg">
              Clear Gator Construction Services ("Clear Gator," "we," "us," or "our") respects your privacy.
              This Privacy Policy explains how we collect, use, and protect information when you visit our
              website or request services. By using our website or services, you agree to the practices below.
            </p>
          </section>

          {[
            {
              num: "01",
              title: "Information We Collect",
              body: (
                <>
                  <p className="mb-3">We may collect the following types of information:</p>
                  <ul className="list-none space-y-3">
                    {[
                      ["Contact Information", "you provide directly — name, email, phone, and project address — when you request an estimate, track a job, or contact support."],
                      ["Project Details", "including descriptions of work, photos, timelines, and service preferences."],
                      ["Site Usage Data", "automatically collected through standard web technologies: IP address, browser type, pages viewed, approximate location."],
                    ].map(([k, v]) => (
                      <li key={k} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gator-orange mt-2.5 flex-shrink-0" />
                        <span><strong className="text-asphalt">{k}</strong> {v}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              num: "02",
              title: "How We Use Your Information",
              body: (
                <>
                  <p className="mb-3">We use information to:</p>
                  <ul className="list-none space-y-3">
                    {[
                      "Respond to estimate requests and support inquiries.",
                      "Schedule, perform, and follow up on services.",
                      "Send service-related communications and occasional updates about Clear Gator.",
                      "Improve our website, services, and customer experience.",
                      "Comply with applicable laws and protect our rights.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gator-orange mt-2.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              num: "03",
              title: "How We Share Information",
              body: (
                <p>
                  We do not sell your personal information. We may share information with trusted service providers
                  who help us operate our business (hosting, communications, scheduling), and we may disclose
                  information when required by law or to protect the safety, rights, or property of Clear Gator,
                  our customers, or the public.
                </p>
              ),
            },
            {
              num: "04",
              title: "Data Retention",
              body: (
                <p>
                  We retain personal information only as long as necessary to provide our services, comply with
                  legal obligations, resolve disputes, and enforce our agreements.
                </p>
              ),
            },
            {
              num: "05",
              title: "Your Choices",
              body: (
                <p>
                  You may contact us to request access to, correction of, or deletion of your personal information.
                  You may also unsubscribe from non-essential communications at any time by replying to the message
                  or contacting us directly.
                </p>
              ),
            },
            {
              num: "06",
              title: "Security",
              body: (
                <p>
                  We use reasonable administrative, technical, and physical safeguards to protect the information
                  we collect. No system is completely secure, however, and we cannot guarantee absolute security.
                </p>
              ),
            },
            {
              num: "07",
              title: "Children's Privacy",
              body: (
                <p>
                  Our services are not directed to children under 13, and we do not knowingly collect personal
                  information from children.
                </p>
              ),
            },
            {
              num: "08",
              title: "Changes to This Policy",
              body: (
                <p>
                  We may update this Privacy Policy from time to time. The "Effective Date" above shows the latest
                  version. Continued use of our website or services after changes are posted constitutes acceptance
                  of the updated policy.
                </p>
              ),
            },
            {
              num: "09",
              title: "Contact Us",
              body: (
                <>
                  <p className="mb-4">Questions about this Privacy Policy? Reach out:</p>
                  <div className="rounded-xl bg-asphalt text-shell p-5 space-y-1">
                    <div className="font-display font-black uppercase text-base tracking-tight">Clear Gator Construction Services</div>
                    <div className="text-shell/70 text-sm">Phone: <a href="tel:+12392343061" className="text-gator-orange font-black">(239) 234-3061</a></div>
                    <div className="text-shell/70 text-sm">Service Area: Cape Coral · Naples · Southwest Florida</div>
                  </div>
                </>
              ),
            },
          ].map(({ num, title, body }) => (
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
          <Link href="/terms" className="flex-1">
            <button className="w-full h-12 px-6 rounded-md border-2 border-asphalt/20 hover:border-asphalt text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all">
              Terms &amp; Conditions
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
