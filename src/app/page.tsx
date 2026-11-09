import type { Metadata } from "next";
import lazy from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Blocks } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { PageShell } from "@/components/page/PageShell";
import { richTextToPlainText } from "@/components/page/RichText";
import { SideRail } from "@/components/layout/SideRail";
import { Community } from "@/components/sections/home/Community";
import { Cta } from "@/components/sections/home/Cta";
import { Excellence } from "@/components/sections/home/Excellence";
import { Hero } from "@/components/sections/home/Hero";
import { LearnWhere } from "@/components/sections/home/LearnWhere";
import { Research } from "@/components/sections/home/Research";
import { StudentLife } from "@/components/sections/home/StudentLife";
import { fetchPage } from "@/lib/api/pages";

// Below-the-fold interactive sections: still server-rendered, but their JavaScript hydrates lazily instead of blocking the first load.
const Academics = lazy(() => import("@/components/sections/home/Academics").then((m) => m.Academics));
const Departments = lazy(() => import("@/components/sections/home/Departments").then((m) => m.Departments));
const Journey = lazy(() => import("@/components/sections/home/Journey").then((m) => m.Journey));
const News = lazy(() => import("@/components/sections/home/News").then((m) => m.News));
const Why = lazy(() => import("@/components/sections/home/Why").then((m) => m.Why));

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
        <Blocks blocks={cmsPage.blocks} useFallbackImages={false} />
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
