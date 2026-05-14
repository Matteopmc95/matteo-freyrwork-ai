import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://freyrtechnology.ai";
const lastModified = new Date("2026-05-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/servizi`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/agente-ai`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/casi-studio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contatti`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/chi-siamo`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
