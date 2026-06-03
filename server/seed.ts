import { db } from "./db";
import { jobs, jobPhotos, estimates, crewMembers } from "@shared/schema";
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
    serviceType: "Site Cleanup",
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
    title: "Interior Demo — Former Warehouse Gut-Out",
    serviceType: "Demo",
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
    title: "Hauling — Home Renovation Debris",
    serviceType: "Hauling",
    status: "Scheduled",
    customerName: "Derek Marshall",
    customerEmail: "derek.m@gmail.com",
    customerPhone: "(954) 555-0228",
    location: "327 SW 14th Ct, Fort Lauderdale, FL 33315",
    description: "Haul-away for full kitchen and two bathroom renovation debris. Estimated 2–3 truckloads. Easy driveway access.",
    notes: "Schedule Tuesday morning. Gate code: 2291.",
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
      serviceType: "Site Cleanup",
      location: "2250 Collins Ave, Miami Beach, FL 33139",
      description: "Need post-construction cleanup for a 6,000 sq ft commercial renovation. Two floors, new flooring throughout. Looking to schedule within the next two weeks.",
      photoUrls: [],
      status: "Pending",
    },
    {
      name: "Robert Castillo",
      email: "rob.castillo@gmail.com",
      phone: "(561) 555-0993",
      serviceType: "Hauling",
      location: "8910 Okeechobee Blvd, West Palm Beach, FL 33411",
      description: "Storm debris from backyard — downed trees, fence material, and old shed. Roughly 3 truckloads estimated. ASAP preferred.",
      photoUrls: [],
      status: "Reviewed",
    },
  ]);

  // Crew members (only seed if table is empty so we don't duplicate).
  // Wrap in try/catch so a missing table (pre-`db:push`) doesn't crash startup.
  try {
    const [{ count: crewCount }] = await db.select({ count: count() }).from(crewMembers);
    if (Number(crewCount) === 0) {
      await db.insert(crewMembers).values([
      {
        name: "Diego Vasquez",
        role: "Foreman",
        phone: "(239) 555-0145",
        email: "diego@cleargator.com",
        status: "Active",
        specialty: "Site supervision, scheduling",
        emergencyContact: "Maria Vasquez · (239) 555-0146",
        hiredAt: "2023-04-12",
        notes: "Lead foreman. Handles all multi-day jobs and crew dispatch.",
      },
      {
        name: "Marcus Reyes",
        role: "Operator",
        phone: "(239) 555-0152",
        email: "marcus@cleargator.com",
        status: "On Job",
        specialty: "Skid steer, mini-excavator, CDL",
        emergencyContact: "Lila Reyes · (239) 555-0153",
        hiredAt: "2023-08-03",
        notes: "Heavy equipment operator. CDL Class B.",
      },
      {
        name: "Tasha Bell",
        role: "Demolition",
        phone: "(239) 555-0168",
        email: "tasha@cleargator.com",
        status: "Active",
        specialty: "Interior demo, asbestos-aware",
        emergencyContact: "James Bell · (239) 555-0169",
        hiredAt: "2024-01-20",
        notes: "Lead interior demo crew. OSHA 30.",
      },
      {
        name: "Luis Ortega",
        role: "Hauling",
        phone: "(239) 555-0177",
        email: "luis@cleargator.com",
        status: "Active",
        specialty: "Dump truck, 30-yard roll-off",
        emergencyContact: "Ana Ortega · (239) 555-0178",
        hiredAt: "2023-10-09",
        notes: "Lead hauler. CDL Class B.",
      },
      {
        name: "Priya Patel",
        role: "Cleanup",
        phone: "(239) 555-0184",
        email: "priya@cleargator.com",
        status: "Off Duty",
        specialty: "Final clean, dust mitigation",
        hiredAt: "2024-03-15",
        notes: "Post-construction final clean lead.",
      },
      {
        name: "Kevin Brooks",
        role: "Painter",
        phone: "(239) 555-0199",
        email: "kevin@cleargator.com",
        status: "Active",
        specialty: "Interior & exterior, sprayer",
        hiredAt: "2024-06-01",
        notes: "Property maintenance painter. 12 years experience.",
      },
    ]);
      console.log("[seed] Crew seeded.");
    }
  } catch (e) {
    console.warn("[seed] Skipping crew seed (run `npm run db:push` to create new tables):", (e as Error).message);
  }

  console.log("[seed] Demo data inserted successfully.");
}
