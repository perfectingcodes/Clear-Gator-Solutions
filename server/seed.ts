import { db } from "./db";
import { jobs, jobPhotos, estimates } from "@shared/schema";
import { count } from "drizzle-orm";

function generateJobId(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CG-${year}-${rand}`;
}

export async function seedDatabase() {
  const [{ count: jobCount }] = await db.select({ count: count() }).from(jobs);
  if (Number(jobCount) > 0) return;

  console.log("[seed] Inserting demo data...");

  const [job1] = await db.insert(jobs).values({
    jobId: "CG-2024-DEMO",
    title: "Post-Construction Cleanup — Riverfront Condos",
    serviceType: "Construction Cleanup",
    status: "In Progress",
    customerName: "Marcus Torres",
    customerEmail: "m.torres@riverfrontdev.com",
    customerPhone: "(305) 555-0182",
    location: "1420 Brickell Ave, Miami, FL 33131",
    description: "Full post-construction cleanup for 12-unit luxury condo development. All floors, windows, exterior balconies. Move-in ready standard required.",
    notes: "Access code: 4812. Contact site super Jake before arrival.",
    invoiceAmount: "4850.00",
    invoicePaid: false,
    scheduledDate: "2024-12-15",
  }).returning();

  const [job2] = await db.insert(jobs).values({
    jobId: "CG-2024-A7B2",
    title: "Demolition — Former Warehouse Gut-Out",
    serviceType: "Demolition",
    status: "Completed",
    customerName: "Sandra Kwan",
    customerEmail: "skwan@kwanproperties.com",
    customerPhone: "(786) 555-0341",
    location: "8800 NW 36th St, Doral, FL 33178",
    description: "Interior demolition of 14,000 sq ft warehouse. Remove all non-structural walls, flooring, ceiling tiles. Structural walls to remain.",
    notes: "Completed ahead of schedule. Client approved final inspection.",
    invoiceAmount: "18500.00",
    invoicePaid: true,
    scheduledDate: "2024-11-28",
  }).returning();

  const [job3] = await db.insert(jobs).values({
    jobId: "CG-2024-C9D4",
    title: "Dumpster Rental — Home Renovation",
    serviceType: "Dumpster Rental",
    status: "Scheduled",
    customerName: "Derek Marshall",
    customerEmail: "derek.m@gmail.com",
    customerPhone: "(954) 555-0228",
    location: "327 SW 14th Ct, Fort Lauderdale, FL 33315",
    description: "30-yard container for full kitchen and two bathroom renovation. 14-day rental. Easy driveway access.",
    notes: "Deliver Tuesday morning. Gate code: 2291.",
    invoiceAmount: "975.00",
    invoicePaid: false,
    scheduledDate: "2024-12-18",
  }).returning();

  await db.insert(jobPhotos).values([
    {
      jobId: job1.id,
      url: "/images/seed/site-photo-1.png",
      caption: "Day 1 — Initial sweep of lobby area",
      uploadedBy: "Carlos R.",
    },
    {
      jobId: job1.id,
      url: "/images/seed/site-photo-2.png",
      caption: "Unit 4B — Window cleaning complete",
      uploadedBy: "Maria L.",
    },
    {
      jobId: job2.id,
      url: "/images/seed/site-photo-3.png",
      caption: "Demolition complete — cleared to studs",
      uploadedBy: "Team Lead",
    },
  ]);

  await db.insert(estimates).values([
    {
      name: "Patricia Nguyen",
      email: "p.nguyen@nguyenbuilds.com",
      phone: "(305) 555-0774",
      serviceType: "Construction Cleanup",
      location: "2250 Collins Ave, Miami Beach, FL 33139",
      description: "Need post-construction cleanup for a 6,000 sq ft commercial renovation. Two floors, new flooring throughout. Looking to schedule within the next two weeks.",
      photoUrls: [],
      status: "Pending",
    },
    {
      name: "Robert Castillo",
      email: "rob.castillo@gmail.com",
      phone: "(561) 555-0993",
      serviceType: "Debris Removal",
      location: "8910 Okeechobee Blvd, West Palm Beach, FL 33411",
      description: "Storm debris from backyard — downed trees, fence material, and old shed. Roughly 3 truckloads estimated. ASAP preferred.",
      photoUrls: [],
      status: "Reviewed",
    },
  ]);

  console.log("[seed] Demo data inserted successfully.");
}
