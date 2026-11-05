import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "about-hospital", slug: "hospital" });
}

export default function Page() {
  return <CmsPage apiId="about-hospital" slug="hospital" />;
}