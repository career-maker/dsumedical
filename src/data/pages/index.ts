import { academic } from "./academic";
import { clinical } from "./clinical";
import { general } from "./general";
import { research } from "./research";
import { university } from "./university";
import type { PageDef } from "./types";

const SMALL = new Set(["a", "an", "the", "of", "at", "in", "on", "for", "and", "or", "to", "as", "per", "by", "with", "from", "vs"]);
/** Title Case for page and section headings: capitalise each word except small joining words (never the first). Existing capitals are kept. */
const titleCase = (s: string) =>
  s.replace(/(^|\s)(\(?)([a-z])/g, (m, sp: string, br: string, c: string, off: number, str: string) => {
    const word = str.slice(off + sp.length + br.length).split(/[\s,]/)[0];
    return off > 0 && SMALL.has(word) ? m : `${sp}${br}${c.toUpperCase()}`;
  });

const raw: PageDef[] = [...university, ...academic, ...clinical, ...research, ...general];
export const pages: PageDef[] = raw.map((p) => ({
  ...p,
  title: titleCase(p.title),
  blocks: p.blocks.map((b) => ("title" in b && typeof b.title === "string" ? { ...b, title: titleCase(b.title) } : b)) as PageDef["blocks"],
}));
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
