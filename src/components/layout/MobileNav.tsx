"use client";

import { SmartLink as Link } from "@/components/ui/SmartLink";
import { useEffect, useId, useState } from "react";
import styles from "./MobileNav.module.scss";

type NavItem = { label: string; href: string; children?: NavItem[] };

export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className={open ? styles.barsOpen : styles.bars} />
      </button>
      <nav id={panelId} className={styles.panel} hidden={!open} aria-label="Mobile" data-lenis-prevent>
        <ul>
          {items.map((i) => (
            <li key={i.label}>
              <Link href={i.href} onClick={() => setOpen(false)}>
                {i.label}
              </Link>
              {i.children && (
                <ul className={styles.sub}>
                  {i.children.map((c) => (
                    <li key={c.label}>
                      <Link href={c.href} onClick={() => setOpen(false)}>
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link href={cta.href} className={styles.cta} onClick={() => setOpen(false)}>
          {cta.label}
        </Link>
      </nav>
    </div>
  );
}
