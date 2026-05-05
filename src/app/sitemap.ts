import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://freyrtechnology.ai";
const lastModified = new Date("2026-05-05");

const routes = [
  "",
  "/agente-ai",
  "/casi-studio",
  "/chi-siamo",
  "/contatti",
  "/servizi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
