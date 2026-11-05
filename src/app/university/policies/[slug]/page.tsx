import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

type PolicyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PolicyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return generateCmsMetadata({
    apiId: "policies",
    slug: `university/policies/${slug}`,
    contentSlug: slug,
    useFallback: false
  });
}

export default async function PolicyDetailPage({ params }: PolicyRouteProps) {
  const { slug } = await params;
  return (
    <CmsPage
      apiId="policies"
      slug={`university/policies/${slug}`}
      contentSlug={slug}
      useFallback={false}
    />
  );
}
