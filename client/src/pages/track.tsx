import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageMeta } from "@/hooks/use-page-meta";
import MainNav from "@/components/main-nav";
import {
  ArrowRight, Search, CheckCircle2, Clock, Wrench, PauseCircle,
  MapPin, User, Phone, Mail, ImageIcon, DollarSign, Calendar, X, PhoneCall,
} from "lucide-react";
import type { Job, JobPhoto } from "@shared/schema";

const HERO = "/images/stock/florida-home.jpg";
const STATUS_STEPS = ["Scheduled", "In Progress", "Completed"];

const STATUS_CONFIG: Record<string, { icon: React.ElementType; label: string }> = {
  Scheduled:    { icon: Calendar,    label: "Scheduled" },
  "In Progress":{ icon: Wrench,      label: "In Progress" },
  Completed:    { icon: CheckCircle2, label: "Completed" },
  "On Hold":    { icon: PauseCircle, label: "On Hold" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Scheduled"];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-[0.18em] border-2 border-gator-orange bg-gator-orange/10 text-gator-orange">
      <Icon className="w-3.5 h-3.5" strokeWidth={2.4} />
      {cfg.label}
    </span>
  );
}

function StatusRail({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.indexOf(status);
  const stepIdx = currentIdx === -1 ? 0 : currentIdx;

  return (
    <ol className="flex items-center gap-0 mt-5">
      {STATUS_STEPS.map((s, i) => {
        const done = i < stepIdx;
        const active = i === stepIdx;
        return (
          <li key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                  done
                    ? "bg-teal border-teal text-shell"
                    : active
                    ? "bg-gator-orange border-gator-orange text-asphalt shadow-md shadow-gator-orange/30"
                    : "bg-white/5 border-white/15 text-shell/40"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" strokeWidth={2.6} /> : <span className="text-xs font-black">{i + 1}</span>}
              </div>
              <span className={`text-[10px] mt-1.5 font-mono font-black uppercase tracking-[0.18em] ${active ? "text-gator-orange" : done ? "text-teal" : "text-shell/40"}`}>
                {s}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-5 rounded-full ${done ? "bg-teal" : "bg-white/15"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function PhotoGrid({ photos }: { photos: JobPhoto[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-shell/55 border-2 border-dashed border-white/15 rounded-lg bg-white/[0.03]">
        <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
        <p className="text-sm font-black uppercase tracking-tight">No photos yet</p>
        <p className="text-xs mt-1">Site photos will appear here as your team uploads them.</p>
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
            className="group relative rounded-lg overflow-hidden bg-asphalt border border-white/10 cursor-pointer aspect-[4/5] hover:border-gator-orange/50 transition-colors"
          >
            <img src={p.url} alt={p.caption || "Job site photo"} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-asphalt/0 group-hover:bg-asphalt/30 transition-colors" />
            {p.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-transparent text-shell text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                {p.caption}
              </div>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-[80] bg-asphalt/95 flex items-center justify-center p-4"
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
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header card */}
      <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-8 shadow-xl shadow-asphalt/15">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/45 mb-2">
              Job ID · {job.jobId}
            </div>
            <h2 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight tracking-tight text-shell mb-1">
              {job.title}
            </h2>
            <p className="text-shell/65 text-sm font-mono uppercase tracking-[0.18em]">{job.serviceType}</p>
          </div>
          <StatusBadge status={job.status} />
        </div>
        <StatusRail status={job.status} />
      </div>

      {/* Detail cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: User,   label: "Customer", value: job.customerName },
          { icon: Phone,  label: "Phone",    value: job.customerPhone },
          { icon: Mail,   label: "Email",    value: job.customerEmail },
          { icon: MapPin, label: "Location", value: job.location },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-shell border border-asphalt/10">
            <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-asphalt/50 font-mono font-black uppercase tracking-[0.22em] mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-asphalt truncate">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {job.description && (
        <div className="rounded-xl bg-shell border border-asphalt/10 p-5">
          <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-teal mb-2">
            Project Description
          </div>
          <p className="text-sm leading-relaxed text-asphalt">{job.description}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-asphalt">
            Site Photos
          </h3>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-asphalt/50">
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="rounded-xl bg-asphalt p-5">
          <PhotoGrid photos={photos} />
        </div>
      </div>

      <div className="rounded-xl bg-asphalt text-shell p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-md bg-gator-orange flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-asphalt" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-shell/45">Invoice</div>
            <h3 className="font-display font-black uppercase text-lg leading-tight tracking-tight text-shell">
              Payment Summary
            </h3>
          </div>
        </div>
        {job.invoiceAmount ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm pb-3 border-b border-white/10">
              <span className="text-shell/65">Service Total</span>
              <span className="font-display font-black text-lg text-shell">
                ${parseFloat(job.invoiceAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-shell/65">Payment Status</span>
              {job.invoicePaid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-gator-orange bg-gator-orange/10 text-gator-orange font-black uppercase tracking-[0.18em] text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.6} /> Paid
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-md border border-white/15 bg-white/[0.05] text-shell/70 font-black uppercase tracking-[0.18em] text-xs">
                  Pending
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-shell/65 leading-relaxed">Invoice not yet generated. We'll update this as work progresses.</p>
        )}
      </div>
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
    if (trimmed.length >= 3) setSearchId(trimmed);
  };

  return (
    <div className="min-h-screen bg-shell text-asphalt pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <MainNav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt/90 via-asphalt/70 to-teal/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gator-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Live Job Tracker
            </span>
          </div>
          <h1 className="font-display font-black uppercase text-white leading-[0.9] tracking-[-0.035em] text-balance mb-6 max-w-3xl text-[clamp(2.25rem,8vw,6rem)]">
            Track<br />
            <span className="text-gator-orange">Your Job.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-xl leading-[1.5] max-w-2xl text-pretty">
            Enter your Job ID to see real-time status, site photos, and your invoice.
          </p>
        </div>
      </section>

      {/* ── SEARCH + RESULT BODY ── */}
      <section className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Search card */}
          <div className="rounded-2xl bg-asphalt text-shell p-6 sm:p-8 mb-8 shadow-xl shadow-asphalt/15">
            <div className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-gator-orange mb-4">
              Find Your Job
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-shell/40" />
                <Input
                  value={jobIdInput}
                  onChange={(e) => setJobIdInput(e.target.value)}
                  placeholder="e.g. CG-2024-001"
                  className="font-mono pl-9 text-sm h-12 bg-white/[0.05] border-white/15 text-shell placeholder:text-shell/40 focus-visible:ring-gator-orange"
                  data-testid="input-job-id"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                data-testid="button-search-job"
                className="h-12 px-7 rounded-md bg-gator-orange hover:bg-gator-orange-dark text-asphalt font-black uppercase text-sm tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-all"
              >
                Track
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </div>
            <p className="text-xs text-shell/55 mt-4 text-center">
              Try the demo:{" "}
              <span className="font-mono font-black text-shell">CG-2024-DEMO</span>
            </p>
          </div>

          {jobQuery.isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-36 rounded-2xl bg-asphalt/10" />
              <div className="grid sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-asphalt/10" />)}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-lg bg-asphalt/10" />)}
              </div>
            </div>
          )}

          {jobQuery.isError && searchId && (
            <div className="text-center py-14 text-asphalt/70 border-2 border-dashed border-asphalt/15 rounded-2xl bg-shell animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-asphalt/5 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 opacity-50" />
              </div>
              <p className="font-display font-black uppercase text-asphalt text-lg">No Job Found</p>
              <p className="text-sm mt-1">No results for <span className="font-mono font-black text-asphalt">"{searchId}"</span></p>
              <p className="text-xs mt-2 text-asphalt/60">Double-check your Job ID and try again.</p>
            </div>
          )}

          {jobQuery.data && <JobDetails job={jobQuery.data.job} photos={jobQuery.data.photos} />}

          {!searchId && !jobQuery.isLoading && (
            <div className="border-2 border-dashed border-asphalt/15 rounded-2xl p-10 text-center text-asphalt/60 bg-shell">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-display font-black uppercase tracking-tight text-asphalt/80">Your job details will appear here</p>
              <p className="text-xs mt-1">Enter your Job ID above to get started.</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/estimate">
              <span className="inline-flex items-center gap-2 text-asphalt font-black uppercase text-xs tracking-[0.18em] border-b-2 border-gator-orange pb-0.5 hover:text-teal transition-colors cursor-pointer">
                Need a Quote? Request an Estimate
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
    </div>
  );
}
