import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";
import { CITIES } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vtc-site.fr";
  const articles = getAllArticles();

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/inscription`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/creer-site-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/devenir-chauffeur-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solution-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/formation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/partenaires`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.updated || a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CITIES.map((c) => ({
      url: `${base}/creer-site-vtc/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
