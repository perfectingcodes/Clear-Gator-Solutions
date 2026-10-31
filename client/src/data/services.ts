// Re-export the canonical service catalog from shared/ so the Express
// server can import the same source of truth for SEO head injection and
// dynamic sitemap generation.
export * from "@shared/services";
