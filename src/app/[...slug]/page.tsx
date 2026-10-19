import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { PageShell } from "@/components/page/PageShell";
import { getPage, pages } from "@/data/pages";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug.join("/"));
  return page ? { title: `${page.title} | CDSIMER`, description: page.lead } : {};
}

export default async function InnerPage({ params }: Props) {
  const page = getPage((await params).slug.join("/"));
  if (!page) notFound();
  return (
    <PageShell>
      <PageHero page={page} />
      <Blocks blocks={page.blocks} />
    </PageShell>
  );
}
