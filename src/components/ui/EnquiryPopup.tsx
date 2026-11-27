"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./EnquiryPopup.module.scss";

// Loaded only when the dialog opens, so the form code is not part of every page's JavaScript.
const Enquiry = dynamic(() => import("@/components/page/Explorers").then((m) => m.Enquiry), { ssr: false });

const KEY = "enquiry-popup-shown";

/** Runs cb once the page preloader (#pl) has lifted, so the dialog never opens under or inside the loading screen. */
function afterPreloader(cb: () => void) {
  const gone = () => {
    const pl = document.getElementById("pl");
    if (!pl) return true;
    const cs = getComputedStyle(pl);
    return cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0";
  };
  const tick = () => (gone() ? cb() : requestAnimationFrame(tick));
  tick();
}

/** Admission enquiry dialog that opens 3 seconds after a visit begins (once per browser session). */
export function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/enquiry") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      afterPreloader(() => {
        setOpen(true);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
      });
    }, 3000);
    return () => clearTimeout(t);
  }, [pathname]);

  // Links marked data-enquiry-popup open the dialog instead of navigating. The click is caught by an inline script in layout.tsx
  // (capture phase, active before hydration; plain link still works without JS, on /enquiry, and with Ctrl/Cmd-click).
  useEffect(() => {
    const w = window as unknown as { __enquiryOpen?: number };
    const show = () => {
      w.__enquiryOpen = 0;
      afterPreloader(() => setOpen(true));
    };
    if (w.__enquiryOpen) show(); // clicked before this component hydrated
    window.addEventListener("enquiry-open", show);
    return () => window.removeEventListener("enquiry-open", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={() => setOpen(false)}>
      <div ref={panel} className={styles.panel} role="dialog" aria-modal="true" aria-label="Admission enquiry" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(false)} />
        <aside className={styles.media}>
          <Image src="/images/popup-enquiry.jpg" alt="" fill sizes="(max-width: 900px) 0px, 380px" />
          <div className={styles.caption}>
            <strong>Begin your medical career at CDSIMER</strong>
            <span>NAAC A+ · NABH · NABL accredited</span>
          </div>
        </aside>
        <div className={styles.body}>
          <h2>Admission Enquiry</h2>
          <p>Share your details and our counsellors will reach out.</p>
          <Enquiry kind="admission" />
        </div>
      </div>
    </div>
  );
}
