import { MetadataRoute } from "next";
import { fragrances } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hasaraparfums.com";
  const productPages = fragrances.map((f) => ({
    url: `${base}/fragrances/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/fragrances`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...productPages,
  ];
}