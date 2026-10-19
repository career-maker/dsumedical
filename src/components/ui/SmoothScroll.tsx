"use client";

import { useEffect } from "react";

/** Inertial wheel scrolling (Lenis, library defaults), started after load so it never competes with first paint. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let cancelled = false;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: true });
      stop = () => lenis.destroy();
    };
    // Lenis is touch-passive (native scrolling on phones), so it only matters once the page is idle.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    const h = idle(() => void start());
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof h === "number") window.cancelIdleCallback(h);
      stop();
    };
  }, []);
  return null;
}
