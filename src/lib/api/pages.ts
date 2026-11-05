import type { PageDef } from "@/data/pages/types";

type JsonRecord = Record<string, unknown>;

const record = (value: unknown): JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};

function apiUrl(path: string) {
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) return null;
  return `${baseUrl.replace(/\/+$/, "")}/api/${path}`;
}

function isPageDef(value: unknown): value is PageDef {
  const page = record(value);
  return (
    typeof page.slug === "string" &&
    typeof page.title === "string" &&
    typeof page.hero === "string" &&
    Array.isArray(page.blocks)
  );
}

export async function fetchPage(apiId: string, slug?: string): Promise<PageDef | null> {
  const endpoint = apiUrl(apiId);
  if (!endpoint) return null;
  const url = new URL(endpoint);
  if (slug) url.searchParams.set("slug", slug);
  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Strapi page request failed with HTTP ${response.status}.`);
  }

  const payload: unknown = await response.json();
  const page = record(payload).data;
  if (!isPageDef(page)) throw new Error("Strapi returned a page with an invalid response shape.");
  return page;
}

export async function fetchPageSlugs(): Promise<string[]> {
  const endpoint = apiUrl("content-routes");
  if (!endpoint) return [];
  const url = new URL(endpoint);
  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Strapi sitemap request failed with HTTP ${response.status}.`);
  }

  const payload: unknown = await response.json();
  const entries = record(payload).data;
  if (!Array.isArray(entries)) throw new Error("Strapi returned an invalid page list.");
  const slugs = entries.map((entry) => record(entry).routePath);
  if (slugs.some((slug) => typeof slug !== "string")) {
    throw new Error("Strapi returned a page without a valid slug.");
  }
  return slugs.filter((slug): slug is string => typeof slug === "string");
}
