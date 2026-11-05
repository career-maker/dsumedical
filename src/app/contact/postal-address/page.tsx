import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "postal-address", slug: "contact/postal-address" });
}

export default function Page() {
  return <CmsPage apiId="postal-address" slug="contact/postal-address" />;
}