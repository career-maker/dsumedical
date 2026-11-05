import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { PageShell } from "@/components/page/PageShell";
import { getPage } from "@/data/pages";
import { fetchPage } from "@/lib/api/pages";
import { richTextToPlainText } from "./RichText";

type CmsPageProps = {
  apiId: string;
  slug: string;
  contentSlug?: string;
  useFallback?: boolean;
};

async function loadPage({ apiId, slug, contentSlug, useFallback = true }: CmsPageProps) {
  const cmsPage = await fetchPage(apiId, contentSlug);
  return (cmsPage ? { ...cmsPage, slug } : null) ?? (useFallback ? getPage(slug) ?? null : null);
}

export async function generateCmsMetadata(props: CmsPageProps): Promise<Metadata> {
  const page = await loadPage(props);
  if (!page) return {};

  return {
    title: page.seo?.title ?? `${page.title} | CDSIMER`,
    description: page.seo?.description ?? richTextToPlainText(page.lead),
    ...(page.seo?.canonicalUrl ? { alternates: { canonical: page.seo.canonicalUrl } } : {}),
    ...(page.seo?.shareImage
      ? { openGraph: { images: [{ url: page.seo.shareImage }] } }
      : {}),
    ...(page.seo?.noIndex ? { robots: { index: false, follow: false } } : {})
  };
}

export async function CmsPage({ apiId, slug, contentSlug, useFallback = true }: CmsPageProps) {
  const page = await loadPage({ apiId, slug, contentSlug, useFallback });
  if (!page) notFound();

  return (
    <PageShell>
      <PageHero page={page} />
      <Blocks blocks={page.blocks} useFallbackImages={useFallback} />
    </PageShell>
  );
}
