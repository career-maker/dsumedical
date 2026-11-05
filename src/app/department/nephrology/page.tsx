import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "department-of-nephrology", slug: "department/nephrology" });
}

export default function Page() {
  return <CmsPage apiId="department-of-nephrology" slug="department/nephrology" />;
}