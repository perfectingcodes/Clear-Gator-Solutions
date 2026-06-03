import { useState, useRef, useMemo } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  ArrowLeft, Plus, Upload, Clock, CheckCircle2, Wrench, PauseCircle,
  Calendar, Eye, LayoutDashboard, FileText, Lock, TrendingUp,
  ChevronDown, ChevronUp, Mail, Phone, MapPin, DollarSign, User,
  Users, BarChart3, Workflow, LogOut, ExternalLink, Search,
  Building2, Trash2, PencilLine, MoreHorizontal,
} from "lucide-react";
import type { Job, JobPhoto, Estimate, CrewMember, AnalyticsEvent } from "@shared/schema";
import {
  JOB_STATUSES, SERVICE_TYPES,
  ESTIMATE_STAGES, CREW_ROLES, CREW_STATUSES,
} from "@shared/schema";

const ADMIN_PASSWORD = "cleargator2024";
const AUTH_KEY = "cg_admin_auth_v1";

/* ─────────────────────────────────────────────────────────────
   Status colors / icons
   ───────────────────────────────────────────────────────────── */
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
const ESTIMATE_STAGE_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  Contacted: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
  Quoted: "bg-primary/10 text-primary border-primary/25",
  Won: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Lost: "bg-destructive/10 text-destructive border-destructive/30",
};
const CREW_STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "On Job": "bg-gator-orange/12 text-gator-orange-dark dark:text-gator-orange-light border-gator-orange/30",
  "Off Duty": "bg-muted text-muted-foreground border-border",
  "On Leave": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
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

