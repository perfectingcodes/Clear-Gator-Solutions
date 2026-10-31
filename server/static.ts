import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectSeoHead, matchRoute, buildRobots, buildSitemap } from "./seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Dynamic SEO assets served fresh so new combo routes land in the index as
  // soon as they're added to the catalog — no deploy-step sitemap sync.
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(buildRobots());
  });
  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(buildSitemap());
  });

  app.use(express.static(distPath, { index: false }));

  const indexPath = path.resolve(distPath, "index.html");
  const indexTemplate = fs.readFileSync(indexPath, "utf-8");

  // SPA shell with per-route <head> injection. Crawlers that don't execute
  // JS still see the correct title, meta, canonical, OG card, and
  // structured data.
  app.use("/{*path}", (req, res) => {
    const routePath = req.originalUrl.split("?")[0] || "/";
    const meta = matchRoute(routePath);
    const html = injectSeoHead(indexTemplate, meta);
    res.status(200).type("html").send(html);
  });
}
