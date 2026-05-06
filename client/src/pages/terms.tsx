import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoImg from "@assets/clear_gator_1775663894887.png";
import { ArrowLeft } from "lucide-react";

const EFFECTIVE_DATE = "May 6, 2026";

export default function TermsPage() {
  usePageMeta({
    title: "Terms & Conditions — Clear Gator Construction Services",
    description: "The terms and conditions that apply to use of Clear Gator's website and services.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Clear Gator Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-[1.04]" />
            <div className="leading-none">
              <div className="font-display font-semibold text-lg sm:text-xl tracking-[-0.02em]">Clear Gator</div>
              <div className="hidden sm:block font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                Construction Services
              </div>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 rounded-md">
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.2} />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">
          Legal
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.02] mb-3">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-sm mb-10 font-mono">Effective {EFFECTIVE_DATE}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-foreground/85 leading-relaxed">
          <section>
            <p>
              These Terms &amp; Conditions ("Terms") govern your use of the Clear Gator Construction Services
              website ("Site") and any services we provide ("Services"). By accessing the Site, requesting an
              estimate, or engaging Clear Gator for work, you agree to these Terms. If you do not agree, please
              do not use the Site or our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Estimates &amp; Quotes</h2>
            <p>
              Estimates and quotes are provided based on the information you supply. They are good-faith
              approximations and may be revised after a site visit or upon discovery of conditions not visible
              at the time of quoting. Final pricing is confirmed in writing before work begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Scope of Work</h2>
            <p>
              Clear Gator performs non-structural interior and outdoor demolition, hauling, site cleanup,
              lot clearing, and property maintenance (including painting). We do not perform structural
              demolition, electrical, plumbing,
              HVAC, or roofing work. Any work outside our scope must be coordinated with appropriately
              licensed trades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Customer Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide safe, legal, and reasonable access to the work site.</li>
              <li>Disclose any known hazards (including but not limited to asbestos, lead, mold, or unmarked utilities) prior to work beginning.</li>
              <li>Secure or remove valuables and personal property from work areas.</li>
              <li>Obtain any permits or HOA approvals required for the work, unless otherwise agreed in writing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Payment</h2>
            <p>
              Unless otherwise agreed in writing, payment is due upon completion of the Services. A deposit may
              be required for larger projects. Late payments may be subject to reasonable collection costs and
              interest as permitted by Florida law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Cancellations &amp; Rescheduling</h2>
            <p>
              We ask for at least 24 hours' notice for cancellations or rescheduling. Same-day cancellations may
              be subject to a service-call fee to cover crew dispatch and reserved time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Warranties &amp; Disclaimers</h2>
            <p>
              Clear Gator performs Services in a workmanlike manner consistent with industry standards. Except
              as expressly stated in writing, the Site and Services are provided "as is" without warranties of
              any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free,
              or free of harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Clear Gator's total liability arising out of or related
              to the Services shall not exceed the amount you paid for the specific Services giving rise to the
              claim. We are not liable for indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Photos &amp; Job Documentation</h2>
            <p>
              We may take photos of work sites for project records, internal training, and quality control.
              Identifying details will not be shared publicly without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Intellectual Property</h2>
            <p>
              All content on the Site — including logos, text, graphics, and the Clear Gator name — is owned by
              or licensed to Clear Gator and is protected by applicable intellectual-property laws. You may not
              copy, reproduce, or use the content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law
              principles. Any dispute shall be resolved in the state or federal courts located in Lee County,
              Florida.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Effective Date" above indicates when the latest
              version was posted. Continued use of the Site or Services after changes are posted constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Contact</h2>
            <p>
              Questions about these Terms? Reach out:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-2">
              <li><strong>Clear Gator Construction Services</strong></li>
              <li>Phone: (239) 234-3061</li>
              <li>Service Area: Cape Coral · Naples · Southwest Florida</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
          <Link href="/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
          <Link href="/estimate">
            <Button className="bg-gator-orange hover:bg-gator-orange-dark text-white">
              Get a Free Estimate
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
