"use client";

import { createContext, useContext, useId, useState } from "react";
import styles from "./ReadMore.module.scss";

const Ctx = createContext<{ open: boolean; toggle: () => void; id: string } | null>(null);

/** Shares the open / closed state between the button (inside the text column) and the full text (full width under the whole block). */
export function ReadMoreProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <Ctx.Provider value={{ open, toggle: () => setOpen((v) => !v), id }}>{children}</Ctx.Provider>;
}

/** In the text column: the short paragraph and a "Read more" button; once open only "Read less" stays here. */
export function ReadMoreToggle({ short }: { short: string }) {
  const c = useContext(Ctx)!;
  return (
    <div className={styles.root}>
      {!c.open && <p>{short}</p>}
      <button type="button" className={styles.toggle} aria-expanded={c.open} aria-controls={c.id} onClick={c.toggle}>
        {c.open ? "Read less" : "Read more"}
        <span aria-hidden="true">{c.open ? " ↑" : " →"}</span>
      </button>
    </div>
  );
}

/** The full text, shown underneath the text-and-photo row so the photo keeps its size. */
export function ReadMoreFull({ full }: { full: string }) {
  const c = useContext(Ctx)!;
  return (
    <div id={c.id} className={styles.full} hidden={!c.open}>
      <p>{full}</p>
    </div>
  );
}
