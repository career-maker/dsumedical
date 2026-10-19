import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideRail } from "@/components/layout/SideRail";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SideRail />
      <main>{children}</main>
      <Footer />
    </>
  );
}
