import { useState, useRef } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  ArrowLeft, Plus, Upload, Clock, CheckCircle2, Wrench, PauseCircle,
  Calendar, Eye, LayoutDashboard, FileText, Lock, TrendingUp,
  ChevronDown, ChevronUp, Mail, Phone, MapPin, DollarSign, User
} from "lucide-react";
import type { Job, JobPhoto, Estimate } from "@shared/schema";
import { JOB_STATUSES, SERVICE_TYPES } from "@shared/schema";

const ADMIN_PASSWORD = "cleargator2024";

const STATUS_COLORS: Record<string, string> = {
  Scheduled: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
  "In Progress": "bg-gator-orange/12 text-gator-orange-dark dark:text-gator-orange-light border-gator-orange/30",
  Completed: "bg-primary/10 text-primary border-primary/25",
  "On Hold": "bg-muted text-muted-foreground border-border",
};

const STATUS_LEFT_BORDER: Record<string, string> = {
  Scheduled: "border-l-blue-500",
  "In Progress": "border-l-gator-orange",
  Completed: "border-l-primary",
  "On Hold": "border-l-border",
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  Scheduled: Calendar,
  "In Progress": Wrench,
  Completed: CheckCircle2,
  "On Hold": PauseCircle,
};

const ESTIMATE_STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/25",
  Reviewed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
  Quoted: "bg-primary/10 text-primary border-primary/25",
  Declined: "bg-destructive/10 text-destructive border-destructive/25",
};

