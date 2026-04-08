import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, numeric, boolean } from "drizzle-orm/pg-core";
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

export const SERVICE_TYPES = ["Demo", "Hauling", "Site Cleanup", "Lot Clearing"] as const;
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
