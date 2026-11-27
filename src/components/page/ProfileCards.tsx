"use client";

import { FacultyCard, type Faculty } from "@/components/ui/FacultyCard";
import { useCallback, useEffect, useRef, useState } from "react";
import carousel from "./Carousel.module.scss";
import styles from "./Blocks.module.scss";

/** Faculty cards: five per row on desktop; a swipeable scroll-snap carousel (with arrows) on tablet and phone. Each card shows a background-free cutout (see FacultyCard). */
const ROW = 5; // cards per row on desktop
const FIRST = 2 * ROW; // tidy layout: two rows, then Load more

export function ProfileCards({ items, tidy }: { items: Faculty[]; tidy?: boolean }) {
  const [all, setAll] = useState(false);
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

  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <ul ref={track} className={`${styles.profileRow} ${tidy ? styles.profileTidy : ""}`} data-collapsed={tidy && !all && items.length > FIRST ? "" : undefined} onScroll={update}>
        {items.map((p, i) => {
          // Tidy: a short last row sits in the middle (ten columns, each card spans two; the first card of the row picks its start column).
          const left = items.length % ROW;
          const style = tidy && left && i === items.length - left ? { gridColumn: `${ROW + 1 - left} / span 2` } : undefined;
          return <FacultyCard key={p.name} person={p} tone={i} style={style} extra={!!tidy && i >= FIRST} />;
        })}
      </ul>
      {tidy && items.length > FIRST && (
        <button type="button" className={styles.loadMore} aria-expanded={all} onClick={() => setAll((v) => !v)}>
          {all ? "Load less" : "Load more"}
          <span aria-hidden="true">{all ? " ↑" : " ↓"}</span>
        </button>
      )}
      {!(edge.start && edge.end) && (
        <div className={`${carousel.controls} ${styles.profileNav}`}>
          <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous faculty" />
          <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Next faculty" className={carousel.next} />
        </div>
      )}
    </div>
  );
}
