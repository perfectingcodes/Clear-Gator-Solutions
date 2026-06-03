import { db } from "./db";
import { jobs, jobPhotos, estimates, users, crewMembers, analyticsEvents } from "@shared/schema";
import { eq, desc, count, gte, sql as dsql } from "drizzle-orm";
import type {
  Job, InsertJob, JobPhoto, InsertJobPhoto, Estimate, InsertEstimate, User, InsertUser,
  CrewMember, InsertCrewMember, AnalyticsEvent, InsertAnalyticsEvent
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  getJobByJobId(jobId: string): Promise<Job | undefined>;
  createJob(job: Omit<InsertJob, "jobId">): Promise<Job>;
  updateJob(id: string, data: Partial<InsertJob>): Promise<Job | undefined>;

  getJobPhotos(jobId: string): Promise<JobPhoto[]>;
  addJobPhoto(photo: InsertJobPhoto): Promise<JobPhoto>;

  getEstimates(): Promise<Estimate[]>;
  createEstimate(estimate: InsertEstimate): Promise<Estimate>;
  updateEstimate(id: string, data: Partial<Estimate>): Promise<Estimate | undefined>;

  getCrewMembers(): Promise<CrewMember[]>;
  createCrewMember(crew: InsertCrewMember): Promise<CrewMember>;
  updateCrewMember(id: string, data: Partial<InsertCrewMember>): Promise<CrewMember | undefined>;
  deleteCrewMember(id: string): Promise<boolean>;

  recordEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsSummary(days?: number): Promise<{
    range: { from: string; to: string; days: number };
    totals: {
      pageviews: number;
      sessions: number;
      formSubmits: number;
      calls: number;
      conversionRate: number;
    };
    byDay: { date: string; pageviews: number; sessions: number; submits: number }[];
    topPaths: { path: string; views: number }[];
    recent: AnalyticsEvent[];
  }>;

  getStats(): Promise<{ totalJobs: number; inProgress: number; completed: number; pendingEstimates: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getJobs(): Promise<Job[]> {
    return db.select().from(jobs).orderBy(desc(jobs.createdAt));
  }

  async getJob(id: string): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job;
  }

  async getJobByJobId(jobId: string): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.jobId, jobId));
    return job;
  }

  async createJob(jobData: Omit<InsertJob, "jobId">): Promise<Job> {
    const jobId = generateJobId();
    const [job] = await db.insert(jobs).values({ ...jobData, jobId }).returning();
    return job;
  }

  async updateJob(id: string, data: Partial<InsertJob>): Promise<Job | undefined> {
    const [job] = await db.update(jobs).set(data).where(eq(jobs.id, id)).returning();
    return job;
  }

  async getJobPhotos(jobId: string): Promise<JobPhoto[]> {
    return db.select().from(jobPhotos).where(eq(jobPhotos.jobId, jobId)).orderBy(desc(jobPhotos.uploadedAt));
  }

  async addJobPhoto(photo: InsertJobPhoto): Promise<JobPhoto> {
    const [p] = await db.insert(jobPhotos).values(photo).returning();
    return p;
  }

  async getEstimates(): Promise<Estimate[]> {
    return db.select().from(estimates).orderBy(desc(estimates.createdAt));
  }

  async createEstimate(data: InsertEstimate): Promise<Estimate> {
    const [est] = await db.insert(estimates).values(data).returning();
    return est;
  }

  async updateEstimate(id: string, data: Partial<Estimate>): Promise<Estimate | undefined> {
    const [est] = await db.update(estimates).set(data).where(eq(estimates.id, id)).returning();
    return est;
  }

  async getStats() {
    const [total] = await db.select({ count: count() }).from(jobs);
    const [inProg] = await db.select({ count: count() }).from(jobs).where(eq(jobs.status, "In Progress"));
    const [comp] = await db.select({ count: count() }).from(jobs).where(eq(jobs.status, "Completed"));
    const [pending] = await db.select({ count: count() }).from(estimates).where(eq(estimates.status, "Pending"));
    return {
      totalJobs: Number(total.count),
      inProgress: Number(inProg.count),
      completed: Number(comp.count),
      pendingEstimates: Number(pending.count),
    };
  }

  /* ─── Crew ─────────────────────────────────────────────── */
  async getCrewMembers(): Promise<CrewMember[]> {
    return db.select().from(crewMembers).orderBy(desc(crewMembers.createdAt));
  }

  async createCrewMember(data: InsertCrewMember): Promise<CrewMember> {
    const [c] = await db.insert(crewMembers).values(data).returning();
    return c;
  }

  async updateCrewMember(id: string, data: Partial<InsertCrewMember>): Promise<CrewMember | undefined> {
    const [c] = await db.update(crewMembers).set(data).where(eq(crewMembers.id, id)).returning();
    return c;
  }

  async deleteCrewMember(id: string): Promise<boolean> {
    const res = await db.delete(crewMembers).where(eq(crewMembers.id, id));
    return (res.rowCount ?? 0) > 0;
  }

  /* ─── Analytics ────────────────────────────────────────── */
  async recordEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [e] = await db.insert(analyticsEvents).values(event).returning();
    return e;
  }

  async getAnalyticsSummary(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const sinceIso = since.toISOString();

    // totals
    const [pageviewsRow] = await db.select({ c: count() }).from(analyticsEvents)
      .where(dsql`${analyticsEvents.type} = 'pageview' AND ${analyticsEvents.createdAt} >= ${sinceIso}`);
    const [submitsRow] = await db.select({ c: count() }).from(analyticsEvents)
      .where(dsql`${analyticsEvents.type} = 'form_submit' AND ${analyticsEvents.createdAt} >= ${sinceIso}`);
    const [callsRow] = await db.select({ c: count() }).from(analyticsEvents)
      .where(dsql`${analyticsEvents.type} = 'call' AND ${analyticsEvents.createdAt} >= ${sinceIso}`);
    const sessionsRows = await db.execute(
      dsql`SELECT COUNT(DISTINCT session_id) AS c FROM analytics_events
           WHERE created_at >= ${sinceIso} AND session_id IS NOT NULL`
    );
    const sessions = Number((sessionsRows.rows[0] as any)?.c ?? 0);

    // by-day series
    const byDayRows = await db.execute(
      dsql`SELECT DATE(created_at) AS date,
                  SUM((type = 'pageview')::int)    AS pageviews,
                  COUNT(DISTINCT session_id)        AS sessions,
                  SUM((type = 'form_submit')::int) AS submits
           FROM analytics_events
           WHERE created_at >= ${sinceIso}
           GROUP BY DATE(created_at)
           ORDER BY date ASC`
    );
    const byDay = byDayRows.rows.map((r: any) => ({
      date: typeof r.date === "string" ? r.date : new Date(r.date).toISOString().slice(0, 10),
      pageviews: Number(r.pageviews ?? 0),
      sessions: Number(r.sessions ?? 0),
      submits: Number(r.submits ?? 0),
    }));

    // top paths
    const topPathsRows = await db.execute(
      dsql`SELECT path, COUNT(*)::int AS views
           FROM analytics_events
           WHERE type = 'pageview' AND created_at >= ${sinceIso} AND path IS NOT NULL
           GROUP BY path
           ORDER BY views DESC
           LIMIT 8`
    );
    const topPaths = topPathsRows.rows.map((r: any) => ({
      path: String(r.path ?? "/"),
      views: Number(r.views ?? 0),
    }));

    // recent
    const recent = await db.select().from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, since))
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(20);

    const pageviews = Number(pageviewsRow.c);
    const formSubmits = Number(submitsRow.c);
    const calls = Number(callsRow.c);
    const conversionRate = pageviews > 0 ? (formSubmits + calls) / pageviews : 0;

    return {
      range: { from: since.toISOString(), to: new Date().toISOString(), days },
      totals: { pageviews, sessions, formSubmits, calls, conversionRate },
      byDay,
      topPaths,
      recent,
    };
  }
}

function generateJobId(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CG-${year}-${rand}`;
}

export const storage = new DatabaseStorage();
