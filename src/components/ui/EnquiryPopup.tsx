"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./EnquiryPopup.module.scss";

// Loaded only when the dialog opens, so the form code is not part of every page's JavaScript.
const Enquiry = dynamic(() => import("@/components/page/Explorers").then((m) => m.Enquiry), { ssr: false });

const KEY = "enquiry-popup-shown";

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
      setOpen(true);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 3000);
    return () => clearTimeout(t);
  }, [pathname]);

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
          <Image src="/images/contact-message.jpg" alt="" fill sizes="(max-width: 900px) 0px, 380px" />
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
