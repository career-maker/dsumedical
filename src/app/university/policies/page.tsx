import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "policies", slug: "university/policies", contentSlug: "policies" });
}

export default function Page() {
  return <CmsPage apiId="policies" slug="university/policies" contentSlug="policies" />;
}
