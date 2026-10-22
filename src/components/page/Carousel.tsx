"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./Carousel.module.scss";

type Item = { title: string; text?: string; tag?: string; href?: string };

/** Scroll-snap carousel: swipes on touch, arrows on desktop; arrows only appear once the cards overflow. */
export function Carousel({ items }: { items: Item[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = track.current;
    if (el) setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, items]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <ul ref={track} className={styles.track} onScroll={update} tabIndex={0} aria-label="Scrollable list">
        {items.map((c) => {
          const inner = (
            <>
              {c.tag && <span className={styles.tag}>{c.tag}</span>}
              <h3>{c.title}</h3>
              {c.text && <p>{c.text}</p>}
              {c.href && <span className={styles.more}>View / Download →</span>}
            </>
          );
          return (
            <li key={c.title}>
              {c.href ? (
                <SmartLink href={c.href} className={styles.card}>
                  {inner}
                </SmartLink>
              ) : (
                <div className={styles.card}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      {!(edge.start && edge.end) && (
        <div className={styles.controls}>
          <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous" />
          <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Next" className={styles.next} />
        </div>
      )}
    </div>
  );
}
