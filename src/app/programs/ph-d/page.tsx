import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "programs", slug: "programs/ph-d", contentSlug: "ph-d" });
}

export default function Page() {
  return <CmsPage apiId="programs" slug="programs/ph-d" contentSlug="ph-d" />;
}