import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
