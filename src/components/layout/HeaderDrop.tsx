"use client";

import { useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import type { NavLink } from "@/data/nav";
import styles from "./Header.module.scss";

/** One dropdown entry; entries with children get a toggle that expands their sub-list. */
function DropItem({ item }: { item: NavLink }) {
  const [open, setOpen] = useState(false);
  const group = Boolean(item.children?.length);
  return (
    <li className={group ? styles.group : undefined}>
      <div className={styles.groupRow}>
        <SmartLink href={item.href}>{item.label}</SmartLink>
        {group && (
          <button
            type="button"
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
            onClick={() => setOpen((v) => !v)}
          />
        )}
      </div>
      {group && (
        <ul className={styles.subList} hidden={!open}>
          {item.children!.map((c) => (
            <li key={c.label + c.href}>
              <SmartLink href={c.href}>{c.label}</SmartLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function HeaderDrop({ items }: { items: NavLink[] }) {
  return (
    <ul className={styles.drop}>
      {items.map((i) => (
        <DropItem key={i.label + i.href} item={i} />
      ))}
    </ul>
  );
}
