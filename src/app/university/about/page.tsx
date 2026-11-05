import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "about-cdsimer", slug: "university/about", useFallback: false });
}

export default function Page() {
  return <CmsPage apiId="about-cdsimer" slug="university/about" useFallback={false} />;
}
