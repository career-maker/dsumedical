import type { NavLink } from "@/data/nav";
import type { RichTextContent } from "@/data/pages/types";

type JsonRecord = Record<string, unknown>;

export type HeaderContent = {
  cdsimerLogo?: string;
  universityLogo?: string;
  universityHref: string;
  topLeft: NavLink[];
  topRight: NavLink[];
  navLeft: NavLink[];
  navRight: NavLink[];
  erpLink: NavLink;
  phoneLabel: string;
  phoneHref: string;
  admissionsAction: { label: string; href: string; variant?: "primary" | "outline" | "glass" | "soft" };
};

export type FooterContent = {
  quickLinks: NavLink[];
  departmentLinks: NavLink[];
  contactName: RichTextContent;
  contactEmail: string;
  contactPhone: string;
  aboutLogo?: string;
  aboutDescription: RichTextContent;
  helplineTitle: string;
  helplinePhone: string;
  socials: { icon: "fb" | "x" | "ig" | "in" | "yt"; label: string; href: string }[];
  brochureAction: { label: string; href: string };
  copyright: string;
  privacyAction: { label: string; href: string };
  termsAction: { label: string; href: string };
  designerName: string;
  designerHref: string;
};

const record = (value: unknown): JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};

async function fetchGlobal(): Promise<JsonRecord | null> {
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) return null;

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/global`, {
    cache: "no-store"
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Strapi global content request failed with HTTP ${response.status}.`);

  const payload: unknown = await response.json();
  const data = record(payload).data;
  return data && typeof data === "object" ? record(data) : null;
}

export async function fetchHeader() {
  const content = await fetchGlobal();
  return content ? (record(content.header) as HeaderContent) : null;
}

export async function fetchFooter() {
  const content = await fetchGlobal();
  return content ? (record(content.footer) as FooterContent) : null;
}
