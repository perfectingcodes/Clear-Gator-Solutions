# Clear Gator — Construction Services Web App

## Overview
Clear Gator is a professional web application for a construction services company specializing in cleanup, demolition, and debris removal. It includes a public landing page, a multi-step estimate request form, a customer job tracking portal, and a protected admin/staff dashboard.

## Tech Stack
- **Frontend**: React + Vite + TypeScript
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL via Drizzle ORM
- **Styling**: Tailwind CSS with a gator-inspired palette (deep greens, slate grays, high-vis orange)
- **UI Components**: shadcn/ui + Radix UI

## Color Palette
- **Primary (Deep Green)**: `hsl(150 65% 28%)` — brand primary
- **Accent (High-Vis Orange)**: `hsl(25 95% 50%)` — CTAs, highlights
- **Slate Gray**: `hsl(215 16% 22%)` — dark surfaces

## Application Structure

### Pages
- `/` — Public landing page (hero, services, how it works, reviews, CTA)
- `/estimate` — Multi-step free estimate form (4 steps: service → description → contact → review)
- `/track` — Customer job tracker (enter Job ID, see status/photos/invoice)
- `/admin` — Staff dashboard (password: `cleargator2024`)

### Key Features
1. **Landing Page**: Hero section with background image, stats bar, service cards, testimonials
2. **Estimate Engine**: Multi-step form with validation, service selection, photo upload UI
3. **Job Tracker**: Enter Job ID → see status, site photos gallery, invoice summary
4. **Admin Dashboard**:
   - Stats overview (total jobs, in progress, completed, pending estimates)
   - Create new jobs with full customer details
   - Update job status via dropdown
   - Upload site photos from mobile (file capture)
   - Expand job rows to see details and photos
   - View and manage estimate requests

### Database Schema
- `jobs` — Job records with ID, title, service type, status, customer info, invoice
- `job_photos` — Site photos linked to jobs (url, caption, uploader)
- `estimates` — Estimate requests from website form
- `users` — (Reserved for future auth expansion)

### API Endpoints
- `GET /api/jobs` — All jobs (admin)
- `POST /api/jobs` — Create job
- `PATCH /api/jobs/:id` — Update job
- `GET /api/jobs/track/:jobId` — Track job by public Job ID (CG-XXXX-XXXX format)
- `GET /api/jobs/:id/photos` — Get photos for a job
- `POST /api/jobs/:id/photos` — Upload photo (multipart/form-data)
- `GET /api/estimates` — All estimates (admin)
- `POST /api/estimates` — Submit estimate request (public)
- `PATCH /api/estimates/:id` — Update estimate status
- `GET /api/admin/stats` — Dashboard statistics

## Seed Data
The app auto-seeds on startup if no jobs exist:
- 3 demo jobs: CG-2024-DEMO (In Progress), CG-2024-A7B2 (Completed), CG-2024-C9D4 (Scheduled)
- 3 demo job photos (in `/images/seed/`)
- 2 demo estimates

## File Uploads
Photos are uploaded via `multer` and stored at `client/public/images/uploads/`.
Seed images are at `client/public/images/seed/`.
Hero image: `client/public/images/hero-construction.png`.
