import type { MetadataRoute } from "next";
import { pages } from "@/data/pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...pages.map((p) => `/${p.slug}`)].map((path) => ({ url: `${site}${path}` }));
}
