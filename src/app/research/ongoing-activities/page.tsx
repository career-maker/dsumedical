import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "ongoing-research-activities", slug: "research/ongoing-activities" });
}

export default function Page() {
  return <CmsPage apiId="ongoing-research-activities" slug="research/ongoing-activities" />;
}