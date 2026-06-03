import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const dir = path.join(process.cwd(), "client", "public", "images", "uploads");
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith("image/"));
  },
});

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  app.get("/api/jobs", async (_req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const data = req.body;
      const job = await storage.createJob({
        title: data.title,
        serviceType: data.serviceType,
        status: "Scheduled",
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        location: data.location,
        description: data.description || null,
        notes: data.notes || null,
        scheduledDate: data.scheduledDate || null,
        invoiceAmount: data.invoiceAmount || null,
        invoicePaid: false,
      });
      res.json(job);
    } catch (e) {
      res.status(500).json({ error: "Failed to create job" });
    }
  });

  app.patch("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.updateJob(req.params.id, req.body);
      if (!job) return res.status(404).json({ error: "Job not found" });
      res.json(job);
    } catch (e) {
      res.status(500).json({ error: "Failed to update job" });
    }
  });

  app.get("/api/jobs/track/:jobId", async (req, res) => {
    try {
      const jobId = req.params.jobId.toUpperCase();
      const job = await storage.getJobByJobId(jobId);
      if (!job) return res.status(404).json({ error: "Job not found" });
      const photos = await storage.getJobPhotos(job.id);
      res.json({ job, photos });
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/jobs/:id/photos", async (req, res) => {
    try {
      const photos = await storage.getJobPhotos(req.params.id);
      res.json(photos);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch photos" });
    }
  });

  app.post("/api/jobs/:id/photos", upload.single("photo"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const url = `/images/uploads/${req.file.filename}`;
      const photo = await storage.addJobPhoto({
        jobId: req.params.id,
        url,
        caption: req.body.caption || null,
        uploadedBy: req.body.uploadedBy || "Team Member",
      });
      res.json(photo);
    } catch (e) {
      res.status(500).json({ error: "Failed to upload photo" });
    }
  });

  app.get("/api/estimates", async (_req, res) => {
    try {
      const ests = await storage.getEstimates();
      res.json(ests);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch estimates" });
    }
  });

  app.post("/api/estimates", async (req, res) => {
    try {
      const data = req.body;
      const est = await storage.createEstimate({
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        location: data.location,
        description: data.description,
        photoUrls: data.photoUrls || [],
      });
      res.json(est);
    } catch (e) {
      res.status(500).json({ error: "Failed to create estimate" });
    }
  });

  app.patch("/api/estimates/:id", async (req, res) => {
    try {
      const est = await storage.updateEstimate(req.params.id, req.body);
      if (!est) return res.status(404).json({ error: "Estimate not found" });
      res.json(est);
    } catch (e) {
      res.status(500).json({ error: "Failed to update estimate" });
    }
  });

  app.get("/api/admin/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  /* ─── Crew CRM ─────────────────────────────────────────── */
  app.get("/api/crew", async (_req, res) => {
    try {
      const crew = await storage.getCrewMembers();
      res.json(crew);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch crew" });
    }
  });

  app.post("/api/crew", async (req, res) => {
    try {
      const c = await storage.createCrewMember({
        name: req.body.name,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email || null,
        status: req.body.status || "Active",
        specialty: req.body.specialty || null,
        emergencyContact: req.body.emergencyContact || null,
        notes: req.body.notes || null,
        hiredAt: req.body.hiredAt || null,
      });
      res.json(c);
    } catch (e) {
      res.status(500).json({ error: "Failed to create crew member" });
    }
  });

  app.patch("/api/crew/:id", async (req, res) => {
    try {
      const c = await storage.updateCrewMember(req.params.id, req.body);
      if (!c) return res.status(404).json({ error: "Crew member not found" });
      res.json(c);
    } catch (e) {
      res.status(500).json({ error: "Failed to update crew member" });
    }
  });

  app.delete("/api/crew/:id", async (req, res) => {
    try {
      const ok = await storage.deleteCrewMember(req.params.id);
      if (!ok) return res.status(404).json({ error: "Crew member not found" });
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete crew member" });
    }
  });

  /* ─── Analytics ────────────────────────────────────────── */
  app.post("/api/analytics/event", async (req, res) => {
    try {
      const { type, path, sessionId, referrer, metadata } = req.body || {};
      if (!type) return res.status(400).json({ error: "type required" });
      const userAgent = (req.headers["user-agent"] as string) || null;
      const e = await storage.recordEvent({
        type,
        path: path || null,
        sessionId: sessionId || null,
        referrer: referrer || null,
        userAgent,
        metadata: metadata || null,
      });
      res.json({ ok: true, id: e.id });
    } catch (e) {
      res.status(500).json({ error: "Failed to record event" });
    }
  });

  app.get("/api/analytics/summary", async (req, res) => {
    try {
      const days = Number(req.query.days) || 30;
      const summary = await storage.getAnalyticsSummary(days);
      res.json(summary);
    } catch (e) {
      console.error("[analytics/summary]", e);
      res.status(500).json({ error: "Failed to compute analytics" });
    }
  });

  return httpServer;
}
