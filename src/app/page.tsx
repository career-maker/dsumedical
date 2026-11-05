import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Blocks } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { PageShell } from "@/components/page/PageShell";
import { richTextToPlainText } from "@/components/page/RichText";
import { SideRail } from "@/components/layout/SideRail";
import { Academics } from "@/components/sections/home/Academics";
import { Community } from "@/components/sections/home/Community";
import { Cta } from "@/components/sections/home/Cta";
import { Departments } from "@/components/sections/home/Departments";
import { Excellence } from "@/components/sections/home/Excellence";
import { Hero } from "@/components/sections/home/Hero";
import { Journey } from "@/components/sections/home/Journey";
import { LearnWhere } from "@/components/sections/home/LearnWhere";
import { News } from "@/components/sections/home/News";
import { Research } from "@/components/sections/home/Research";
import { StudentLife } from "@/components/sections/home/StudentLife";
import { Why } from "@/components/sections/home/Why";
import { fetchPage } from "@/lib/api/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage("home-page");
  if (!page) return {};
  return {
    title: page.seo?.title ?? `${page.title} | CDSIMER`,
    description: page.seo?.description ?? richTextToPlainText(page.lead),
    ...(page.seo?.canonicalUrl ? { alternates: { canonical: page.seo.canonicalUrl } } : {}),
    ...(page.seo?.shareImage
      ? { openGraph: { images: [{ url: page.seo.shareImage }] } }
      : {}),
    ...(page.seo?.noIndex ? { robots: { index: false, follow: false } } : {})
  };
}

export default async function Home() {
  const cmsPage = await fetchPage("home-page");
  if (cmsPage) {
    return (
      <PageShell>
        <PageHero page={cmsPage} />
        <Blocks blocks={cmsPage.blocks} />
      </PageShell>
    );
  }

  return (
    <>
      <Header />
      <SideRail />
      <main>
        <Hero />
        <Excellence />
        <Journey />
        <Why />
        <Academics />
        <LearnWhere />
        <Departments />
        <Research />
        <Community />
        <News />
        <StudentLife />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
