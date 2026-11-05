import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "central-research-and-innovation-wing", slug: "research/central-research-and-innovation-wing" });
}

export default function Page() {
  return <CmsPage apiId="central-research-and-innovation-wing" slug="research/central-research-and-innovation-wing" />;
}