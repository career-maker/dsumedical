import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "post-graduation-programme", slug: "programs/post-graduation" });
}

export default function Page() {
  return <CmsPage apiId="post-graduation-programme" slug="programs/post-graduation" />;
}