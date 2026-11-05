import type { Metadata } from "next";
import { CmsPage, generateCmsMetadata } from "@/components/page/CmsPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata({ apiId: "key-contacts", slug: "contact/key-contacts" });
}

export default function Page() {
  return <CmsPage apiId="key-contacts" slug="contact/key-contacts" />;
}