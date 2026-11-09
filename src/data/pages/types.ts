import type { AcademicYear } from "./academic-year";
export type ProseItem = { p: string } | { h: string } | { ul: (string | { text: string; sub: string[] })[] };
export type Action = { label: string; href: string; variant?: "primary" | "outline" | "glass" | "soft" };

export type RichTextNode = {
  type: string;
  text?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
};

export type RichTextContent = string | RichTextNode[];

export type Block =
  | { t: "text"; id?: string; eyebrow?: string; title: string; body: RichTextContent | string[]; bullets?: string[]; image?: string; alt?: string; /** YouTube video id shown in the media slot instead of a photo. */ video?: string; flip?: boolean; fit?: "portrait" | "art"; tone?: "cream"; actions?: Action[]; /** Centred text only: no side photo, no auto-picked image. */ center?: boolean }
  | { t: "cards"; id?: string; title: string; lead?: RichTextContent; cols?: 2 | 3 | 4; tone?: "cream"; more?: string; colored?: boolean; /** Items are shown as logos (image fitted whole, no photo crop). */ logos?: boolean; items: { title: string; text?: RichTextContent; bullets?: string[]; href?: string; tag?: string; image?: string }[] }
  | { t: "logos"; id?: string; title?: string; lead?: RichTextContent; tone?: "cream"; items: { href?: string; image?: string }[] }
  | { t: "stats"; title?: string; lead?: RichTextContent; tone?: "cream"; colored?: boolean; items: { value: string; label: string }[] }
  | { t: "steps"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; /** Endless auto-scrolling strip instead of a static row. */ marquee?: boolean; items: { label?: string; title: string; text: RichTextContent }[] }
  | { t: "profiles"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; cols?: 3 | 4; items: { name: string; role: string; text?: RichTextContent; image?: string }[] }
  | { t: "docs"; id?: string; title: string; lead?: RichTextContent; tone?: "cream"; items: { title: string; type?: string; note?: RichTextContent; href?: string }[] }
  | { t: "table"; id?: string; title: string; lead?: RichTextContent; cols: string[]; rows: RichTextContent[][] }
  | { t: "faq"; id?: string; title: string; lead?: RichTextContent; image?: string; tone?: "cream"; plain?: boolean; open?: boolean; items: { q: string; a: RichTextContent }[] }
  | { t: "phasegrid"; id?: string; title: string; lead?: string; tone?: "cream"; data: AcademicYear }
  | { t: "prose"; id?: string; title?: string; tone?: "cream"; image?: string; alt?: string; flip?: boolean; wide?: boolean; cols?: boolean; items: ProseItem[] }
  | { t: "carousel"; id?: string; title: string; lead?: string; tone?: "cream"; /** Static wrapped rows instead of a scrolling strip. */ grid?: boolean; items: { title: string; text?: string; tag?: string; href?: string; /** Portrait in /images: renders a compact person card. */ image?: string; /** Link label (defaults to "View / Download →"). */ more?: string; /** File in /images shown on top of a text card. */ cover?: string }[] }
  | { t: "slides"; id?: string; title: string; lead?: string; tone?: "cream"; items: { title: string; body: string[]; image: string; alt?: string }[] }
  | { t: "gallery"; id?: string; title: string; lead?: RichTextContent; groups: { label: string; images: { src: string; alt: string }[] }[] }
  | { t: "form"; id?: string; title: string; lead?: RichTextContent; image?: string; kind: "admission" | "appointment" | "contact" }
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
