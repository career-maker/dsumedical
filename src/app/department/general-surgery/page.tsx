import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "department-of-general-surgery", slug: "department/general-surgery" });
}

export default function Page() {
  return <CmsPage apiId="department-of-general-surgery" slug="department/general-surgery" />;
}