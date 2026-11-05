import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "maps-and-directions", slug: "contact/maps-and-directions" });
}

export default function Page() {
  return <CmsPage apiId="maps-and-directions" slug="contact/maps-and-directions" />;
}