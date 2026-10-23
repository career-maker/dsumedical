import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideRail } from "@/components/layout/SideRail";
import { Community } from "@/components/sections/Community";
import { Cta } from "@/components/sections/Cta";
import { Excellence } from "@/components/sections/Excellence";
import { Hero } from "@/components/sections/Hero";
import { LearnWhere } from "@/components/sections/LearnWhere";
import { Research } from "@/components/sections/Research";
import { StudentLife } from "@/components/sections/StudentLife";

// Below-the-fold interactive sections: still server-rendered, but their JavaScript hydrates lazily instead of blocking the first load.
const Academics = dynamic(() => import("@/components/sections/Academics").then((m) => m.Academics));
const Departments = dynamic(() => import("@/components/sections/Departments").then((m) => m.Departments));
const Journey = dynamic(() => import("@/components/sections/Journey").then((m) => m.Journey));
const News = dynamic(() => import("@/components/sections/News").then((m) => m.News));
const Why = dynamic(() => import("@/components/sections/Why").then((m) => m.Why));

export default function Home() {
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
