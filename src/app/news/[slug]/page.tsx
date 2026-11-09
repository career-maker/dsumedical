import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/page/Blocks";
import { NewsArticle } from "@/components/page/NewsArticle";
import { PageHero } from "@/components/page/PageHero";
import { PageShell } from "@/components/page/PageShell";
import { news, newsBySlug, newsNeighbours, tagLabel } from "@/data/home";
import type { Block } from "@/data/pages/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = newsBySlug((await params).slug);
  return item ? { title: `${item.title} | CDSIMER`, description: item.text } : {};
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const item = newsBySlug(slug);
  if (!item) notFound();

  // Related: same category first, then the rest, newest first (the list is already sorted).
  const others = news.filter((n) => n.slug !== item.slug);
  const byRelevance = [...others.filter((n) => n.tag === item.tag), ...others.filter((n) => n.tag !== item.tag)];
  const card = (n: (typeof news)[number]) => ({ title: n.title, text: n.text, tag: n.date ? `${tagLabel(n.tag)} · ${n.date}` : tagLabel(n.tag), href: `/news/${n.slug}`, more: "Read more →", cover: n.photo });
  const events = byRelevance.filter((n) => n.tag === "events").slice(0, 8).map(card);
  const stories = byRelevance.filter((n) => n.tag !== "events").slice(0, 8).map(card);
  const related: Block[] = [
    ...(events.length ? [{ t: "carousel", id: "related-events", title: "More events", items: events } as Block] : []),
    ...(stories.length ? [{ t: "carousel", id: "related-news", title: "More news", tone: events.length ? "cream" : undefined, items: stories } as Block] : []),
  ];

  return (
    <PageShell>
      <PageHero
        page={{ slug: `news/${item.slug}`, title: item.title, eyebrow: tagLabel(item.tag), lead: item.text, hero: item.photo, heroAlt: item.alt, blocks: [] }}
      />
      <NewsArticle item={item} {...newsNeighbours(item.slug)} />
      <Blocks blocks={related} />
    </PageShell>
  );
}
