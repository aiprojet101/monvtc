import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";

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
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.updated || a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
