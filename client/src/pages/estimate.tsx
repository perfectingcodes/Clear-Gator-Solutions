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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Trash2, ArrowLeft, ArrowRight, CheckCircle2, Upload,
  HardHat, Building2, Truck, Package, HelpCircle
} from "lucide-react";

const SERVICE_OPTIONS = [
  { id: "Construction Cleanup", label: "Construction Cleanup", icon: HardHat, desc: "Post-build site cleanup & debris removal" },
  { id: "Demolition", label: "Demolition", icon: Building2, desc: "Interior or exterior demolition work" },
  { id: "Dumpster Rental", label: "Dumpster Rental", icon: Truck, desc: "Container drop-off & pickup" },
  { id: "Debris Removal", label: "Debris Removal", icon: Package, desc: "One-time haul-away service" },
  { id: "Other", label: "Other", icon: HelpCircle, desc: "Let us know what you need" },
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

const STEPS = ["Service Type", "Project Details", "Your Info", "Confirm"];

export default function EstimatePage() {
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
    onSuccess: () => {
      setSubmitted(true);
    },
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
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Estimate Requested!</h1>
          <p className="text-muted-foreground mb-8">
            Thanks, <strong>{formData.name}</strong>! We've received your request and will follow up at <strong>{formData.email}</strong> within 24 hours.
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Trash2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold">Clear Gator</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <Badge className="mb-3">Free — No Obligation</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Request a Free Estimate</h1>
          <p className="text-muted-foreground text-sm">Takes less than 2 minutes. We'll respond within 24 hours.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-[hsl(25_95%_50%)] text-white" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className="absolute" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {step === 0 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>What service do you need?</CardTitle>
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
                            {SERVICE_OPTIONS.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                data-testid={`service-option-${opt.id.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => field.onChange(opt.id)}
                                className={`text-left p-4 rounded-md border-2 transition-all hover-elevate
                                  ${field.value === opt.id
                                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                                    : "border-border"
                                  }`}
                              >
                                <div className="flex items-center gap-3 mb-1">
                                  <opt.icon className={`w-5 h-5 ${field.value === opt.id ? "text-primary" : "text-muted-foreground"}`} />
                                  <span className="font-semibold text-sm">{opt.label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{opt.desc}</p>
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end pt-2">
                    <Button type="submit" data-testid="button-next-step1" className="gap-2">
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Describe your project</CardTitle>
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
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="e.g. We're finishing a 2,500 sq ft new build and need full post-construction cleanup including all floors, windows, and exterior. Timeline is end of next week."
                            data-testid="input-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium mb-1">Attach Site Photos</p>
                    <p className="text-xs text-muted-foreground">Drag and drop or click to upload. Optional — helps us give you an accurate quote.</p>
                    <Button type="button" variant="outline" size="sm" className="mt-3" data-testid="button-upload-photos">
                      Choose Files
                    </Button>
                  </div>

                  <div className="flex gap-3 justify-between pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(0)} data-testid="button-back-step2">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button type="submit" data-testid="button-next-step2" className="gap-2">
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Your Contact Information</CardTitle>
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
                          <FormLabel>Full Name</FormLabel>
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
                          <FormLabel>Phone Number</FormLabel>
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
                        <FormLabel>Email Address</FormLabel>
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
                        <FormLabel>Project Address or Area</FormLabel>
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
                    <Button type="submit" data-testid="button-next-step3" className="gap-2">
                      Review <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Confirm your details before we send your estimate request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Service Type", value: formData.serviceType },
                  { label: "Name", value: formData.name },
                  { label: "Email", value: formData.email },
                  { label: "Phone", value: formData.phone },
                  { label: "Location", value: formData.location },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-muted/40 dark:bg-muted/20 rounded-md p-3">
                    <div className="text-xs text-muted-foreground mb-1">{label}</div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-muted/40 dark:bg-muted/20 rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Project Description</div>
                <div className="text-sm">{formData.description}</div>
              </div>
              <div className="flex gap-3 justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)} data-testid="button-back-step4">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-estimate"
                  className="bg-[hsl(25_95%_50%)] text-white border-[hsl(25_90%_40%)] gap-2"
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
  );
}
