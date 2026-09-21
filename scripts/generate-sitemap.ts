// Runs before Vite preview and production builds; writes public/sitemap.xml.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://sudevi-agro-web.lovable.app";

const entries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/recipes", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/careers", changefreq: "weekly", priority: "0.7" },
  { path: "/partners", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(({ path, changefreq, priority }) => [
    "  <url>",
    `    <loc>${BASE_URL}${path}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n")),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);