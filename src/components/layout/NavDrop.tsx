"use client";

import { useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import type { NavLink } from "@/data/nav";
import styles from "./Header.module.scss";

/** Desktop dropdown: parents with children collapse; opening one closes the others. */
export function NavDrop({ items }: { items: NavLink[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className={styles.drop}>
      {items.map((c) => {
        const isOpen = open === c.label;
        return (
          <li key={c.label} className={c.children ? styles.group : undefined}>
            <div className={styles.groupRow}>
              <SmartLink href={c.href}>{c.label}</SmartLink>
              {c.children && (
                <button
                  type="button"
                  className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${c.label}`}
                  onClick={() => setOpen(isOpen ? null : c.label)}
                />
              )}
            </div>
            {c.children && (
              <ul className={styles.subList} hidden={!isOpen}>
                {c.children.map((g) => (
                  <li key={g.label}>
                    <SmartLink href={g.href}>{g.label}</SmartLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
