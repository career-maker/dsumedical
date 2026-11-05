import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "anti-ragging-committee", slug: "university/anti-ragging-committee" });
}

export default function Page() {
  return <CmsPage apiId="anti-ragging-committee" slug="university/anti-ragging-committee" />;
}
