"use client";

import { SmartLink as Link } from "@/components/ui/SmartLink";
import { useEffect, useId, useState } from "react";
import styles from "./MobileNav.module.scss";

type NavItem = { label: string; href: string; children?: NavItem[] };

function Chevron({ open, label, onClick, controls }: { open: boolean; label: string; onClick: () => void; controls?: string }) {
  return (
    <button
      type="button"
      className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={`${open ? "Collapse" : "Expand"} ${label}`}
      onClick={onClick}
    />
  );
}

/** Second level; its own children (third level) expand inline. */
function SubItem({ item, close }: { item: NavItem; close: () => void }) {
  const [open, setOpen] = useState(false);
  const kids = item.children?.length ? item.children : null;
  return (
    <li>
      <div className={styles.subRow}>
        <Link href={item.href} onClick={close}>
          {item.label}
        </Link>
        {kids && <Chevron open={open} label={item.label} onClick={() => setOpen((v) => !v)} />}
      </div>
      {kids && (
        <ul className={styles.subsub} hidden={!open}>
          {kids.map((c) => (
            <li key={c.label + c.href}>
              <Link href={c.href} onClick={close}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function TopItem({ item, close, idBase }: { item: NavItem; close: () => void; idBase: string }) {
  const [open, setOpen] = useState(false);
  const kids = item.children?.length ? item.children : null;
  const subId = `${idBase}-${item.label.replace(/\W+/g, "-")}`;
  return (
    <li>
      <div className={styles.row}>
        <Link href={item.href} onClick={close}>
          {item.label}
        </Link>
        {kids && <Chevron open={open} label={item.label} controls={subId} onClick={() => setOpen((v) => !v)} />}
      </div>
      {kids && (
        <ul id={subId} className={styles.sub} hidden={!open}>
          {kids.map((c) => (
            <SubItem key={c.label + c.href} item={c} close={close} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

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
            <TopItem key={i.label + i.href} item={i} close={close} idBase={panelId} />
          ))}
        </ul>
        <Link href={cta.href} className={styles.cta} onClick={close}>
          {cta.label}
        </Link>
      </nav>
    </div>
  );
}
