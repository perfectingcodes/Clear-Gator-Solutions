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
import logoImg from "@assets/logo_1772579467504.png";
import {
  ArrowLeft, Plus, Upload, Clock, CheckCircle2, Wrench, PauseCircle,
  Calendar, Eye, LayoutDashboard, FileText, Lock
} from "lucide-react";
import type { Job, JobPhoto, Estimate } from "@shared/schema";
import { JOB_STATUSES, SERVICE_TYPES } from "@shared/schema";

const ADMIN_PASSWORD = "cleargator2024";

const STATUS_COLORS: Record<string, string> = {
  Scheduled: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "In Progress": "bg-[hsl(25_95%_50%/0.12)] text-[hsl(25_80%_38%)] dark:text-[hsl(25_95%_65%)] border-[hsl(25_95%_50%/0.25)]",
  Completed: "bg-primary/10 text-primary border-primary/20",
  "On Hold": "bg-muted text-muted-foreground border-border",
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  Scheduled: Calendar,
  "In Progress": Wrench,
  Completed: CheckCircle2,
  "On Hold": PauseCircle,
};

function StatusBadge({ status }: { status: string }) {
  const Icon = STATUS_ICONS[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${STATUS_COLORS[status] || STATUS_COLORS["Scheduled"]}`}>
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
        <Button data-testid="button-create-job" className="gap-2">
          <Plus className="w-4 h-4" /> New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl><Input {...field} placeholder="Post-Construction Cleanup — Main St" data-testid="input-job-title" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="serviceType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
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
                  <FormLabel>Scheduled Date</FormLabel>
                  <FormControl><Input {...field} type="date" data-testid="input-scheduled-date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="customerName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl><Input {...field} placeholder="John Smith" data-testid="input-customer-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="customerPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input {...field} placeholder="(555) 000-0000" data-testid="input-customer-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="customerEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl><Input {...field} placeholder="customer@email.com" data-testid="input-customer-email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Project Location</FormLabel>
                <FormControl><Input {...field} placeholder="123 Main St, Miami, FL" data-testid="input-job-location" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Project details..." data-testid="input-job-description" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="invoiceAmount" render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Amount ($) — optional</FormLabel>
                <FormControl><Input {...field} placeholder="0.00" type="number" step="0.01" data-testid="input-invoice-amount" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={createMutation.isPending} className="w-full" data-testid="button-submit-new-job">
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
  const [photoUploading, setPhotoUploading] = useState(false);
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
    },
    onError: () => toast({ title: "Upload failed", variant: "destructive" }),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadPhotoMutation.mutate(file);
  };

  return (
    <div className="border border-card-border rounded-md bg-card" data-testid={`job-row-${job.id}`}>
      <div className="p-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">{job.jobId}</span>
            <StatusBadge status={job.status} />
          </div>
          <div className="font-semibold text-sm mt-1 truncate">{job.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{job.customerName} — {job.location}</div>
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
            disabled={uploadPhotoMutation.isPending}
            data-testid={`button-upload-photo-${job.id}`}
          >
            <Upload className="w-3.5 h-3.5 mr-1" />
            {uploadPhotoMutation.isPending ? "..." : "Photo"}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowDetail(!showDetail)}
            data-testid={`button-expand-job-${job.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {showDetail && (
        <div className="border-t border-card-border p-4 space-y-3 animate-fade-in">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div><span className="text-muted-foreground text-xs">Email</span><div className="mt-0.5 truncate">{job.customerEmail}</div></div>
            <div><span className="text-muted-foreground text-xs">Phone</span><div className="mt-0.5">{job.customerPhone}</div></div>
            <div><span className="text-muted-foreground text-xs">Service</span><div className="mt-0.5">{job.serviceType}</div></div>
          </div>
          {job.description && (
            <div className="text-sm"><span className="text-muted-foreground text-xs">Description</span><div className="mt-0.5">{job.description}</div></div>
          )}
          {job.invoiceAmount && (
            <div className="text-sm"><span className="text-muted-foreground text-xs">Invoice</span><div className="mt-0.5 font-semibold">${parseFloat(job.invoiceAmount).toFixed(2)} — {job.invoicePaid ? "Paid" : "Unpaid"}</div></div>
          )}
          <div>
            <div className="text-xs text-muted-foreground mb-2">Site Photos</div>
            {photosQuery.isLoading ? (
              <div className="grid grid-cols-4 gap-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded" />)}</div>
            ) : photosQuery.data?.length ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {photosQuery.data.map((p) => (
                  <img key={p.id} src={p.url} alt={p.caption || "Photo"} className="aspect-square rounded object-cover border border-card-border" />
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No photos uploaded yet.</p>
            )}
          </div>
          <div className="pt-1">
            <Link href={`/track`}>
              <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => {}}>
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
      <Card className="w-full max-w-sm animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img src={logoImg} alt="Clear Gator Logo" className="h-20 w-20 object-contain" />
          </div>
          <CardTitle>Staff Portal</CardTitle>
          <CardDescription>Enter your password to access the admin dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Password"
                  className="pl-9"
                  data-testid="input-admin-password"
                />
              </div>
              {error && <p className="text-destructive text-xs">Incorrect password. Try again.</p>}
            </div>
            <Button type="submit" className="w-full" data-testid="button-admin-login">
              Sign In
            </Button>
          </form>
          <div className="mt-4 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground">
            Demo password: <span className="font-mono font-medium">{ADMIN_PASSWORD}</span>
          </div>
        </CardContent>
      </Card>
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Clear Gator Logo" className="h-9 w-9 object-contain" />
              <span className="font-bold">Clear Gator Admin</span>
            </div>
          </div>
          <CreateJobDialog onCreated={() => qc.invalidateQueries({ queryKey: ["/api/jobs"] })} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Jobs", value: stats?.totalJobs ?? "—", icon: LayoutDashboard, color: "text-primary" },
            { label: "In Progress", value: stats?.inProgress ?? "—", icon: Wrench, color: "text-[hsl(25_95%_50%)]" },
            { label: "Completed", value: stats?.completed ?? "—", icon: CheckCircle2, color: "text-primary" },
            { label: "Pending Estimates", value: stats?.pendingEstimates ?? "—", icon: FileText, color: "text-muted-foreground" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="text-2xl font-bold">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="jobs">
          <TabsList data-testid="admin-tabs">
            <TabsTrigger value="jobs" data-testid="tab-jobs">
              <Wrench className="w-3.5 h-3.5 mr-2" /> Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="estimates" data-testid="tab-estimates">
              <FileText className="w-3.5 h-3.5 mr-2" /> Estimates ({estimates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-4">
            {jobsQuery.isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-md" />)}</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-md">
                <LayoutDashboard className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No jobs yet</p>
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
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-md" />)}</div>
            ) : estimates.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-md">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No estimates yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {estimates.map((est) => (
                  <div key={est.id} className="border border-card-border rounded-md bg-card p-4" data-testid={`estimate-row-${est.id}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm">{est.name}</span>
                          <Badge variant={est.status === "Pending" ? "secondary" : "default"} className="text-xs">
                            {est.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{est.email} · {est.phone}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{est.serviceType} — {est.location}</div>
                        <p className="text-sm mt-2 text-foreground/80 line-clamp-2">{est.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Select value={est.status} onValueChange={(v) => updateEstimateMutation.mutate({ id: est.id, status: v })}>
                          <SelectTrigger className="h-8 text-xs w-32" data-testid={`select-estimate-status-${est.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Pending", "Reviewed", "Quoted", "Declined"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
