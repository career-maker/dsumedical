"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Clamp.module.scss";

const COLLAPSED = 420; // default px shown before "Load more"

/**
 * Keeps a long block from stretching its section. Content that fits is shown as is (no button). Longer content shows its
 * first part with a fade and a "Load more" button; opening it reveals the rest inside a fixed-height area that scrolls
 * (scrollbar hidden), and the button becomes "Load less".
 */
export function Clamp({ children, collapsed = COLLAPSED }: { children: React.ReactNode; /** Height in px shown before "Load more". */ collapsed?: number }) {
  const inner = useRef<HTMLDivElement>(null);
  const [long, setLong] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const check = () => setLong(el.scrollHeight > collapsed + 40);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [collapsed]);

  return (
    <div className={`${styles.clamp} ${long && !open ? styles.shut : ""} ${long && open ? styles.open : ""}`}>
      <div ref={inner} className={styles.view} style={{ "--clamp": `${collapsed}px` } as React.CSSProperties}>
        {children}
      </div>
      {long && (
        <button type="button" className={styles.toggle} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Load less" : "Load more"}
          <span aria-hidden="true">{open ? " ↑" : " ↓"}</span>
        </button>
      )}
    </div>
  );
}
