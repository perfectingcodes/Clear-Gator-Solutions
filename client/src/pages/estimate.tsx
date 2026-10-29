import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import MainNav from "@/components/main-nav";
import logoImg from "@assets/clear_gator_1775663894887.png";
import { FALLBACK_HERO } from "@/data/page-images";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Upload,
  HardHat, Truck, Shield, Clock, MapPin,
  Hammer, PhoneCall, Construction, Leaf, Droplets,
} from "lucide-react";

const HERO = "/images/stock/crew-boots.jpg";

const SERVICE_OPTIONS = [
  { id: "Interior Demolition", label: "Interior Demo", icon: Hammer, desc: "Floor removal, cabinets, drywall, bathroom & kitchen tear-outs" },
  { id: "Outdoor Demolition", label: "Outdoor Demo", icon: Construction, desc: "Pools, sheds, fences, decks, concrete pads & driveways" },
  { id: "Hauling", label: "Hauling", icon: Truck, desc: "Construction debris, renovation waste, dump runs & bulk trash" },
  { id: "Site Cleanup", label: "Site Cleanup", icon: HardHat, desc: "Post-construction, jobsite, bathroom & dust/debris cleanup" },
  { id: "Landscaping", label: "Landscaping", icon: Leaf, desc: "Sod, mulch, hedge & palm trimming, plant installs, lot refresh" },
  { id: "Pressure Washing", label: "Pressure Wash", icon: Droplets, desc: "House, driveway, pool deck, roof wash, fences, screens" },
];