function StatusBadge({ status }: { status: string }) {
  const Icon = STATUS_ICONS[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_COLORS[status] || STATUS_COLORS["Scheduled"]}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

const newJobSchema = z.object({
  title: z.string().min(3, "Title required"),
  serviceType: z.string().min(1, "Service type required"),
  customerName: z.string().min(2, "Customer name required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().min(7, "Phone required"),
  location: z.string().min(5, "Location required"),
  description: z.string().optional(),
  notes: z.string().optional(),
  scheduledDate: z.string().optional(),
  invoiceAmount: z.string().optional(),
});
type NewJobData = z.infer<typeof newJobSchema>;

function CreateJobDialog({ onCreated }: { onCreated: () => void }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<NewJobData>({
    resolver: zodResolver(newJobSchema),
    defaultValues: { title: "", serviceType: "", customerName: "", customerEmail: "", customerPhone: "", location: "" },
  });

  const createMutation = useMutation({
    mutationFn: async (data: NewJobData) => {
      const res = await apiRequest("POST", "/api/jobs", data);
      return res.json();
    },
    onSuccess: (data: any) => {
      toast({ title: "Job Created", description: `Job ID: ${data.jobId}` });
      setOpen(false);
      form.reset();
      onCreated();
    },
    onError: () => {
      toast({ title: "Failed to create job", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-job" className="gap-2 font-semibold shadow-md">
          <Plus className="w-4 h-4" /> New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-black">Create New Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Job Title</FormLabel>
                <FormControl><Input {...field} placeholder="Post-Construction Cleanup — Main St" data-testid="input-job-title" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="serviceType" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Service Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-service-type">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICE_TYPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="scheduledDate" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Scheduled Date</FormLabel>
                  <FormControl><Input {...field} type="date" data-testid="input-scheduled-date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="customerName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Customer Name</FormLabel>
                  <FormControl><Input {...field} placeholder="John Smith" data-testid="input-customer-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="customerPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Phone</FormLabel>
                  <FormControl><Input {...field} placeholder="(555) 000-0000" data-testid="input-customer-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="customerEmail" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Customer Email</FormLabel>
                <FormControl><Input {...field} placeholder="customer@email.com" data-testid="input-customer-email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Project Location</FormLabel>
                <FormControl><Input {...field} placeholder="123 Main St, Miami, FL" data-testid="input-job-location" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Description <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Project details..." data-testid="input-job-description" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="invoiceAmount" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Invoice Amount ($) <span className="text-muted-foreground font-normal">— optional</span></FormLabel>
                <FormControl><Input {...field} placeholder="0.00" type="number" step="0.01" data-testid="input-invoice-amount" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={createMutation.isPending} className="w-full font-semibold" data-testid="button-submit-new-job">
              {createMutation.isPending ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function JobRow({ job, onUpdated }: { job: Job; onUpdated: () => void }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadPhotoMutationPending, setUploadPending] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const photosQuery = useQuery<JobPhoto[]>({
    queryKey: ["/api/jobs", job.id, "photos"],
    enabled: showDetail,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/jobs/${job.id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      onUpdated();
      toast({ title: "Status Updated" });
    },
    onError: () => toast({ title: "Failed to update", variant: "destructive" }),
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadPending(true);
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("jobId", job.id);
      const res = await fetch(`/api/jobs/${job.id}/photos`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Photo Uploaded" });
      qc.invalidateQueries({ queryKey: ["/api/jobs", job.id, "photos"] });
      setUploadPending(false);
    },
    onError: () => {
      toast({ title: "Upload failed", variant: "destructive" });
      setUploadPending(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadPhotoMutation.mutate(file);
  };

  const leftBorder = STATUS_LEFT_BORDER[job.status] || "border-l-border";

  return (
    <div className={`border border-card-border border-l-4 ${leftBorder} rounded-lg bg-card overflow-hidden`} data-testid={`job-row-${job.id}`}>
      <div className="p-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono text-xs text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">{job.jobId}</span>
            <StatusBadge status={job.status} />
            <Badge variant="outline" className="text-xs font-medium">{job.serviceType}</Badge>
          </div>
          <div className="font-bold text-sm">{job.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <User className="w-3 h-3" />
            {job.customerName}
            <span className="text-border mx-1">·</span>
            <MapPin className="w-3 h-3" />
            {job.location}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={job.status} onValueChange={(v) => updateStatusMutation.mutate(v)}>
            <SelectTrigger className="h-8 text-xs w-36" data-testid={`select-status-${job.id}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOB_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} capture="environment" />
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadPhotoMutationPending}
            data-testid={`button-upload-photo-${job.id}`}
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            {uploadPhotoMutationPending ? "Uploading..." : "Photo"}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowDetail(!showDetail)}
            data-testid={`button-expand-job-${job.id}`}
            className="gap-1"
          >
            {showDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-xs">{showDetail ? "Hide" : "Details"}</span>
          </Button>
        </div>
      </div>

      {showDetail && (
        <div className="border-t border-card-border p-4 space-y-4 animate-fade-in bg-muted/20">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { icon: Mail, label: "Email", value: job.customerEmail },
              { icon: Phone, label: "Phone", value: job.customerPhone },
              { icon: DollarSign, label: "Invoice", value: job.invoiceAmount ? `$${parseFloat(job.invoiceAmount).toFixed(2)} — ${job.invoicePaid ? "Paid" : "Unpaid"}` : "Not set" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-background rounded-lg p-3 border border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
                <div className="text-sm font-semibold truncate">{value}</div>
              </div>
            ))}
          </div>

          {job.description && (
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Description</div>
              <div className="text-sm leading-relaxed">{job.description}</div>
            </div>
          )}

          <div>
            <div className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Site Photos</div>
            {photosQuery.isLoading ? (
              <div className="grid grid-cols-4 gap-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-lg" />)}</div>
            ) : photosQuery.data?.length ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {photosQuery.data.map((p) => (
                  <img key={p.id} src={p.url} alt={p.caption || "Photo"} className="aspect-square rounded-lg object-cover border border-card-border hover:shadow-md transition-shadow cursor-pointer" />
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">No photos uploaded yet.</div>
            )}
          </div>

          <div>
            <Link href="/track">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 font-medium">
                <Eye className="w-3 h-3" /> Customer View
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <img src={logoImg} alt="Clear Gator Logo" className="h-12 w-12 object-contain" />
          </div>
          <h1 className="text-2xl font-black mb-1">Staff Portal</h1>
          <p className="text-muted-foreground text-sm">Enter your password to access the admin dashboard.</p>
        </div>

        <Card className="border-card-border shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Enter password"
                    className="pl-9"
                    data-testid="input-admin-password"
                  />
                </div>
                {error && (
                  <p className="text-destructive text-xs flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                    Incorrect password. Try again.
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full font-semibold" data-testid="button-admin-login">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 p-3.5 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-border/50 text-center">
          Demo password: <span className="font-mono font-bold text-foreground">{ADMIN_PASSWORD}</span>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [authenticated, setAuthenticated] = useState(false);

  const jobsQuery = useQuery<Job[]>({ queryKey: ["/api/jobs"], enabled: authenticated });
  const estimatesQuery = useQuery<Estimate[]>({ queryKey: ["/api/estimates"], enabled: authenticated });

  const statsQuery = useQuery<{ totalJobs: number; inProgress: number; completed: number; pendingEstimates: number }>(
    { queryKey: ["/api/admin/stats"], enabled: authenticated }
  );

  const updateEstimateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/estimates/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/estimates"] });
      toast({ title: "Estimate updated" });
    },
  });

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  const jobs = jobsQuery.data || [];
  const estimates = estimatesQuery.data || [];
  const stats = statsQuery.data;

  const statCards = [
    { label: "Total Jobs", value: stats?.totalJobs ?? "—", icon: LayoutDashboard, iconBg: "bg-primary/10", iconColor: "text-primary", valueBg: "text-primary" },
    { label: "In Progress", value: stats?.inProgress ?? "—", icon: Wrench, iconBg: "bg-gator-orange/10", iconColor: "text-gator-orange", valueBg: "text-gator-orange" },
    { label: "Completed", value: stats?.completed ?? "—", icon: CheckCircle2, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600 dark:text-emerald-400", valueBg: "text-emerald-600 dark:text-emerald-400" },
    { label: "Pending Estimates", value: stats?.pendingEstimates ?? "—", icon: TrendingUp, iconBg: "bg-blue-500/10", iconColor: "text-blue-600 dark:text-blue-400", valueBg: "text-blue-600 dark:text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Clear Gator Logo" className="h-9 w-9 object-contain" />
              <div>
                <div className="font-black text-sm leading-none">Clear Gator</div>
                <div className="text-xs text-muted-foreground leading-none mt-0.5">Admin Dashboard</div>
              </div>
            </div>
          </div>
          <CreateJobDialog onCreated={() => qc.invalidateQueries({ queryKey: ["/api/jobs"] })} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, iconBg, iconColor, valueBg }) => (
            <Card key={label} className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                  <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                </div>
                <div className={`text-3xl font-black ${valueBg}`}>{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="jobs">
          <TabsList data-testid="admin-tabs" className="h-10">
            <TabsTrigger value="jobs" data-testid="tab-jobs" className="gap-2 font-semibold">
              <Wrench className="w-3.5 h-3.5" /> Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="estimates" data-testid="tab-estimates" className="gap-2 font-semibold">
              <FileText className="w-3.5 h-3.5" /> Estimates ({estimates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-4">
            {jobsQuery.isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-muted/10">
                <LayoutDashboard className="w-10 h-10 mx-auto mb-3 opacity-25" />
                <p className="font-bold text-foreground/60">No jobs yet</p>
                <p className="text-sm mt-1">Create your first job using the "New Job" button above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <JobRow
                    key={job.id}
                    job={job}
                    onUpdated={() => qc.invalidateQueries({ queryKey: ["/api/jobs"] })}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="estimates" className="mt-4">
            {estimatesQuery.isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)}</div>
            ) : estimates.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-muted/10">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-25" />
                <p className="font-bold text-foreground/60">No estimates yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {estimates.map((est) => (
                  <Card key={est.id} className="border-card-border shadow-sm" data-testid={`estimate-row-${est.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-bold text-sm">{est.name}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${ESTIMATE_STATUS_COLORS[est.status] || ESTIMATE_STATUS_COLORS["Pending"]}`}>
                              {est.status}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs font-medium mb-2">{est.serviceType}</Badge>
                        </div>
                        <Select value={est.status} onValueChange={(v) => updateEstimateMutation.mutate({ id: est.id, status: v })}>
                          <SelectTrigger className="h-8 text-xs w-28 flex-shrink-0" data-testid={`select-estimate-status-${est.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Pending", "Reviewed", "Quoted", "Declined"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{est.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3" />
                          {est.phone}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{est.location}</span>
                        </div>
                      </div>

                      {est.description && (
                        <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2 border-t border-border/50 pt-3">{est.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
