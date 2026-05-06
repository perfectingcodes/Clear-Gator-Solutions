import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const SERVICES = ["Demo", "Hauling", "Site Cleanup", "Lot Clearing", "Handyman"];

type Lead = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  description: string;
};

const initialLead: Lead = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  location: "",
  description: "",
};

export default function HeroQuoteForm() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<0 | 1>(0);
  const [lead, setLead] = useState<Lead>(initialLead);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = useMutation({
    mutationFn: async (data: Lead) =>
      apiRequest("POST", "/api/estimates", { ...data, photoUrls: [] }),
    onSuccess: () => setSubmitted(true),
    onError: () => setError("Something went wrong. Please try again or call us directly."),
  });

  const handleStep0 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!lead.serviceType) return setError("Pick a service to continue.");
    if (!lead.location.trim()) return setError("Where's the project located?");
    setStep(1);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!lead.name.trim()) return setError("Add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return setError("Add a valid email.");
    if (lead.phone.replace(/\D/g, "").length < 7) return setError("Add a valid phone.");
    submit.mutate(lead);
  };

  if (submitted) {
    return (
      <div className="relative bg-background text-foreground rounded-xl p-8 hairline">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-md bg-gator-orange/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-gator-orange" strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground mb-2">
              Estimate requested
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight leading-tight mb-2">
              Thanks, {lead.name.split(" ")[0]}.
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.65]">
              We'll review your project and reach out within 24 hours. For anything urgent, call{" "}
              <a href="tel:+12392343061" className="text-foreground font-semibold underline underline-offset-4 decoration-foreground/30 hover:decoration-gator-orange">
                (239) 234-3061
              </a>.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setLead(initialLead);
            setStep(0);
            setSubmitted(false);
          }}
          className="text-xs font-semibold tracking-wider uppercase text-muted-foreground hover:text-foreground border-b border-border hover:border-gator-orange pb-0.5 transition-colors"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-background text-foreground rounded-xl hairline overflow-hidden">
      {/* Top meta bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Free Estimate · 24h Reply
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span className={step === 0 ? "text-foreground" : ""}>01</span>
          <span className="w-3 h-px bg-border" />
          <span className={step === 1 ? "text-foreground" : ""}>02</span>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-tight mb-1">
          Request a free estimate
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Two short steps. No commitment. We respond within 24 hours.
        </p>

        {step === 0 && (
          <form onSubmit={handleStep0} className="space-y-5" data-testid="hero-form-step-1">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2.5">
                What service?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setLead((l) => ({ ...l, serviceType: s }))}
                    data-testid={`hero-service-${s.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-3 py-2.5 rounded-md border text-sm font-semibold transition-all focus-ring ${
                      lead.serviceType === s
                        ? "border-gator-orange bg-gator-orange/8 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="hero-location" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Project location
              </label>
              <input
                id="hero-location"
                type="text"
                inputMode="text"
                autoComplete="address-level2"
                value={lead.location}
                onChange={(e) => setLead((l) => ({ ...l, location: e.target.value }))}
                placeholder="City or full address"
                data-testid="hero-location-input"
                className="w-full px-4 h-11 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus-ring"
              />
            </div>

            {error && (
              <div className="text-xs text-destructive font-medium" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              data-testid="hero-form-next"
              className="w-full h-11 rounded-md bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors focus-ring"
            >
              Continue
              <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </button>

            <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
              Prefer a real person? Call{" "}
              <a href="tel:+12392343061" className="text-foreground font-semibold underline underline-offset-2">
                (239) 234-3061
              </a>{" "}
              — Mon–Sat, 7am–6pm.
            </p>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-4" data-testid="hero-form-step-2">
            <div className="flex items-center justify-between mb-1">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-foreground font-semibold">{lead.serviceType}</span>
                <span className="mx-2 text-muted-foreground/40">·</span>
                <span className="text-foreground font-semibold">{lead.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="hero-name" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Full name
                </label>
                <input
                  id="hero-name"
                  type="text"
                  autoComplete="name"
                  value={lead.name}
                  onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                  data-testid="hero-name-input"
                  className="w-full px-4 h-11 rounded-md border border-border bg-background text-foreground text-sm focus-ring"
                />
              </div>
              <div>
                <label htmlFor="hero-phone" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Phone
                </label>
                <input
                  id="hero-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={lead.phone}
                  onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                  data-testid="hero-phone-input"
                  className="w-full px-4 h-11 rounded-md border border-border bg-background text-foreground text-sm focus-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hero-email" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="hero-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={lead.email}
                onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                data-testid="hero-email-input"
                className="w-full px-4 h-11 rounded-md border border-border bg-background text-foreground text-sm focus-ring"
              />
            </div>

            <div>
              <label htmlFor="hero-description" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Brief description <span className="text-muted-foreground/60 normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="hero-description"
                rows={3}
                value={lead.description}
                onChange={(e) => setLead((l) => ({ ...l, description: e.target.value }))}
                placeholder="What's the scope? Any timing constraints?"
                data-testid="hero-description-input"
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus-ring resize-none"
              />
            </div>

            {error && (
              <div className="text-xs text-destructive font-medium" role="alert">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="submit"
                disabled={submit.isPending}
                data-testid="hero-form-submit"
                className="flex-1 h-11 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus-ring disabled:opacity-70"
              >
                {submit.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Request
                    <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setLocation("/estimate")}
                className="h-11 px-4 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 text-sm font-semibold transition-colors focus-ring"
              >
                Add photos
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
              By submitting you agree to be contacted about your request. We don't sell your info.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
