"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/iconMeta";
import { journeys } from "@/data/content";
import styles from "./Journey.module.scss";

const DEFAULT = journeys.findIndex((j) => j.theme === "hot");

export function Journey() {
  // The highlighted card follows the pointer/focus and falls back to the designed default.
  const [on, setOn] = useState(DEFAULT);
  return (
    <section className={styles.section} aria-labelledby="journey-title">
      <div className={styles.inner}>
        <h2 id="journey-title" className={styles.title}>
          Education <i>•</i> Healthcare <i>•</i> Research
        </h2>
        <p className={styles.sub}>
          <span>Choose Your Journey</span>
        </p>
        <ul className={styles.cards} onMouseLeave={() => setOn(DEFAULT)} onBlur={() => setOn(DEFAULT)}>
          {journeys.map((j, i) => (
            <li
              key={j.key}
              className={`${styles.card} ${i === on ? styles.hot : ""}`}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
            >
              <Photo name={`journey-${j.key}`} alt={j.alt} sizes="(max-width: 960px) 100vw, 547px" className={styles.photo} />
              <div className={styles.body}>
                <h3 className={styles.head}>
                  <Icon name={`${j.icon}-o` as IconName} className={styles.icoO} />
                  <Icon name={`${j.icon}-w` as IconName} className={styles.icoW} />
                  {j.title}
                </h3>
                <p className={styles.text}>{j.text}</p>
                <ul className={styles.chips}>
                  {j.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Button
                  href={j.cta.href}
                  variant={i === on ? "white" : "soft"}
                  icon={null}
                  className={styles.cta}
                >
                  {j.cta.label}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
