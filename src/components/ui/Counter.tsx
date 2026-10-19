"use client";

import { useEffect, useRef, useState } from "react";

/** Counts the first number in `value` up from 0 when scrolled into view ("900+" -> 0..900+, "24×7" -> 0..24×7). */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    const el = ref.current;
    if (!m || !el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const fmt = (n: number) => (num.includes(",") ? n.toLocaleString("en-IN", { maximumFractionDigits: decimals }) : n.toFixed(decimals));
    setText(`${pre}${fmt(0)}${post}`);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1600, 1);
          setText(`${pre}${fmt(target * (1 - Math.pow(1 - p, 3)))}${post}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{text}</span>;
}
