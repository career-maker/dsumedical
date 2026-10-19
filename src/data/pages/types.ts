export type Action = { label: string; href: string; variant?: "primary" | "outline" | "glass" | "soft" };

export type Block =
  | { t: "text"; id?: string; eyebrow?: string; title: string; body: string[]; bullets?: string[]; image?: string; alt?: string; flip?: boolean; tone?: "cream"; actions?: Action[] }
  | { t: "cards"; id?: string; title: string; lead?: string; cols?: 2 | 3 | 4; tone?: "cream"; items: { title: string; text: string; href?: string; tag?: string; image?: string }[] }
  | { t: "stats"; title?: string; lead?: string; tone?: "cream"; items: { value: string; label: string }[] }
  | { t: "steps"; id?: string; title: string; lead?: string; tone?: "cream"; items: { label?: string; title: string; text: string }[] }
  | { t: "profiles"; id?: string; title: string; lead?: string; tone?: "cream"; items: { name: string; role: string; text?: string; image?: string }[] }
  | { t: "docs"; id?: string; title: string; lead?: string; tone?: "cream"; items: { title: string; type: string; note?: string; href?: string }[] }
  | { t: "table"; id?: string; title: string; lead?: string; cols: string[]; rows: string[][] }
  | { t: "faq"; id?: string; title: string; lead?: string; items: { q: string; a: string }[] }
  | { t: "gallery"; id?: string; title: string; lead?: string; groups: { label: string; images: { src: string; alt: string }[] }[] }
  | { t: "form"; id?: string; title: string; lead?: string; kind: "admission" | "appointment" | "contact" }
  | { t: "address"; id?: string; title: string; lines: string[]; phone: string; email: string; mapsHref: string }
  | { t: "map"; id?: string; title: string; lead?: string; query: string }
  | { t: "links"; id?: string; title: string; items: { label: string; href: string }[] }
  | { t: "departments" }
  | { t: "news" }
  | { t: "cta"; title: string; text: string; actions: Action[] };

export type PageDef = {
  /** URL path without leading slash, e.g. "university/about". */
  slug: string;
  title: string;
  eyebrow: string;
  lead: string;
  /** File in /images used as the hero backdrop. */
  hero: string;
  heroAlt: string;
  actions?: Action[];
  blocks: Block[];
};
