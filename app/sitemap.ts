import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/properties-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mamka-reality.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const propertyUrls: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${BASE_URL}/nabidka/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...propertyUrls,
  ];
}
