import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "information-under-msr-clause-b-1-11", slug: "msr-clause" });
}

export default function Page() {
  return <CmsPage apiId="information-under-msr-clause-b-1-11" slug="msr-clause" />;
}