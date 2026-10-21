"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Blocks.module.scss";

/** Sticky in-page tabs: underlines the section currently under the bar and keeps its tab scrolled into view. */
export function JumpNav({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const tick = () => {
      const line = (list.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let cur = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setActive(cur);
    };
    tick();
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    return () => {
      removeEventListener("scroll", tick);
      removeEventListener("resize", tick);
    };
  }, [items]);

  useEffect(() => {
    const ul = list.current;
    const a = ul?.querySelector<HTMLElement>('[aria-current="true"]');
    if (ul && a) ul.scrollTo({ left: a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.jump} aria-label="On this page">
      <ul ref={list}>
        {items.map((b) => (
          <li key={b.id}>
            <a href={`#${b.id}`} aria-current={active === b.id ? "true" : undefined}>
              {b.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