function SectionHeader({ eyebrow, title, description, actions }: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <div className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gator-orange mb-2">
          {eyebrow}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm mt-2 max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Create Job dialog
   ───────────────────────────────────────────────────────────── */
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

function CreateJobDialog({ onCreated, children }: { onCreated: () => void; children?: React.ReactNode }) {
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
      toast({ title: "Job created", description: `Job ID: ${data.jobId}` });
      setOpen(false);
      form.reset();
      onCreated();
    },
    onError: () => toast({ title: "Failed to create job", variant: "destructive" }),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button data-testid="button-create-job" className="gap-2 font-semibold rounded-md">
            <Plus className="w-4 h-4" /> New Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display font-semibold">Create New Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs uppercase tracking-wider">Job Title</FormLabel>
                <FormControl><Input {...field} placeholder="Post-Construction Cleanup — Main St" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="serviceType" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs uppercase tracking-wider">Service</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                    <SelectContent>{SERVICE_TYPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="scheduledDate" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs uppercase tracking-wider">Scheduled</FormLabel>
                  <FormControl><Input {...field} type="date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="customerName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs uppercase tracking-wider">Customer</FormLabel>
                  <FormControl><Input {...field} placeholder="Jane Smith" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="customerPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs uppercase tracking-wider">Phone</FormLabel>
                  <FormControl><Input {...field} placeholder="(239) 555-0000" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="customerEmail" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs uppercase tracking-wider">Email</FormLabel>
                <FormControl><Input {...field} placeholder="customer@email.com" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs uppercase tracking-wider">Location</FormLabel>
                <FormControl><Input {...field} placeholder="123 Main St, Cape Coral, FL" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs uppercase tracking-wider">Description (optional)</FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Project details..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="invoiceAmount" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs uppercase tracking-wider">Invoice $ (optional)</FormLabel>
                <FormControl><Input {...field} placeholder="0.00" type="number" step="0.01" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="submit" disabled={createMutation.isPending} className="font-semibold">
                {createMutation.isPending ? "Creating..." : "Create Job"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────────────────────
   Job row
   ───────────────────────────────────────────────────────────── */
function JobRow({ job, onUpdated }: { job: Job; onUpdated: () => void }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showDetail, setShowDetail] = useState(false);
  const [uploadPending, setUploadPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photosQuery = useQuery<JobPhoto[]>({
    queryKey: ["/api/jobs", job.id, "photos"],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/${job.id}/photos`);
      return res.json();
    },
    enabled: showDetail,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/jobs/${job.id}`, { status });
      return res.json();
    },
    onSuccess: () => { onUpdated(); toast({ title: "Status updated" }); },
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
      toast({ title: "Photo uploaded" });
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
    <div className={`border border-card-border border-l-4 ${leftBorder} rounded-lg bg-card overflow-hidden`}>
      <div className="p-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono text-xs text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">{job.jobId}</span>
            <StatusBadge status={job.status} />
            <Badge variant="outline" className="text-xs font-medium">{job.serviceType}</Badge>
          </div>
          <div className="font-display font-semibold text-base tracking-tight">{job.title}</div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 flex-wrap">
            <User className="w-3 h-3" />
            {job.customerName}
            <span className="text-border mx-1">·</span>
            <MapPin className="w-3 h-3" />
            {job.location}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={job.status} onValueChange={(v) => updateStatusMutation.mutate(v)}>
            <SelectTrigger className="h-8 text-xs w-36 rounded-md"><SelectValue /></SelectTrigger>
            <SelectContent>{JOB_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} capture="environment" />
          <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadPending} className="rounded-md">
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            {uploadPending ? "Uploading..." : "Photo"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowDetail(!showDetail)} className="gap-1 rounded-md">
            {showDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-xs">{showDetail ? "Hide" : "Details"}</span>
          </Button>
        </div>
      </div>
      {showDetail && (
        <div className="border-t border-card-border p-4 space-y-4 bg-muted/20">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { icon: Mail, label: "Email", value: job.customerEmail },
              { icon: Phone, label: "Phone", value: job.customerPhone },
              { icon: DollarSign, label: "Invoice", value: job.invoiceAmount ? `$${parseFloat(job.invoiceAmount).toFixed(2)} — ${job.invoicePaid ? "Paid" : "Unpaid"}` : "Not set" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-background rounded-lg p-3 border border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Icon className="w-3 h-3" />{label}</div>
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
                  <img key={p.id} src={p.url} alt={p.caption || "Photo"} className="aspect-square rounded-lg object-cover border border-card-border" />
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">No photos yet.</div>
            )}
          </div>
          <Link href="/track">
            <Button size="sm" variant="outline" className="text-xs gap-1.5 font-medium rounded-md">
              <Eye className="w-3 h-3" /> Customer View
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Overview
   ───────────────────────────────────────────────────────────── */
function OverviewSection({ stats, jobs, estimates, crew }: {
  stats: { totalJobs: number; inProgress: number; completed: number; pendingEstimates: number } | undefined;
  jobs: Job[]; estimates: Estimate[]; crew: CrewMember[];
}) {
  const statCards = [
    { label: "Total Jobs",        value: stats?.totalJobs ?? "—",      icon: LayoutDashboard, color: "text-primary" },
    { label: "Active",            value: stats?.inProgress ?? "—",     icon: Wrench,          color: "text-gator-orange" },
    { label: "Completed",         value: stats?.completed ?? "—",      icon: CheckCircle2,    color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Open Leads",        value: stats?.pendingEstimates ?? "—", icon: TrendingUp,    color: "text-blue-600 dark:text-blue-400" },
  ];
  const recentLeads = estimates.slice(0, 5);
  const activeJobs = jobs.filter((j) => j.status === "In Progress").slice(0, 5);
  const onJobCrew = crew.filter((c) => c.status === "On Job");

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="00 / Overview"
        title="Today at a glance."
        description="High-level numbers for jobs, leads, crew, and recent activity."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} strokeWidth={2.2} />
            </div>
            <div className={`font-display text-3xl font-semibold tracking-tight leading-none ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-card-border rounded-lg bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mb-1">Active</div>
              <div className="font-display text-lg font-semibold">In-progress jobs</div>
            </div>
            <Badge variant="outline">{activeJobs.length}</Badge>
          </div>
          {activeJobs.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground text-sm">Nothing in progress right now.</div>
          ) : (
            <ul className="divide-y divide-border/70">
              {activeJobs.map((j) => (
                <li key={j.id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-muted-foreground">{j.jobId}</div>
                    <div className="font-semibold text-sm truncate">{j.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{j.customerName} · {j.location}</div>
                  </div>
                  <StatusBadge status={j.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-card-border rounded-lg bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mb-1">Crew</div>
              <div className="font-display text-lg font-semibold">On the clock</div>
            </div>
            <Badge variant="outline">{onJobCrew.length}/{crew.length}</Badge>
          </div>
          {crew.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground text-sm">Add crew in the Crew tab.</div>
          ) : (
            <ul className="divide-y divide-border/70">
              {crew.slice(0, 5).map((c) => (
                <li key={c.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${CREW_STATUS_COLORS[c.status] || ""}`}>
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border border-card-border rounded-lg bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mb-1">Recent</div>
            <div className="font-display text-lg font-semibold">Latest leads</div>
          </div>
          <Badge variant="outline">{estimates.length}</Badge>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">No leads yet.</div>
        ) : (
          <ul className="divide-y divide-border/70">
            {recentLeads.map((e) => (
              <li key={e.id} className="px-5 py-4 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{e.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{e.location} · {e.serviceType}</div>
                </div>
                <a href={`tel:${e.phone}`} className="text-xs font-medium font-mono text-foreground hover:text-gator-orange">{e.phone}</a>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${ESTIMATE_STAGE_COLORS[e.status] || ""}`}>{e.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Pipeline (kanban)
   ───────────────────────────────────────────────────────────── */
function PipelineSection({ estimates, onUpdated }: { estimates: Estimate[]; onUpdated: () => void }) {
  const { toast } = useToast();
  const updateStage = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/estimates/${id}`, { status });
      return res.json();
    },
    onSuccess: () => { onUpdated(); toast({ title: "Lead moved" }); },
    onError: () => toast({ title: "Failed to update", variant: "destructive" }),
  });

  const cols = useMemo(() => {
    const map: Record<string, Estimate[]> = {};
    ESTIMATE_STAGES.forEach((s) => (map[s] = []));
    estimates.forEach((e) => {
      const stage = (ESTIMATE_STAGES as readonly string[]).includes(e.status) ? e.status : "Pending";
      map[stage].push(e);
    });
    return map;
  }, [estimates]);

  function handleDrop(e: React.DragEvent, stage: string) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) updateStage.mutate({ id, status: stage });
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="01 / Pipeline"
        title="Lead pipeline."
        description="Drag a card across stages as leads move from first contact to a closed win."
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 -mx-1">
        {ESTIMATE_STAGES.map((stage) => (
          <div
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage)}
            className="bg-muted/30 border border-border/60 rounded-lg p-3 min-h-[280px]"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${ESTIMATE_STAGE_COLORS[stage] || ""}`}>
                {stage}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{cols[stage].length}</span>
            </div>
            <div className="space-y-2.5">
              {cols[stage].length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border/60 rounded-md">Empty</div>
              )}
              {cols[stage].map((e) => (
                <div
                  key={e.id}
                  draggable
                  onDragStart={(ev) => ev.dataTransfer.setData("text/plain", e.id)}
                  className="bg-background border border-card-border rounded-md p-3 cursor-grab active:cursor-grabbing hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-semibold text-sm truncate">{e.name}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-medium mb-2">{e.serviceType}</Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3" /> {e.location}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <a href={`tel:${e.phone}`} className="font-mono text-foreground hover:text-gator-orange">{e.phone}</a>
                    <Select value={e.status} onValueChange={(v) => updateStage.mutate({ id: e.id, status: v })}>
                      <SelectTrigger className="h-6 px-1 text-[10px] w-auto border-0 hover:bg-muted/50">
                        <MoreHorizontal className="w-3 h-3" />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTIMATE_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Jobs
   ───────────────────────────────────────────────────────────── */
function JobsSection({ jobs, loading, onUpdated, onCreated }: { jobs: Job[]; loading: boolean; onUpdated: () => void; onCreated: () => void }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return jobs;
    const lc = q.toLowerCase();
    return jobs.filter((j) =>
      [j.jobId, j.title, j.customerName, j.customerEmail, j.location].some((v) => v?.toLowerCase().includes(lc))
    );
  }, [q, jobs]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="02 / Jobs"
        title="Active job ledger."
        description="Every job with its status, customer info, photos, and invoice."
        actions={<CreateJobDialog onCreated={onCreated} />}
      />
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs by ID, customer, location..." className="pl-9 rounded-md" />
      </div>
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={LayoutDashboard} title={q ? "No matches" : "No jobs yet"} body={q ? "Try a different search." : "Create your first job to get started."} />
      ) : (
        <div className="space-y-3">
          {filtered.map((j) => <JobRow key={j.id} job={j} onUpdated={onUpdated} />)}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Leads (list with filters)
   ───────────────────────────────────────────────────────────── */
function LeadsSection({ estimates, onUpdated }: { estimates: Estimate[]; onUpdated: () => void }) {
  const [filter, setFilter] = useState<string>("All");
  const [q, setQ] = useState("");
  const updateStage = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/estimates/${id}`, { status });
      return res.json();
    },
    onSuccess: () => onUpdated(),
  });
  const filtered = useMemo(() => {
    return estimates.filter((e) => {
      if (filter !== "All" && e.status !== filter) return false;
      if (!q.trim()) return true;
      const lc = q.toLowerCase();
      return [e.name, e.email, e.phone, e.serviceType, e.location, e.description].some((v) => v?.toLowerCase().includes(lc));
    });
  }, [estimates, filter, q]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="03 / Leads"
        title="All incoming leads."
        description="Estimate requests from the website, sorted by recency. Update stage to move through the pipeline."
      />
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads..." className="pl-9 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          {(["All", ...ESTIMATE_STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md border font-semibold transition-colors ${
                filter === s ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No leads found" body="Leads from the estimate form will show up here." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((est) => (
            <Card key={est.id} className="border-card-border rounded-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-semibold text-base tracking-tight">{est.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] font-medium">{est.serviceType}</Badge>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${ESTIMATE_STAGE_COLORS[est.status] || ""}`}>{est.status}</span>
                    </div>
                  </div>
                  <Select value={est.status} onValueChange={(v) => updateStage.mutate({ id: est.id, status: v })}>
                    <SelectTrigger className="h-8 text-xs w-28 rounded-md"><SelectValue /></SelectTrigger>
                    <SelectContent>{ESTIMATE_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <a href={`mailto:${est.email}`} className="flex items-center gap-1.5 hover:text-foreground"><Mail className="w-3 h-3" /><span className="truncate">{est.email}</span></a>
                  <a href={`tel:${est.phone}`} className="flex items-center gap-1.5 font-mono hover:text-gator-orange"><Phone className="w-3 h-3" />{est.phone}</a>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /><span className="truncate">{est.location}</span></div>
                </div>
                {est.description && (
                  <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3 border-t border-border/50 pt-3">{est.description}</p>
                )}
                {est.createdAt && (
                  <div className="text-[10px] font-mono text-muted-foreground/70 mt-3">
                    {new Date(est.createdAt).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Crew CRM
   ───────────────────────────────────────────────────────────── */
const crewSchema = z.object({
  name: z.string().min(2, "Name required"),
  role: z.string().min(1, "Role required"),
  phone: z.string().min(7, "Phone required"),
  email: z.string().email().optional().or(z.literal("")),
  status: z.string().default("Active"),
  specialty: z.string().optional().or(z.literal("")),
  emergencyContact: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  hiredAt: z.string().optional().or(z.literal("")),
});
type CrewData = z.infer<typeof crewSchema>;

function CrewDialog({ crew, onSaved, children }: { crew?: CrewMember; onSaved: () => void; children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<CrewData>({
    resolver: zodResolver(crewSchema),
    defaultValues: {
      name: crew?.name || "",
      role: crew?.role || "",
      phone: crew?.phone || "",
      email: crew?.email || "",
      status: crew?.status || "Active",
      specialty: crew?.specialty || "",
      emergencyContact: crew?.emergencyContact || "",
      notes: crew?.notes || "",
      hiredAt: crew?.hiredAt || "",
    },
  });
  const save = useMutation({
    mutationFn: async (data: CrewData) => {
      const body = {
        ...data,
        email: data.email || null,
        specialty: data.specialty || null,
        emergencyContact: data.emergencyContact || null,
        notes: data.notes || null,
        hiredAt: data.hiredAt || null,
      };
      if (crew) {
        const res = await apiRequest("PATCH", `/api/crew/${crew.id}`, body);
        return res.json();
      }
      const res = await apiRequest("POST", "/api/crew", body);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: crew ? "Crew member updated" : "Crew member added" });
      setOpen(false);
      onSaved();
      if (!crew) form.reset();
    },
    onError: () => toast({ title: "Failed to save", variant: "destructive" }),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-display font-semibold">{crew ? "Edit crew member" : "Add crew member"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => save.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                    <SelectContent>{CREW_ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                <FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{CREW_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                <FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Phone</FormLabel><FormControl><Input {...field} placeholder="(239) 555-0000" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Email (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="specialty" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Specialty (optional)</FormLabel><FormControl><Input {...field} placeholder="Concrete saw, dump truck CDL..." /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="emergencyContact" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Emergency contact</FormLabel><FormControl><Input {...field} placeholder="Name + phone" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="hiredAt" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Hired</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem><FormLabel className="text-xs uppercase tracking-wider font-semibold">Notes</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter>
              <Button type="submit" disabled={save.isPending} className="font-semibold">{save.isPending ? "Saving..." : crew ? "Save changes" : "Add crew member"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function CrewSection({ crew, loading, onChanged }: { crew: CrewMember[]; loading: boolean; onChanged: () => void }) {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const remove = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/crew/${id}`),
    onSuccess: () => { toast({ title: "Crew member removed" }); onChanged(); },
    onError: () => toast({ title: "Failed to remove", variant: "destructive" }),
  });
  const filtered = useMemo(() => {
    if (!q.trim()) return crew;
    const lc = q.toLowerCase();
    return crew.filter((c) => [c.name, c.role, c.phone, c.specialty].some((v) => v?.toLowerCase().includes(lc)));
  }, [q, crew]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="04 / Crew"
        title="The roster."
        description="Internal CRM for crew members. Tap a phone number to call directly from the office."
        actions={
          <CrewDialog onSaved={onChanged}>
            <Button className="gap-2 font-semibold rounded-md"><Plus className="w-4 h-4" /> Add Crew</Button>
          </CrewDialog>
        }
      />
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search crew by name, role, specialty..." className="pl-9 rounded-md" />
      </div>
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-lg" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title={q ? "No matches" : "No crew yet"} body={q ? "Try a different search." : "Add your first crew member to get started."} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="border border-card-border rounded-lg bg-card overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-md bg-foreground text-background flex items-center justify-center font-display font-semibold text-base flex-shrink-0">
                      {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-base tracking-tight truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.role}{c.specialty ? ` · ${c.specialty}` : ""}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${CREW_STATUS_COLORS[c.status] || ""}`}>{c.status}</span>
                </div>
                <a href={`tel:${c.phone}`} className="group flex items-center gap-3 p-3 rounded-md bg-muted/40 border border-border/60 hover:border-gator-orange hover:bg-gator-orange/5 transition-colors mb-2">
                  <div className="w-9 h-9 rounded-md bg-gator-orange text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <div className="leading-tight">
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Tap to call</div>
                    <div className="font-display font-semibold text-sm">{c.phone}</div>
                  </div>
                </a>
                {c.email && (
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-1.5">
                    <Mail className="w-3 h-3" /> <span className="truncate">{c.email}</span>
                  </a>
                )}
                {c.emergencyContact && (
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mb-1.5"><User className="w-3 h-3" /> Emergency: {c.emergencyContact}</div>
                )}
                {c.hiredAt && (
                  <div className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3" /> Hired {c.hiredAt}</div>
                )}
                {c.notes && (
                  <div className="mt-3 pt-3 border-t border-border/60 text-xs text-foreground/75 leading-relaxed">{c.notes}</div>
                )}
              </div>
              <div className="px-5 py-3 border-t border-border/60 flex items-center justify-between bg-muted/20">
                <CrewDialog crew={c} onSaved={onChanged}>
                  <Button size="sm" variant="ghost" className="text-xs gap-1.5 -ml-2"><PencilLine className="w-3 h-3" /> Edit</Button>
                </CrewDialog>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
                  onClick={() => { if (confirm(`Remove ${c.name}?`)) remove.mutate(c.id); }}
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section: Analytics
   ───────────────────────────────────────────────────────────── */
type AnalyticsSummary = {
  range: { from: string; to: string; days: number };
  totals: { pageviews: number; sessions: number; formSubmits: number; calls: number; conversionRate: number };
  byDay: { date: string; pageviews: number; sessions: number; submits: number }[];
  topPaths: { path: string; views: number }[];
  recent: AnalyticsEvent[];
};

function AnalyticsSection() {
  const [days, setDays] = useState(30);
  const summary = useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics/summary", days],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/summary?days=${days}`);
      return res.json();
    },
    refetchInterval: 60_000,
  });

  const data = summary.data;
  const maxPv = Math.max(1, ...((data?.byDay || []).map((d) => d.pageviews)));

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="05 / Analytics"
        title="Site analytics."
        description="Real first-party traffic, leads, and conversion data — collected from the live website."
        actions={
          <div className="flex items-center gap-1 text-xs">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded-md border font-semibold transition-colors ${
                  days === d ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-border/60 ring-1 ring-border/60 rounded-lg overflow-hidden">
        {[
          { label: "Pageviews",      value: data?.totals.pageviews   ?? "—", color: "text-foreground" },
          { label: "Sessions",       value: data?.totals.sessions    ?? "—", color: "text-primary" },
          { label: "Form Submits",   value: data?.totals.formSubmits ?? "—", color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Tap-to-Call",    value: data?.totals.calls       ?? "—", color: "text-gator-orange" },
          { label: "Conversion",     value: data ? `${(data.totals.conversionRate * 100).toFixed(1)}%` : "—", color: "text-blue-600 dark:text-blue-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card p-6 flex flex-col gap-2">
            <span className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground">{label}</span>
            <div className={`font-display text-3xl font-semibold tracking-tight leading-none ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-card-border rounded-lg bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Traffic</div>
              <div className="font-display text-lg font-semibold">Pageviews over time</div>
            </div>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          {summary.isLoading ? (
            <Skeleton className="h-48" />
          ) : !data?.byDay.length ? (
            <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">No traffic recorded yet.</div>
          ) : (
            <div className="flex items-end gap-1 h-48">
              {data.byDay.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{d.pageviews}</div>
                  <div
                    className="w-full bg-gator-orange/80 hover:bg-gator-orange rounded-t-sm transition-colors"
                    style={{ height: `${Math.max(2, (d.pageviews / maxPv) * 100)}%` }}
                    title={`${d.date}: ${d.pageviews} pageviews`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-card-border rounded-lg bg-card p-5">
          <div className="mb-4">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Top pages</div>
            <div className="font-display text-lg font-semibold">Most visited</div>
          </div>
          {summary.isLoading ? (
            <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8" />)}</div>
          ) : !data?.topPaths.length ? (
            <div className="text-sm text-muted-foreground">No pageviews yet.</div>
          ) : (
            <ul className="space-y-2">
              {data.topPaths.map((p) => (
                <li key={p.path} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-xs truncate">{p.path}</span>
                  <span className="font-display font-semibold tabular-nums">{p.views}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border border-card-border rounded-lg bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Live</div>
            <div className="font-display text-lg font-semibold">Recent events</div>
          </div>
          <Badge variant="outline">Auto-refresh 60s</Badge>
        </div>
        {summary.isLoading ? (
          <div className="p-5"><Skeleton className="h-44" /></div>
        ) : !data?.recent.length ? (
          <div className="p-10 text-center text-muted-foreground text-sm">No events captured in this window.</div>
        ) : (
          <ul className="divide-y divide-border/70 max-h-[420px] overflow-y-auto">
            {data.recent.map((e) => (
              <li key={e.id} className="px-5 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-1 rounded-md border border-border/60 text-muted-foreground">{e.type}</span>
                <span className="font-mono text-xs truncate">{e.path || "—"}</span>
                <span className="text-[11px] font-mono text-muted-foreground">{e.createdAt ? new Date(e.createdAt).toLocaleTimeString() : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Misc helpers
   ───────────────────────────────────────────────────────────── */
function EmptyState({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-border/60 rounded-xl bg-muted/10">
      <Icon className="w-10 h-10 mx-auto mb-3 opacity-25" />
      <p className="font-display font-semibold">{title}</p>
      <p className="text-sm mt-1 text-muted-foreground">{body}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Login
   ───────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      try { localStorage.setItem(AUTH_KEY, "1"); } catch {}
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Clear Gator Logo" className="h-20 w-20 mx-auto object-contain mb-5" />
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-2">Staff Portal</div>
          <h1 className="font-display text-2xl font-semibold tracking-tight mb-1">Sign in</h1>
          <p className="text-muted-foreground text-sm">Authorized staff only.</p>
        </div>
        <Card className="border-card-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} placeholder="Password" className="pl-9 rounded-md" />
              </div>
              {error && <p className="text-destructive text-xs">Incorrect password.</p>}
              <Button type="submit" className="w-full font-semibold rounded-md">Sign In</Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Demo password: <span className="font-mono font-semibold text-foreground">{ADMIN_PASSWORD}</span>
        </div>
        <div className="mt-3 text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sidebar nav
   ───────────────────────────────────────────────────────────── */
type SectionId = "overview" | "pipeline" | "jobs" | "leads" | "crew" | "analytics";

const NAV: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard },
  { id: "pipeline",  label: "Pipeline",  icon: Workflow },
  { id: "jobs",      label: "Jobs",      icon: Building2 },
  { id: "leads",     label: "Leads",     icon: FileText },
  { id: "crew",      label: "Crew",      icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

function Sidebar({ section, onSelect, onLogout, counts }: {
  section: SectionId;
  onSelect: (s: SectionId) => void;
  onLogout: () => void;
  counts: Partial<Record<SectionId, number>>;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-ink text-white/85 border-r border-white/5 fixed top-0 left-0 h-screen p-5">
      <Link href="/" className="flex items-center gap-3 mb-10 group">
        <img src={logoImg} alt="Clear Gator Logo" className="h-11 w-11 object-contain transition-transform group-hover:scale-[1.04]" />
        <div className="leading-none">
          <div className="font-display font-semibold text-lg tracking-[-0.02em] text-white">Clear Gator</div>
          <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-white/45 mt-1">Staff Portal</div>
        </div>
      </Link>

      <nav className="space-y-1 flex-1">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = section === id;
          const n = counts[id];
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" strokeWidth={2} />
                {label}
              </span>
              {typeof n === "number" && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${active ? "bg-white/15" : "bg-white/5 text-white/45"}`}>
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-5 mt-5 border-t border-white/8 space-y-3">
        <Link href="/" className="flex items-center gap-2 text-xs text-white/55 hover:text-white">
          <ExternalLink className="w-3.5 h-3.5" />
          View website
        </Link>
        <button onClick={onLogout} className="flex items-center gap-2 text-xs text-white/55 hover:text-white">
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
        <div className="pt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">
          Let's Gator Done.
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ section, onSelect }: { section: SectionId; onSelect: (s: SectionId) => void }) {
  return (
    <div className="lg:hidden sticky top-0 z-30 bg-ink text-white border-b border-white/10 overflow-x-auto">
      <div className="flex items-center px-3 py-2 gap-1 whitespace-nowrap">
        <Link href="/" className="flex items-center gap-2 mr-3 flex-shrink-0">
          <img src={logoImg} alt="Clear Gator" className="h-7 w-7 object-contain" />
          <span className="font-display font-semibold text-sm">Clear Gator</span>
        </Link>
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = section === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                active ? "bg-white/12 text-white" : "text-white/55 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function AdminPage() {
  usePageMeta({
    title: "Staff Portal — Clear Gator Construction Services",
    description: "Internal admin: leads, pipeline, jobs, crew CRM, and site analytics.",
  });
  const qc = useQueryClient();
  const [authenticated, setAuthenticated] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === "1"; } catch { return false; }
  });
  const [section, setSection] = useState<SectionId>("overview");

  const jobsQuery = useQuery<Job[]>({ queryKey: ["/api/jobs"], enabled: authenticated });
  const estimatesQuery = useQuery<Estimate[]>({ queryKey: ["/api/estimates"], enabled: authenticated });
  const crewQuery = useQuery<CrewMember[]>({ queryKey: ["/api/crew"], enabled: authenticated });
  const statsQuery = useQuery<{ totalJobs: number; inProgress: number; completed: number; pendingEstimates: number }>(
    { queryKey: ["/api/admin/stats"], enabled: authenticated }
  );

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  const jobs = jobsQuery.data || [];
  const estimates = estimatesQuery.data || [];
  const crew = crewQuery.data || [];
  const stats = statsQuery.data;

  const refresh = (key: string) => qc.invalidateQueries({ queryKey: [key] });
  const refreshAll = () => {
    refresh("/api/jobs");
    refresh("/api/estimates");
    refresh("/api/crew");
    refresh("/api/admin/stats");
  };

  const counts: Partial<Record<SectionId, number>> = {
    pipeline: estimates.length,
    jobs: jobs.length,
    leads: estimates.length,
    crew: crew.length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        section={section}
        onSelect={setSection}
        onLogout={() => { try { localStorage.removeItem(AUTH_KEY); } catch {}; setAuthenticated(false); }}
        counts={counts}
      />
      <MobileNav section={section} onSelect={setSection} />

      <main className="lg:ml-64 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-10 py-10 lg:py-12 max-w-6xl mx-auto">
          {section === "overview"  && <OverviewSection  stats={stats} jobs={jobs} estimates={estimates} crew={crew} />}
          {section === "pipeline"  && <PipelineSection  estimates={estimates} onUpdated={() => refresh("/api/estimates")} />}
          {section === "jobs"      && <JobsSection      jobs={jobs} loading={jobsQuery.isLoading} onUpdated={refreshAll} onCreated={refreshAll} />}
          {section === "leads"     && <LeadsSection     estimates={estimates} onUpdated={() => refresh("/api/estimates")} />}
          {section === "crew"      && <CrewSection      crew={crew} loading={crewQuery.isLoading} onChanged={() => refresh("/api/crew")} />}
          {section === "analytics" && <AnalyticsSection />}
        </div>
      </main>
    </div>
  );
}
