"use client";

import { useState, type ReactNode } from "react";
import styles from "./Footer.module.scss";

type Props = {
  as?: "nav" | "address" | "div";
  className: string;
  id: string;
  title: string;
  children: ReactNode;
};

/** Footer column: plain heading on desktop, accordion on mobile (the CSS decides which). */
export function FoldCol({ as = "div", className, id, title, children }: Props) {
  const [open, setOpen] = useState(false);
  const Tag = as === "nav" ? "nav" : "div"; // <address> goes around the content only: it may not contain a heading
  return (
    <Tag className={className} aria-labelledby={as === "nav" ? id : undefined}>
      <h2 id={id}>
        <button type="button" className={styles.fold} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen((o) => !o)}>
          {title}
          <svg className={styles.chev} viewBox="0 0 12 8" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 1.5 6 6.5 11 1.5" />
          </svg>
        </button>
      </h2>
      <div id={`${id}-panel`} className={`${styles.foldPanel} ${open ? styles.foldOpen : ""}`}>
        {as === "address" ? <address>{children}</address> : children}
      </div>
    </Tag>
  );
}
