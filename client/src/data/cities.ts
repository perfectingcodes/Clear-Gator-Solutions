// Re-export the canonical city catalog from shared/ so the Express
// server can import the same source of truth for SEO head injection and
// dynamic sitemap generation.
export * from "@shared/cities";
