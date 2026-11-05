import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "central-laboratory", slug: "hospital/central-laboratory" });
}

export default function Page() {
  return <CmsPage apiId="central-laboratory" slug="hospital/central-laboratory" />;
}