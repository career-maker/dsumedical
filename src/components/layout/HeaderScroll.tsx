"use client";

import { useEffect } from "react";

/** Drives the header: hides while scrolling down, returns on any upward scroll. State lives in data attributes, so nothing re-renders. */
export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = Math.max(window.scrollY, 0);
      const delta = y - last;
      header.dataset.stuck = String(y > 40);
      if (y < 80) header.dataset.hidden = "false";
      else if (delta > 6) header.dataset.hidden = "true";
      else if (delta < -6) header.dataset.hidden = "false";
      if (Math.abs(delta) > 6) last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    // Keep the header open while a dropdown or the mobile menu has focus.
    const onFocus = () => (header.dataset.hidden = "false");
    header.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
