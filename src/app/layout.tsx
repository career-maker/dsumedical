import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { EnquiryPopup } from "@/components/ui/EnquiryPopup";
import { NavProgress } from "@/components/ui/NavProgress";
import { Preloader } from "@/components/ui/Preloader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { TitleReveal } from "@/components/ui/TitleReveal";
import "@/styles/globals.scss";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  // Beta stage: remove when going live.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  title: "CDSIMER | Dr. Chandramma Dayananda Sagar Institute of Medical Education & Research",
  description:
    "CDSIMER at Dayananda Sagar University delivers quality medical education through experienced faculty, modern infrastructure, clinical exposure, and a strong focus on research and patient care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        {/* Runs before hydration so a fast click on an enquiry link never navigates: EnquiryPopup picks up the flag/event. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.addEventListener("click",function(e){if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.pathname==="/enquiry")return;var t=e.target;if(!t.closest||!t.closest("[data-enquiry-popup]"))return;e.preventDefault();e.stopImmediatePropagation();window.__enquiryOpen=1;window.dispatchEvent(new Event("enquiry-open"))},true)',
          }}
        />
        <noscript>
          <style>{"#pl{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <NavProgress />
        <Preloader />
        <TitleReveal />
        <SmoothScroll />
        <EnquiryPopup />
        {children}
      </body>
    </html>
  );
}
