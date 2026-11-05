import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "campus-tour", slug: "campus-tour" });
}

export default function Page() {
  return <CmsPage apiId="campus-tour" slug="campus-tour" />;
}