const step1Schema = z.object({ serviceType: z.string().min(1, "Please select a service type") });
const step2Schema = z.object({
  description: z.string().min(10, "Please describe your project in at least 10 characters"),
});
const step3Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  location: z.string().min(5, "Enter your project address"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type FormData = Step1Data & Step2Data & Step3Data;

const STEPS = ["Service", "Details", "Contact", "Confirm"];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <li key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${
                  done
                    ? "bg-teal border-teal text-shell"
                    : active
                    ? "bg-gator-orange border-gator-orange text-asphalt shadow-lg shadow-gator-orange/30"
                    : "bg-shell border-asphalt/20 text-asphalt/40"
                }`}
              >
                {done ? <CheckCircle2 className="w-5 h-5" strokeWidth={2.6} /> : i + 1}
              </div>
              <span
                className={`text-[10px] mt-2 font-mono font-black uppercase tracking-[0.18em] hidden sm:block ${
                  active ? "text-gator-orange" : done ? "text-teal" : "text-asphalt/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-5 sm:mb-6 rounded-full ${done ? "bg-teal" : "bg-asphalt/15"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function EstimatePage() {
  usePageMeta({
    title: "Free Estimate — Clear Gator Construction Services",
    description:
      "Get a free, no-obligation estimate for demolition, hauling, site cleanup, landscaping, or pressure washing in Southwest Florida. We respond within 24 hours.",
  });

  const [, setLocation] = useLocation();
  void setLocation;
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { serviceType: formData.serviceType || "" },
  });
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { description: formData.description || "" },
  });
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      location: formData.location || "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: FormData) =>
      apiRequest("POST", "/api/estimates", { ...data, photoUrls: [] }),
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    },
  });

  const handleStep1 = step1Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(1);
  });
  const handleStep2 = step2Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  });
  const handleStep3 = step3Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  });
  const handleSubmit = () => submitMutation.mutate(formData as FormData);

  if (submitted) {
    return (
      <div className="min-h-screen bg-shell">
        <MainNav />
        <section className="relative overflow-hidden bg-asphalt">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-teal/70" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-gator-orange flex items-center justify-center mx-auto mb-8 shadow-xl shadow-black/30">
              <CheckCircle2 className="w-10 h-10 text-asphalt" strokeWidth={2.6} />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
                Estimate Requested
              </span>
            </div>
            <h1 className="font-display font-black uppercase text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] tracking-[-0.035em] text-white text-balance mb-6">
              Thanks,<br />
              <span className="text-gator-orange">{formData.name?.split(" ")[0] || "Friend"}.</span>
            </h1>
            <p className="text-white/80 text-base sm:text-xl leading-[1.5] max-w-xl mx-auto mb-10">
              We've got your request. You'll hear from us at{" "}
              <span className="font-black text-white">{formData.email}</span> inside 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
              <Link href="/track" className="flex-1">
                <button className="w-full h-14 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/40">
                  Track a Job
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button className="w-full h-14 px-7 rounded-md border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <MainNav />

      {/* ── HERO BAND ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-asphalt/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-14 sm:pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Free · 24h Reply
            </span>
          </div>
          <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 max-w-4xl text-[clamp(2.25rem,8vw,6rem)]">
            Request a<br />
            <span className="text-gator-orange">Free Estimate.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-xl leading-[1.5] max-w-2xl mb-8 text-pretty">
            Takes under two minutes. We send a detailed, written quote inside 24 hours. No commitment, no pressure.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {[
              { icon: Shield, label: "Licensed & Insured" },
              { icon: Clock, label: "24h Response" },
              { icon: MapPin, label: "SW Florida" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 text-gator-orange flex-shrink-0" strokeWidth={2.4} />
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN BODY ── */}
      <section className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={step} />

          {step === 0 && (
            <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-10 shadow-xl shadow-asphalt/15 animate-fade-in">
              <div className="mb-7">
                <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                  Step 1 of 4
                </div>
                <h2 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight tracking-tight text-shell">
                  What Service<br /><span className="text-gator-orange">Do You Need?</span>
                </h2>
              </div>
              <Form {...step1Form}>
                <form onSubmit={handleStep1} className="space-y-5">
                  <FormField
                    control={step1Form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {SERVICE_OPTIONS.map((opt) => {
                              const selected = field.value === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  data-testid={`service-option-${opt.id.toLowerCase().replace(/\s+/g, "-")}`}
                                  onClick={() => field.onChange(opt.id)}
                                  className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                    selected
                                      ? "bg-white/[0.07] border-gator-orange shadow-lg shadow-black/30"
                                      : "bg-white/[0.03] border-white/10 hover:border-gator-orange/50 hover:bg-white/[0.05]"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${selected ? "bg-gator-orange" : "bg-white/[0.08]"}`}>
                                      <opt.icon className={`w-5 h-5 ${selected ? "text-asphalt" : "text-shell/80"}`} strokeWidth={2.2} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="font-display font-black uppercase text-sm text-shell tracking-tight mb-1">{opt.label}</div>
                                      <p className="text-xs text-shell/60 leading-snug">{opt.desc}</p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage className="text-gator-orange" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end pt-2">
                    <button type="submit" data-testid="button-next-step1" className="h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                      Next Step <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {step === 1 && (
            <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-10 shadow-xl shadow-asphalt/15 animate-fade-in">
              <div className="mb-7">
                <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                  Step 2 of 4
                </div>
                <h2 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight tracking-tight text-shell">
                  Describe<br /><span className="text-gator-orange">Your Project.</span>
                </h2>
              </div>
              <Form {...step2Form}>
                <form onSubmit={handleStep2} className="space-y-5">
                  <FormField
                    control={step2Form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">
                          Project Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="e.g. 2,500 sq ft new build needs full post-construction cleanup — floors, windows, exterior. Timeline is end of next week."
                            data-testid="input-description"
                            className="resize-none bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40"
                          />
                        </FormControl>
                        <FormMessage className="text-gator-orange" />
                      </FormItem>
                    )}
                  />

                  <div className="border-2 border-dashed border-white/15 rounded-lg p-6 text-center bg-white/[0.03]">
                    <Upload className="w-7 h-7 text-shell/60 mx-auto mb-2" />
                    <p className="text-sm font-black uppercase tracking-tight text-shell mb-1">Attach Site Photos</p>
                    <p className="text-xs text-shell/55 mb-3">Optional — photos help us give you an accurate quote.</p>
                    <button type="button" className="h-10 px-5 rounded-md border-2 border-white/20 hover:border-gator-orange text-shell font-black uppercase text-xs tracking-[0.1em] transition-colors">
                      Choose Files
                    </button>
                  </div>

                  <div className="flex gap-3 justify-between pt-2">
                    <button type="button" onClick={() => setStep(0)} data-testid="button-back-step2" className="h-12 px-5 rounded-md border-2 border-white/20 hover:border-white text-shell font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                      <ArrowLeft className="w-4 h-4" strokeWidth={2.4} /> Back
                    </button>
                    <button type="submit" data-testid="button-next-step2" className="h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                      Next Step <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-10 shadow-xl shadow-asphalt/15 animate-fade-in">
              <div className="mb-7">
                <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                  Step 3 of 4
                </div>
                <h2 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight tracking-tight text-shell">
                  Your Contact<br /><span className="text-gator-orange">Information.</span>
                </h2>
              </div>
              <Form {...step3Form}>
                <form onSubmit={handleStep3} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={step3Form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Smith" data-testid="input-name" className="bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40" />
                          </FormControl>
                          <FormMessage className="text-gator-orange" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={step3Form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">Phone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(555) 000-0000" type="tel" data-testid="input-phone" className="bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40" />
                          </FormControl>
                          <FormMessage className="text-gator-orange" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={step3Form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="you@example.com" type="email" data-testid="input-email" className="bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40" />
                        </FormControl>
                        <FormMessage className="text-gator-orange" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={step3Form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/60">Project Address or Area</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123 Main St, Cape Coral, FL" data-testid="input-location" className="bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40" />
                        </FormControl>
                        <FormMessage className="text-gator-orange" />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3 justify-between pt-2">
                    <button type="button" onClick={() => setStep(1)} data-testid="button-back-step3" className="h-12 px-5 rounded-md border-2 border-white/20 hover:border-white text-shell font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                      <ArrowLeft className="w-4 h-4" strokeWidth={2.4} /> Back
                    </button>
                    <button type="submit" data-testid="button-next-step3" className="h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                      Review <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-10 shadow-xl shadow-asphalt/15 animate-fade-in">
              <div className="mb-7">
                <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-gator-orange mb-3">
                  Step 4 of 4
                </div>
                <h2 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight tracking-tight text-shell">
                  Review &amp;<br /><span className="text-gator-orange">Submit.</span>
                </h2>
              </div>
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Service", value: formData.serviceType },
                    { label: "Name", value: formData.name },
                    { label: "Email", value: formData.email },
                    { label: "Phone", value: formData.phone },
                    { label: "Location", value: formData.location },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.04] border border-white/10 rounded-lg p-3.5">
                      <div className="font-mono text-[10px] font-black tracking-[0.22em] text-shell/50 uppercase mb-1">{label}</div>
                      <div className="text-sm font-semibold text-shell">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-lg p-3.5">
                  <div className="font-mono text-[10px] font-black tracking-[0.22em] text-shell/50 uppercase mb-1">Project Description</div>
                  <div className="text-sm leading-relaxed text-shell">{formData.description}</div>
                </div>
                <div className="flex gap-3 justify-between pt-4">
                  <button type="button" onClick={() => setStep(2)} data-testid="button-back-step4" className="h-12 px-5 rounded-md border-2 border-white/20 hover:border-white text-shell font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all">
                    <ArrowLeft className="w-4 h-4" strokeWidth={2.4} /> Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-estimate"
                    className="h-12 px-8 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center gap-2 transition-all shadow-lg shadow-black/30 disabled:opacity-60"
                  >
                    {submitMutation.isPending ? "Submitting…" : "Submit Request"}
                    {!submitMutation.isPending && <CheckCircle2 className="w-4 h-4" strokeWidth={2.6} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Demo tracker hint */}
          <div className="mt-8 p-5 rounded-xl bg-shell border border-asphalt/15 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-teal mb-1.5">
                Try the Demo Tracker
              </div>
              <div className="font-mono text-asphalt text-sm font-black">CG-2024-DEMO</div>
            </div>
            <Link href="/track">
              <span className="inline-flex items-center gap-2 text-asphalt font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-0.5 hover:text-teal transition-colors cursor-pointer">
                Track Page
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
            </Link>
          </div>
        </div>
      </section>

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

      {/* Hidden assets reference to satisfy TS */}
      <img src={logoImg} alt="" className="hidden" aria-hidden="true" />
      <img src={FALLBACK_HERO} alt="" className="hidden" aria-hidden="true" />
    </div>
  );
}
