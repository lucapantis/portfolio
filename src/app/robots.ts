import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// Served at /robots.txt. The whole site is public and indexable; point crawlers
// at the sitemap on the production origin.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
