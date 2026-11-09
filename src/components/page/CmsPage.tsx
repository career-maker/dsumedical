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
  showJumpNav?: boolean;
};

async function loadPage({ apiId, slug, contentSlug, useFallback = true }: CmsPageProps) {
  const cmsPage = await fetchPage(apiId, contentSlug);
  if (cmsPage) return { page: { ...cmsPage, slug }, fromCms: true };
  const fallback = useFallback ? getPage(slug) ?? null : null;
  return fallback ? { page: fallback, fromCms: false } : null;
}

export async function generateCmsMetadata(props: CmsPageProps): Promise<Metadata> {
  const page = (await loadPage(props))?.page;
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

export async function CmsPage({
  apiId,
  slug,
  contentSlug,
  useFallback = true,
  showJumpNav = true
}: CmsPageProps) {
  const loaded = await loadPage({ apiId, slug, contentSlug, useFallback });
  if (!loaded) notFound();
  const { page, fromCms } = loaded;

  return (
    <PageShell>
      <PageHero page={page} />
      <Blocks blocks={page.blocks} useFallbackImages={!fromCms} showJumpNav={showJumpNav} />
    </PageShell>
  );
}
