import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import logoImg from "@assets/logo_1772579467504.png";
import {
  ArrowLeft, Search, CheckCircle2, Clock, Wrench, PauseCircle,
  MapPin, User, Phone, Mail, ImageIcon, DollarSign, Calendar
} from "lucide-react";
import type { Job, JobPhoto } from "@shared/schema";

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  Scheduled: { color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", icon: Calendar, label: "Scheduled" },
  "In Progress": { color: "bg-[hsl(25_95%_50%/0.12)] text-[hsl(25_85%_42%)] dark:text-[hsl(25_95%_65%)] border-[hsl(25_95%_50%/0.25)]", icon: Wrench, label: "In Progress" },
  Completed: { color: "bg-primary/10 text-primary border-primary/20", icon: CheckCircle2, label: "Completed" },
  "On Hold": { color: "bg-muted text-muted-foreground border-border", icon: PauseCircle, label: "On Hold" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Scheduled"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold border ${cfg.color}`}>
      <Icon className="w-4 h-4" />
      {cfg.label}
    </span>
  );
}

function PhotoGrid({ photos }: { photos: JobPhoto[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border border-dashed border-border rounded-md">
        <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
        <p className="text-sm font-medium">No photos yet</p>
        <p className="text-xs mt-1">Site photos will appear here as your team uploads them.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((p) => (
          <button
            key={p.id}
            type="button"
            data-testid={`photo-${p.id}`}
            onClick={() => setSelected(p.url)}
            className="group relative aspect-square rounded-md overflow-hidden bg-muted border border-card-border cursor-pointer"
          >
            <img src={p.url} alt={p.caption || "Job site photo"} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            {p.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                {p.caption}
              </div>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="Site photo enlarged" className="max-w-full max-h-full rounded-md object-contain" />
        </div>
      )}
    </>
  );
}

function JobDetails({ job, photos }: { job: Job; photos: JobPhoto[] }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground font-mono">Job #{job.jobId}</span>
          </div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-muted-foreground text-sm mt-1">{job.serviceType}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { icon: User, label: "Customer", value: job.customerName },
          { icon: Phone, label: "Phone", value: job.customerPhone },
          { icon: Mail, label: "Email", value: job.customerEmail },
          { icon: MapPin, label: "Location", value: job.location },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-3 rounded-md bg-muted/40 dark:bg-muted/20">
            <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="text-sm font-medium truncate">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {job.description && (
        <div className="bg-muted/40 dark:bg-muted/20 rounded-md p-4">
          <div className="text-xs text-muted-foreground mb-1">Project Description</div>
          <p className="text-sm leading-relaxed">{job.description}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Site Photos</h3>
          <Badge variant="secondary">{photos.length} photo{photos.length !== 1 ? "s" : ""}</Badge>
        </div>
        <PhotoGrid photos={photos} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" /> Invoice Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {job.invoiceAmount ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Service Total</span>
                <span className="font-semibold">${parseFloat(job.invoiceAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="font-semibold">Payment Status</span>
                {job.invoicePaid ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Invoice not yet generated. We'll update this as work progresses.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function TrackPage() {
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
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Clear Gator Logo" className="h-9 w-9 object-contain" />
            <span className="font-bold">Clear Gator — Track My Job</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Track Your Job</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Enter your unique Job ID to see real-time status, site photos, and your invoice.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input
                value={jobIdInput}
                onChange={(e) => setJobIdInput(e.target.value)}
                placeholder="e.g. CG-2024-001"
                className="font-mono text-base"
                data-testid="input-job-id"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} data-testid="button-search-job" className="gap-2 flex-shrink-0">
                <Search className="w-4 h-4" /> Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {jobQuery.isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-md" />)}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-md" />)}
            </div>
          </div>
        )}

        {jobQuery.isError && searchId && (
          <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No job found for <span className="font-mono text-foreground">"{searchId}"</span></p>
            <p className="text-sm mt-1">Double-check your Job ID and try again.</p>
          </div>
        )}

        {jobQuery.data && (
          <JobDetails job={jobQuery.data.job} photos={jobQuery.data.photos} />
        )}

        {!searchId && (
          <div className="border border-dashed border-border rounded-md p-8 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Your job details will appear here once you search.</p>
            <p className="text-xs mt-1">Your Job ID was sent in your confirmation email.</p>
          </div>
        )}
      </div>
    </div>
  );
}
