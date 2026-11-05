export type Action = { label: string; href: string; variant?: "primary" | "outline" | "glass" | "soft" };

export type RichTextNode = {
  type: string;
  text?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
};

export type RichTextContent = string | RichTextNode[];

export type Block =
  | { t: "text"; id?: string; eyebrow?: string; title: string; body: RichTextContent | string[]; bullets?: string[]; image?: string; alt?: string; flip?: boolean; tone?: "cream"; actions?: Action[] }
  | { t: "cards"; id?: string; title: string; lead?: RichTextContent; cols?: 2 | 3 | 4; tone?: "cream"; items: { title: string; text: RichTextContent; href?: string; tag?: string; image?: string }[] }
  | { t: "logos"; id?: string; title?: string; lead?: RichTextContent; tone?: "cream"; items: { href?: string; image?: string }[] }
  | { t: "stats"; title?: string; lead?: RichTextContent; tone?: "cream"; items: { value: string; label: string }[] }
  | { t: "steps"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; items: { label?: string; title: string; text: RichTextContent }[] }
  | { t: "profiles"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; items: { name: string; role: string; text?: RichTextContent; image?: string }[] }
  | { t: "docs"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; items: { title: string; note?: RichTextContent; href?: string }[] }
  | { t: "table"; id?: string; title: string; lead?: RichTextContent; cols: string[]; rows: string[][] }
  | { t: "faq"; id?: string; title: string; lead?: RichTextContent; items: { q: string; a: RichTextContent }[] }
  | { t: "gallery"; id?: string; title: string; lead?: RichTextContent; groups: { label: string; images: { src: string; alt: string }[] }[] }
  | { t: "form"; id?: string; title: string; lead?: RichTextContent; kind: "admission" | "appointment" | "contact" }
  | { t: "address"; id?: string; title: string; lines: string[]; phone: string; email: string; mapsHref: string }
  | { t: "map"; id?: string; title: string; lead?: RichTextContent; query: string }
  | { t: "links"; id?: string; title: string; items: { label: string; href: string }[] }
  | { t: "departments" }
  | { t: "news" }
  | { t: "cta"; title: string; text: RichTextContent; actions: Action[] };

export type PageDef = {
  /** URL path without leading slash, e.g. "university/about". */
  slug: string;
  title: string;
  eyebrow?: string;
  lead?: RichTextContent;
  /** Absolute Strapi media URL or legacy filename under /images. */
  hero: string;
  heroAlt?: string;
  breadcrumbs?: { label: string; href: string }[];
  actions?: Action[];
  blocks: Block[];
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    shareImage?: string;
  };
};
