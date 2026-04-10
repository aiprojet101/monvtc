import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vtc-site.fr";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/inscription`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/creer-site-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/devenir-chauffeur-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solution-vtc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
