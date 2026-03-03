import { db } from "./db";
import { jobs, jobPhotos, estimates, users } from "@shared/schema";
import { eq, desc, count } from "drizzle-orm";
import type { Job, InsertJob, JobPhoto, InsertJobPhoto, Estimate, InsertEstimate, User, InsertUser } from "@shared/schema";

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
}

function generateJobId(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CG-${year}-${rand}`;
}

export const storage = new DatabaseStorage();
