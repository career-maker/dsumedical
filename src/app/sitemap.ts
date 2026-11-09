import type { MetadataRoute } from "next";
import { news } from "@/data/home";
import { pages } from "@/data/pages";
import { site } from "@/lib/site";
import { fetchPageSlugs } from "@/lib/api/pages";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set([
    "",
    ...pages.map((page) => `/${page.slug}`),
    ...news.map((n) => `/news/${n.slug}`),
    ...(await fetchPageSlugs()).map((slug) => (slug === "/" ? "" : `/${slug}`))
  ]);
  return [...paths].map((path) => ({ url: `${site}${path}` }));
}
