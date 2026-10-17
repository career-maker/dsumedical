import type { MetadataRoute } from "next";

// Beta stage: disallow all crawling. Remove when going live.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
