import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// Served at /sitemap.xml. Two indexable routes: the homepage and the ReturnOps
// case study. URLs are absolute against the production origin.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects/returnops`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
