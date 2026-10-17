import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideRail } from "@/components/layout/SideRail";
import { Academics } from "@/components/sections/Academics";
import { Community } from "@/components/sections/Community";
import { Cta } from "@/components/sections/Cta";
import { Departments } from "@/components/sections/Departments";
import { Excellence } from "@/components/sections/Excellence";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { LearnWhere } from "@/components/sections/LearnWhere";
import { News } from "@/components/sections/News";
import { Research } from "@/components/sections/Research";
import { StudentLife } from "@/components/sections/StudentLife";
import { Why } from "@/components/sections/Why";

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
