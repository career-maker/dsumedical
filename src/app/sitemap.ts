import type { MetadataRoute } from "next";
import { news } from "@/data/news";
import { pages } from "@/data/pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...pages.map((p) => `/${p.slug}`), ...news.map((n) => `/news/${n.slug}`)].map((path) => ({ url: `${site}${path}` }));
}
