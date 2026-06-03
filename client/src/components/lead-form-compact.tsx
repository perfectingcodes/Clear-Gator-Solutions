import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { track } from "@/hooks/use-analytics";
import logoImg from "@assets/clear_gator_1775663894887.png";

type Tone = "card" | "dark";

const initialLead = { name: "", email: "", phone: "", serviceType: "", location: "", description: "" };

/**
 * Compact one-step quote form for use on service / city / interior pages.
 * Pre-fills serviceType + location when the host page passes them in.
 */
export default function LeadFormCompact({
  defaultService,
  defaultLocation,
  surface = "card",
  source,
}: {
  defaultService?: string;
  defaultLocation?: string;
  surface?: Tone;
  source?: string;
}) {
  const [lead, setLead] = useState({
    ...initialLead,
    serviceType: defaultService ?? "",
    location: defaultLocation ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = useMutation({
    mutationFn: async () =>
      apiRequest("POST", "/api/estimates", { ...lead, photoUrls: [] }),
    onSuccess: () => {
      track("form_submit", { metadata: { form: source || "compact_form", service: lead.serviceType, city: lead.location } });
      setSubmitted(true);
    },
    onError: () => setError("Something went wrong. Try again or call (239) 234-3061."),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!lead.name.trim()) return setError("Add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return setError("Add a valid email.");
    if (lead.phone.replace(/\D/g, "").length < 7) return setError("Add a valid phone.");
    if (!lead.serviceType) return setError("Pick a service.");
    if (!lead.location.trim()) return setError("Where's the project located?");
    submit.mutate();
  };

  const cardClass =
    surface === "dark"
      ? "bg-white/[0.04] border border-white/15 backdrop-blur-md text-white"
      : "bg-background border border-border text-foreground shadow-sm";

  const labelClass =
    surface === "dark"
      ? "text-[10px] font-mono uppercase tracking-[0.22em] text-white/55"
      : "text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground";

  const inputClass =
    surface === "dark"
      ? "w-full h-12 sm:h-11 px-4 rounded-md border border-white/15 bg-white/[0.05] text-white text-base sm:text-sm placeholder:text-white/40 focus-ring"
      : "w-full h-12 sm:h-11 px-4 rounded-md border border-border bg-background text-foreground text-base sm:text-sm placeholder:text-muted-foreground/60 focus-ring";

  if (submitted) {
    return (
      <div className={`relative rounded-xl p-6 sm:p-7 ${cardClass}`}>
        <img src={logoImg} alt="" aria-hidden="true" className="absolute top-5 right-5 w-9 h-9 object-contain opacity-70" />
        <div className="flex items-start gap-4 mb-3">
          <div className="w-10 h-10 rounded-md bg-gator-orange/15 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-gator-orange" strokeWidth={2.4} />
          </div>
          <div>
            <div className={`${surface === "dark" ? "text-white/55" : "text-muted-foreground"} text-[10px] font-mono uppercase tracking-[0.22em] mb-2`}>
              Estimate Requested
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight mb-1.5">Thanks, {lead.name.split(" ")[0]}.</h3>
            <p className={`text-sm ${surface === "dark" ? "text-white/65" : "text-muted-foreground"} leading-[1.6]`}>
              We'll review and reach out within 24 hours. Need it today? Call{" "}
              <a href="tel:+12392343061" className={`font-semibold underline underline-offset-2 ${surface === "dark" ? "text-white" : "text-foreground"}`}>(239) 234-3061</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`relative rounded-xl p-5 sm:p-6 space-y-3 ${cardClass}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className={labelClass}>
            Free Estimate · 24h Reply
          </span>
        </div>
        <img src={logoImg} alt="" aria-hidden="true" className="w-7 h-7 object-contain opacity-70" />
      </div>

      <div>
        <label htmlFor="lf-name" className={`block mb-1.5 ${labelClass}`}>Full Name</label>
        <input id="lf-name" type="text" autoComplete="name" value={lead.name} onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="lf-phone" className={`block mb-1.5 ${labelClass}`}>Phone</label>
          <input id="lf-phone" type="tel" inputMode="tel" autoComplete="tel" value={lead.phone} onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))} placeholder="(239) 234-3061" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lf-email" className={`block mb-1.5 ${labelClass}`}>Email</label>
          <input id="lf-email" type="email" inputMode="email" autoComplete="email" value={lead.email} onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))} className={inputClass} />
        </div>
      </div>

      {!defaultService && (
        <div>
          <label htmlFor="lf-service" className={`block mb-1.5 ${labelClass}`}>Service</label>
          <select id="lf-service" value={lead.serviceType} onChange={(e) => setLead((l) => ({ ...l, serviceType: e.target.value }))} className={inputClass}>
            <option value="">Pick one…</option>
            {["Interior Demolition", "Outdoor Demolition", "Hauling", "Site Cleanup", "Lot Clearing", "Property Maintenance"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="lf-location" className={`block mb-1.5 ${labelClass}`}>Project location</label>
        <input id="lf-location" type="text" autoComplete="address-level2" value={lead.location} onChange={(e) => setLead((l) => ({ ...l, location: e.target.value }))} placeholder="City or full address" className={inputClass} />
      </div>

      <div>
        <label htmlFor="lf-desc" className={`block mb-1.5 ${labelClass}`}>What's the project? <span className="normal-case tracking-normal opacity-70">(optional)</span></label>
        <textarea id="lf-desc" rows={2} value={lead.description} onChange={(e) => setLead((l) => ({ ...l, description: e.target.value }))} placeholder="Brief scope, timeline, anything we should know" className={`${inputClass} h-auto py-3 resize-none`} />
      </div>

      {error && (
        <div className={`text-xs font-medium ${surface === "dark" ? "text-red-300" : "text-destructive"}`} role="alert">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          type="submit"
          disabled={submit.isPending}
          className="flex-1 h-12 sm:h-11 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus-ring disabled:opacity-70"
        >
          {submit.isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
          ) : (
            <>Request Estimate <ArrowRight className="w-4 h-4" strokeWidth={2.4} /></>
          )}
        </button>
        <a
          href="tel:+12392343061"
          data-testid="lead-form-call"
          className={`h-12 sm:h-11 px-4 rounded-md border text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            surface === "dark"
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-border text-foreground hover:bg-muted/50"
          }`}
        >
          Or Call Us
        </a>
      </div>

      <p className={`text-[11px] leading-relaxed ${surface === "dark" ? "text-white/55" : "text-muted-foreground/85"}`}>
        Submitting agrees to be contacted about your project. We don't sell your info.
      </p>
    </form>
  );
}
