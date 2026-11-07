"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./LeaderSlides.module.scss";

type Slide = { title: string; body: string[]; image: string; alt?: string };

const DELAY = 7000;

/** Auto-advancing message slider. Pauses on hover/focus and when reduced motion is requested; slides share one grid cell so height never jumps. */
export function LeaderSlides({ items }: { items: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), DELAY);
    return () => clearInterval(t);
  }, [paused, n, i]);

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Message from the leadership"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stage} aria-live={paused ? "polite" : "off"}>
        {items.map((s, k) => (
          <article key={s.title} className={`${styles.slide} ${k === i ? styles.on : ""}`} aria-hidden={k !== i} inert={k !== i}>
            <div className={styles.copy}>
              <h3>{s.title}</h3>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className={styles.photo}>
              <Image src={`/images/${s.image}`} alt={s.alt ?? ""} fill sizes="(max-width: 960px) 80vw, 440px" />
            </div>
          </article>
        ))}
      </div>
      {n > 1 && (
        <div className={styles.controls}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous message" />
          <div className={styles.dots}>
            {items.map((s, k) => (
              <button key={s.title} type="button" onClick={() => setI(k)} aria-label={`Show message ${k + 1}`} aria-current={k === i} className={k === i ? styles.active : ""} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next message" className={styles.next} />
        </div>
      )}
    </div>
  );
}
