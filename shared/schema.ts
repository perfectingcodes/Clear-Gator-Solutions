import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, numeric, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const JOB_STATUSES = ["Scheduled", "In Progress", "Completed", "On Hold"] as const;
export type JobStatus = typeof JOB_STATUSES[number];

export const SERVICE_TYPES = [
  "Interior Demolition",
  "Outdoor Demolition",
  "Hauling",
  "Site Cleanup",
  "Lot Clearing",
  "Property Maintenance",
] as const;
export type ServiceType = typeof SERVICE_TYPES[number];

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id", { length: 12 }).notNull().unique(),
  title: text("title").notNull(),
  serviceType: text("service_type").notNull(),
  status: text("status").notNull().default("Scheduled"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  notes: text("notes"),
  invoiceAmount: numeric("invoice_amount", { precision: 10, scale: 2 }),
  invoicePaid: boolean("invoice_paid").default(false),
  scheduledDate: text("scheduled_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export const jobPhotos = pgTable("job_photos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull(),
  url: text("url").notNull(),
  caption: text("caption"),
  uploadedBy: text("uploaded_by"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertJobPhotoSchema = createInsertSchema(jobPhotos).omit({
  id: true,
  uploadedAt: true,
});
export type InsertJobPhoto = z.infer<typeof insertJobPhotoSchema>;
export type JobPhoto = typeof jobPhotos.$inferSelect;

export const estimates = pgTable("estimates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  photoUrls: text("photo_urls").array().default(sql`'{}'::text[]`),
  status: text("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEstimateSchema = createInsertSchema(estimates).omit({
  id: true,
  createdAt: true,
  status: true,
});
export type InsertEstimate = z.infer<typeof insertEstimateSchema>;
export type Estimate = typeof estimates.$inferSelect;

/* ─────────────────────────────────────────────────────────────
   Lead pipeline — extends Estimate.status with explicit stages
   ───────────────────────────────────────────────────────────── */
export const ESTIMATE_STAGES = ["Pending", "Contacted", "Quoted", "Won", "Lost"] as const;
export type EstimateStage = typeof ESTIMATE_STAGES[number];

/* ─────────────────────────────────────────────────────────────
   Crew members — internal CRM for workers
   ───────────────────────────────────────────────────────────── */
export const CREW_ROLES = ["Foreman", "Operator", "Demolition", "Hauling", "Cleanup", "Painter", "Apprentice"] as const;
export type CrewRole = typeof CREW_ROLES[number];

export const CREW_STATUSES = ["Active", "On Job", "Off Duty", "On Leave"] as const;
export type CrewStatus = typeof CREW_STATUSES[number];

export const crewMembers = pgTable("crew_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  status: text("status").notNull().default("Active"),
  specialty: text("specialty"),
  emergencyContact: text("emergency_contact"),
  notes: text("notes"),
  hiredAt: text("hired_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCrewMemberSchema = createInsertSchema(crewMembers).omit({
  id: true,
  createdAt: true,
});
export type InsertCrewMember = z.infer<typeof insertCrewMemberSchema>;
export type CrewMember = typeof crewMembers.$inferSelect;

/* ─────────────────────────────────────────────────────────────
   Analytics — lightweight event tracking
   ───────────────────────────────────────────────────────────── */
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),          // "pageview", "form_submit", "click", "call"
  path: text("path"),                    // url path
  sessionId: text("session_id"),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
