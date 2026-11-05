import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "department-of-paediatrics", slug: "department/paediatrics" });
}

export default function Page() {
  return <CmsPage apiId="department-of-paediatrics" slug="department/paediatrics" />;
}