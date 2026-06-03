import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Upload,
  HardHat, Truck, Shield, Clock, Star, MapPin,
  Hammer, TreePine, Wrench, PhoneCall, Construction
} from "lucide-react";

const SERVICE_OPTIONS = [
  { id: "Interior Demolition", label: "Interior Demo", icon: Hammer, desc: "Floor removal, cabinets, drywall, bathroom & kitchen tear-outs", color: "text-gator-orange", selectedBg: "bg-gator-orange/8 border-gator-orange", glow: "shadow-gator-orange/15" },
  { id: "Outdoor Demolition", label: "Outdoor Demo", icon: Construction, desc: "Pools, sheds, fences, decks, concrete pads & driveways", color: "text-gator-orange", selectedBg: "bg-gator-orange/8 border-gator-orange", glow: "shadow-gator-orange/15" },
  { id: "Hauling", label: "Hauling", icon: Truck, desc: "Construction debris, renovation waste, dump runs & bulk trash", color: "text-primary", selectedBg: "bg-primary/8 border-primary", glow: "shadow-primary/15" },
  { id: "Site Cleanup", label: "Site Cleanup", icon: HardHat, desc: "Post-construction, jobsite, bathroom & dust/debris cleanup", color: "text-primary", selectedBg: "bg-primary/8 border-primary", glow: "shadow-primary/15" },
  { id: "Lot Clearing", label: "Lot Clearing", icon: TreePine, desc: "Yard debris, lot clearing, brush & abandoned property cleanouts", color: "text-primary", selectedBg: "bg-primary/8 border-primary", glow: "shadow-primary/15" },
  { id: "Property Maintenance", label: "Property Maintenance", icon: Wrench, desc: "Interior & exterior painting, repairs, installs & punch lists", color: "text-gator-orange", selectedBg: "bg-gator-orange/8 border-gator-orange", glow: "shadow-gator-orange/15" },
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

const STEPS = [
  { label: "Service", shortLabel: "Service" },
  { label: "Details", shortLabel: "Details" },
  { label: "Contact", shortLabel: "Contact" },
  { label: "Confirm", shortLabel: "Confirm" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2
                  ${done
                    ? "bg-primary border-primary text-primary-foreground"
                    : active
                    ? "bg-gator-orange border-gator-orange text-white shadow-lg shadow-gator-orange/25"
                    : "bg-background border-border text-muted-foreground"
                  }`}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : <span>{i + 1}</span>}
                </div>
                <span className={`text-xs mt-1.5 font-medium hidden sm:block transition-colors
                  ${active ? "text-gator-orange" : done ? "text-primary" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 mb-5 sm:mb-6 transition-all duration-500 rounded-full
                  ${done ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EstimatePage() {
  usePageMeta({
    title: "Free Estimate — Clear Gator Construction Services",
    description:
      "Get a free, no-obligation estimate for interior or outdoor demolition, hauling, site cleanup, lot clearing, or property maintenance in Southwest Florida. We respond within 24 hours.",
  });

  const [, setLocation] = useLocation();
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

  const handleSubmit = () => {
    submitMutation.mutate(formData as FormData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-semibold mb-3">Estimate Requested!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thanks, <strong className="text-foreground">{formData.name}</strong>! We've received your request and will follow up at <strong className="text-foreground">{formData.email}</strong> within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/track">
              <Button data-testid="link-track-after-submit">Track a Job</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col bg-ink text-white p-10 relative overflow-hidden flex-shrink-0 border-r border-white/5">
        <div className="absolute -top-1/3 right-0 w-[120%] aspect-square rounded-full bg-gator-orange/[0.05] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 flex flex-col h-full">
          <Link href="/">
            <div className="flex items-center gap-3 mb-14 group cursor-pointer">
              <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain transition-transform group-hover:scale-[1.04]" />
              <div className="leading-none">
                <div className="font-display font-semibold text-lg tracking-[-0.02em]">Clear Gator</div>
                <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mt-1">
                  Construction Services
                </div>
              </div>
            </div>
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange-light">
                01 / Free Estimate
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.025em] mb-4 text-balance">
              Let's get your site cleared.
            </h2>
            <p className="text-white/55 text-sm leading-[1.65]">
              Fill out the quick form. Our team sends a detailed quote within 24 hours. No commitment.
            </p>
          </div>

          <div className="space-y-3.5 mb-10">
            {[
              { icon: Shield, text: "Licensed & Fully Insured" },
              { icon: Clock, text: "24-Hour Response Guarantee" },
              { icon: MapPin, text: "Serving Southwest Florida" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-white/70">
                <Icon className="w-4 h-4 text-gator-orange-light flex-shrink-0" strokeWidth={2} />
                {text}
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="pt-6 border-t border-white/8">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 mb-3">
                Try the Demo
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-white text-base">CG-2024-DEMO</span>
                <Link href="/track" className="text-[10px] text-gator-orange-light tracking-wide hover:underline underline-offset-2">
                  Track →
                </Link>
              </div>
              <div className="text-white/45 text-xs leading-relaxed">
                Paste this on the Track page to see a live demo job.
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-8 mt-6 border-t border-white/8">
              <img src={logoImg} alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
              <div className="font-mono text-gator-orange-light/80 tracking-[0.32em] text-[10px] font-medium uppercase">
                Let's Gator Done.
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        <header className="border-b border-border bg-background/85 backdrop-blur-md sticky top-0 z-40 lg:hidden">
          <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img src={logoImg} alt="Clear Gator Logo" className="h-8 w-8 object-contain" />
              <span className="font-display font-semibold text-sm tracking-[-0.01em] truncate">Clear Gator</span>
            </div>
            <a href="tel:+12392343061" aria-label="Call Clear Gator" data-testid="estimate-header-call">
              <Button size="sm" variant="outline" className="gap-1.5 rounded-md">
                <PhoneCall className="w-3.5 h-3.5 text-gator-orange" strokeWidth={2.2} />
                Call
              </Button>
            </a>
          </div>
        </header>

        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 lg:py-14">
          <div className="mb-10 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">
              01 / Free Estimate
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.025em] leading-[1.05] mb-2">Request a free estimate</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">Takes under 2 minutes. We respond within 24 hours.</p>
          </div>

          <div className="hidden lg:block mb-10">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">
              Request
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.025em] leading-[1.05] mb-2">Request a free estimate</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">Takes under 2 minutes. We respond within 24 hours.</p>
          </div>

          <StepIndicator currentStep={step} />

          {step === 0 && (
            <Card className="animate-fade-in border-card-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">What service do you need?</CardTitle>
                <CardDescription>Select the type of work you're looking for.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...step1Form}>
                  <form onSubmit={handleStep1} className="space-y-4">
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
                                    className={`text-left p-4 rounded-lg border-2 transition-all duration-150
                                      ${selected
                                        ? `${opt.selectedBg} shadow-md ${opt.glow}`
                                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                                      }`}
                                  >
                                    <div className="flex flex-col items-start gap-2">
                                      <div className={`w-10 h-10 rounded-lg ${selected ? "bg-current/10" : "bg-muted"} flex items-center justify-center`}>
                                        <opt.icon className={`w-5 h-5 ${selected ? opt.color : "text-muted-foreground"}`} />
                                      </div>
                                      <span className={`font-bold text-sm ${selected ? opt.color : "text-foreground"}`}>{opt.label}</span>
                                      <p className="text-xs text-muted-foreground leading-snug">{opt.desc}</p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end pt-2">
                      <Button type="submit" data-testid="button-next-step1" className="gap-2 px-6">
                        Next Step <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card className="animate-fade-in border-card-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Describe your project</CardTitle>
                <CardDescription>Tell us the scope, timeline, and any special requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...step2Form}>
                  <form onSubmit={handleStep2} className="space-y-4">
                    <FormField
                      control={step2Form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder="e.g. We're finishing a 2,500 sq ft new build and need full post-construction cleanup including all floors, windows, and exterior. Timeline is end of next week."
                              data-testid="input-description"
                              className="resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/20 hover:bg-muted/40 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-semibold mb-1">Attach Site Photos</p>
                      <p className="text-xs text-muted-foreground mb-3">Optional — photos help us give you an accurate quote.</p>
                      <Button type="button" variant="outline" size="sm" data-testid="button-upload-photos">
                        Choose Files
                      </Button>
                    </div>

                    <div className="flex gap-3 justify-between pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(0)} data-testid="button-back-step2">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button type="submit" data-testid="button-next-step2" className="gap-2 px-6">
                        Next Step <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-fade-in border-card-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Your Contact Information</CardTitle>
                <CardDescription>We'll send your estimate here and follow up to schedule.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...step3Form}>
                  <form onSubmit={handleStep3} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={step3Form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Smith" data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step3Form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="(555) 000-0000" type="tel" data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={step3Form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="you@example.com" type="email" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={step3Form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Project Address or Area</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main St, Miami, FL 33101" data-testid="input-location" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3 justify-between pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} data-testid="button-back-step3">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button type="submit" data-testid="button-next-step3" className="gap-2 px-6">
                        Review <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-fade-in border-card-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Review & Submit</CardTitle>
                <CardDescription>Confirm your details before we send your estimate request.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Service Type", value: formData.serviceType },
                    { label: "Name", value: formData.name },
                    { label: "Email", value: formData.email },
                    { label: "Phone", value: formData.phone },
                    { label: "Location", value: formData.location },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3.5 border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">{label}</div>
                      <div className="text-sm font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3.5 border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Project Description</div>
                  <div className="text-sm leading-relaxed">{formData.description}</div>
                </div>
                <div className="flex gap-3 justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} data-testid="button-back-step4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-estimate"
                    className="bg-gator-orange hover:bg-gator-orange-dark text-white font-bold gap-2 shadow-lg shadow-gator-orange/25 px-8"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Estimate Request"}
                    {!submitMutation.isPending && <CheckCircle2 className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
