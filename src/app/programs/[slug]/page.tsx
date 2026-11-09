import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

type ProgramRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProgramRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return generateCmsMetadata({
    apiId: "programs",
    slug: `programs/${slug}`,
    contentSlug: slug,
    useFallback: false
  });
}

export default async function ProgramDetailPage({ params }: ProgramRouteProps) {
  const { slug } = await params;
  return (
    <CmsPage
      apiId="programs"
      slug={`programs/${slug}`}
      contentSlug={slug}
      useFallback={false}
    />
  );
}
