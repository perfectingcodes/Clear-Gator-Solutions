import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/clear_gator_1775663894887.png";
import { ArrowLeft } from "lucide-react";

const EFFECTIVE_DATE = "May 6, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain" />
            <span className="font-black text-xl tracking-tight text-foreground">Clear Gator</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Effective Date: {EFFECTIVE_DATE}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-foreground/85 leading-relaxed">
          <section>
            <p>
              Clear Gator Construction Services ("Clear Gator," "we," "us," or "our") respects your privacy.
              This Privacy Policy explains how we collect, use, and protect information when you visit our
              website or request services from us. By using our website or services, you agree to the practices
              described below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information</strong> you provide directly — such as your name, email address, phone number, and project address — when you request an estimate, track a job, or contact our support bot.</li>
              <li><strong>Project Details</strong> you submit, including descriptions of work, photos, timelines, and service preferences.</li>
              <li><strong>Site Usage Data</strong> automatically collected through standard web technologies, such as IP address, browser type, pages viewed, and approximate location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to estimate requests and support inquiries.</li>
              <li>Schedule, perform, and follow up on services.</li>
              <li>Send service-related communications and, where permitted, occasional updates about Clear Gator.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Comply with applicable laws and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Share Information</h2>
            <p>
              We do not sell your personal information. We may share information with trusted service providers
              who help us operate our business (for example, hosting, communications, or scheduling tools), and
              we may disclose information when required by law or to protect the safety, rights, or property of
              Clear Gator, our customers, or the public.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary to provide our services, comply with
              legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Your Choices</h2>
            <p>
              You may contact us to request access to, correction of, or deletion of your personal information.
              You may also unsubscribe from non-essential communications at any time by replying to the message
              or contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards to protect the information
              we collect. No system is completely secure, however, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13, and we do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Effective Date" above indicates when
              the latest version was posted. Continued use of our website or services after changes are posted
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact Us</h2>
            <p>
              Questions about this Privacy Policy? Reach out:
            </p>
            <ul className="list-none pl-0 space-y-1 mt-2">
              <li><strong>Clear Gator Construction Services</strong></li>
              <li>Phone: (305) 555-0190</li>
              <li>Service Area: Cape Coral · Naples · Southwest Florida</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
          <Link href="/terms">
            <Button variant="outline">Terms &amp; Conditions</Button>
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
