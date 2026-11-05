import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "staff-publications", slug: "research/staff-publications" });
}

export default function Page() {
  return <CmsPage apiId="staff-publications" slug="research/staff-publications" />;
}