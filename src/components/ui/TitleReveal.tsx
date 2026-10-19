"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Premium reveal for every page title: fade, rise, de-blur and mask-wipe as it scrolls into view. */
export function TitleReveal() {
  const path = usePathname();
  useEffect(() => {
    const titles = document.querySelectorAll<HTMLElement>("main h1, main h2");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.reveal = "in";
          io.unobserve(e.target);
        }),
      { threshold: 0 },
    );
    titles.forEach((t) => {
      t.dataset.reveal = "";
      io.observe(t);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
