import { academic } from "./academic";
import { clinical } from "./clinical";
import { general } from "./general";
import { university } from "./university";
import type { PageDef } from "./types";

export const pages: PageDef[] = [...university, ...academic, ...clinical, ...general];
const bySlug = new Map(pages.map((p) => [p.slug, p]));

export const getPage = (slug: string) => bySlug.get(slug);

/** Breadcrumb trail from the slug: each prefix that is itself a page uses its title. */
export function crumbs(slug: string, title: string) {
  const parts = slug.split("/");
  return parts.slice(0, -1).map((_, i) => {
    const path = parts.slice(0, i + 1).join("/");
    return { label: bySlug.get(path)?.title ?? parts[i], href: `/${path}` };
  }).concat({ label: title, href: `/${slug}` });
}
