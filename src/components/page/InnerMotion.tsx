"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Block parts that fade/slide in as they scroll into view. Structural selectors, so it works on any block.
const TARGETS = "main > section header, main > section li, main > section details, main > section form, main > section address, main > section table, main > section [data-rv]";

/** Scroll reveal for inner pages. Only elements below the fold are hidden, so nothing flashes on load. */
export function InnerMotion() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.rv = "in";
          io.unobserve(e.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (el.closest("nav")) return;
      if (el.getBoundingClientRect().top < innerHeight) return;
      const sibs = el.parentElement ? [...el.parentElement.children] : [];
      el.style.setProperty("--i", String(Math.min(sibs.indexOf(el), 6)));
      el.dataset.rv = "";
      io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
