import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

type EventRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EventRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return generateCmsMetadata({
    apiId: "events",
    slug: `events/${slug}`,
    contentSlug: slug
  });
}

export default async function EventDetailPage({ params }: EventRouteProps) {
  const { slug } = await params;
  return (
    <CmsPage
      apiId="events"
      slug={`events/${slug}`}
      contentSlug={slug}
    />
  );
}
