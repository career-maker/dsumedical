import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "student-research-activities", slug: "research/student-activities" });
}

export default function Page() {
  return <CmsPage apiId="student-research-activities" slug="research/student-activities" />;
}