import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Beta stage: disallow all crawling. Remove when going live.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${site}/sitemap.xml` };
}
