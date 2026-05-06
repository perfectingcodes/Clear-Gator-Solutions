import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoImg from "@assets/clear_gator_1775663894887.png";
import {
  ArrowLeft, Search, CheckCircle2, Clock, Wrench, PauseCircle,
  MapPin, User, Phone, Mail, ImageIcon, DollarSign, Calendar, X
} from "lucide-react";
import type { Job, JobPhoto } from "@shared/schema";

const STATUS_STEPS = ["Scheduled", "In Progress", "Completed"];

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType; label: string; headerBg: string }> = {
  Scheduled: {
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
    icon: Calendar,
    label: "Scheduled",
    headerBg: "from-blue-950/80 to-blue-900/40",
  },
  "In Progress": {
    color: "bg-gator-orange/12 text-gator-orange-dark dark:text-gator-orange-light border-gator-orange/30",
    icon: Wrench,
    label: "In Progress",
    headerBg: "from-[hsl(25_60%_12%)] to-[hsl(25_40%_18%)/0.5]",
  },
  Completed: {
    color: "bg-primary/10 text-primary border-primary/25",
    icon: CheckCircle2,
    label: "Completed",
    headerBg: "from-[hsl(150_40%_8%)] to-[hsl(150_30%_12%)/0.5]",
  },
  "On Hold": {
    color: "bg-muted text-muted-foreground border-border",
    icon: PauseCircle,
    label: "On Hold",
    headerBg: "from-muted/80 to-muted/30",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Scheduled"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold border ${cfg.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

function StatusRail({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.indexOf(status);
  const stepIdx = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div className="flex items-center gap-0 mb-1">
      {STATUS_STEPS.map((s, i) => {
        const done = i < stepIdx;
        const active = i === stepIdx;
        return (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0
                ${done
                  ? "bg-primary border-primary text-primary-foreground"
                  : active
                  ? "bg-gator-orange border-gator-orange text-white shadow-md shadow-gator-orange/30"
                  : "bg-muted border-border text-muted-foreground"
                }`}>
                {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className={`text-xs mt-1 font-medium text-center leading-tight
                ${active ? "text-gator-orange" : done ? "text-primary" : "text-muted-foreground"}`}>
                {s}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-5 rounded-full transition-all
                ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PhotoGrid({ photos }: { photos: JobPhoto[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg bg-muted/20">
        <ImageIcon className="w-10 h-10 mb-3 opacity-30" />
        <p className="text-sm font-semibold">No photos yet</p>
        <p className="text-xs mt-1 text-muted-foreground">Site photos will appear here as your team uploads them.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((p) => (
          <button
            key={p.id}
            type="button"
            data-testid={`photo-${p.id}`}
            onClick={() => setSelected(p.url)}
            className="group relative rounded-lg overflow-hidden bg-muted border border-card-border cursor-pointer aspect-[4/5] hover:shadow-md transition-shadow"
          >
            <img src={p.url} alt={p.caption || "Job site photo"} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {p.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                {p.caption}
              </div>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <img src={selected} alt="Site photo enlarged" className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
}

function JobDetails({ job, photos }: { job: Job; photos: JobPhoto[] }) {
  const cfg = STATUS_CONFIG[job.status] || STATUS_CONFIG["Scheduled"];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className={`rounded-xl bg-gradient-to-br ${cfg.headerBg} border border-card-border p-5`}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded">{job.jobId}</span>
            <h2 className="text-xl font-display font-semibold mt-2 leading-tight">{job.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{job.serviceType}</p>
          </div>
          <StatusBadge status={job.status} />
        </div>
        <StatusRail status={job.status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { icon: User, label: "Customer", value: job.customerName },
          { icon: Phone, label: "Phone", value: job.customerPhone },
          { icon: Mail, label: "Email", value: job.customerEmail },
          { icon: MapPin, label: "Location", value: job.location },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-3.5 rounded-lg bg-muted/40 dark:bg-muted/20 border border-border/50">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium">{label}</div>
              <div className="text-sm font-semibold truncate">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {job.description && (
        <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-4 border border-border/50">
          <div className="text-xs text-muted-foreground font-medium mb-1.5 uppercase tracking-wide">Project Description</div>
          <p className="text-sm leading-relaxed">{job.description}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base">Site Photos</h3>
          <Badge variant="secondary" className="font-semibold">{photos.length} photo{photos.length !== 1 ? "s" : ""}</Badge>
        </div>
        <PhotoGrid photos={photos} />
      </div>

      <Card className="border-card-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            Invoice Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {job.invoiceAmount ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Service Total</span>
                <span className="font-bold text-base">${parseFloat(job.invoiceAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="font-semibold text-sm">Payment Status</span>
                {job.invoicePaid ? (
                  <Badge className="bg-primary/10 text-primary border-primary/25 font-bold">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="font-semibold">Pending</Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">Invoice not yet generated. We'll update this as work progresses.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function TrackPage() {
  usePageMeta({
    title: "Track My Job — Clear Gator Construction Services",
    description:
      "Track your Clear Gator job in real time. Use your Job ID to view live progress, site photos, and your invoice.",
  });

  const [jobIdInput, setJobIdInput] = useState("");
  const [searchId, setSearchId] = useState<string | null>(null);

  const jobQuery = useQuery<{ job: Job; photos: JobPhoto[] }>({
    queryKey: ["/api/jobs/track", searchId],
    enabled: !!searchId,
  });

  const handleSearch = () => {
    const trimmed = jobIdInput.trim().toUpperCase();
    if (trimmed.length >= 3) {
      setSearchId(trimmed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Clear Gator Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-[1.04]" />
            <div className="leading-none">
              <div className="font-display font-semibold text-sm tracking-[-0.01em]">Clear Gator</div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                Job Tracker
              </div>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-3">
            Track
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.05] mb-3">
            Track your job.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Enter your unique Job ID to see real-time status, site photos, and your invoice.
          </p>
        </div>

        <Card className="mb-8 border-card-border shadow-sm">
          <CardContent className="pt-5 pb-5">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={jobIdInput}
                  onChange={(e) => setJobIdInput(e.target.value)}
                  placeholder="e.g. CG-2024-001"
                  className="font-mono pl-9 text-sm"
                  data-testid="input-job-id"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} data-testid="button-search-job" className="gap-2 flex-shrink-0 font-semibold px-5">
                Track
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Your Job ID was emailed to you after booking. Try <span className="font-mono font-bold text-foreground">CG-2024-DEMO</span> for a demo.
            </p>
          </CardContent>
        </Card>

        {jobQuery.isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-36 rounded-xl" />
            <div className="grid sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-lg" />)}
            </div>
          </div>
        )}

        {jobQuery.isError && searchId && (
          <div className="text-center py-14 text-muted-foreground animate-fade-in border-2 border-dashed border-border rounded-xl bg-muted/10">
            <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 opacity-40" />
            </div>
            <p className="font-bold text-foreground">No job found</p>
            <p className="text-sm mt-1">No results for <span className="font-mono font-bold text-foreground">"{searchId}"</span></p>
            <p className="text-xs mt-2">Double-check your Job ID and try again.</p>
          </div>
        )}

        {jobQuery.data && (
          <JobDetails job={jobQuery.data.job} photos={jobQuery.data.photos} />
        )}

        {!searchId && (
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center text-muted-foreground bg-muted/10">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-semibold text-foreground/60">Your job details will appear here</p>
            <p className="text-xs mt-1">Enter your Job ID above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
