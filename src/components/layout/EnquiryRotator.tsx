"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

const DELAY = 1500;

/** Cycles the enquiry numbers in the top strip: the next one pushes the current one out to the right. Both sit in one grid cell so the width never jumps. */
export function EnquiryRotator({ items }: { items: string[] }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const n = items.length;

  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => {
      setCur((c) => {
        setPrev(c);
        return (c + 1) % n;
      });
    }, DELAY);
    return () => clearInterval(t);
  }, [n]);

  return (
    <span className={styles.rot}>
      {items.map((text, i) => {
        const [label, num] = text.split(": ");
        const state = i === cur ? (prev === null ? "" : styles.rotIn) : i === prev ? styles.rotOut : styles.rotOff;
        return (
          <span key={text} className={`${styles.rotItem} ${state}`} aria-hidden={i !== cur}>
            {label}: <b>{num}</b>
          </span>
        );
      })}
    </span>
  );
}
