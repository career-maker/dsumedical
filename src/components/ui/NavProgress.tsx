"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./NavProgress.module.scss";

/** Thin top bar that starts when an internal link is clicked and finishes when the new route renders. */
export function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setState("loading");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // New route rendered: finish the bar, then hide it.
  useEffect(() => {
    setState((s) => (s === "loading" ? "done" : s));
  }, [pathname]);

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), state === "done" ? 500 : 15000);
    return () => clearTimeout(t);
  }, [state]);

  return <div className={`${styles.bar} ${styles[state]}`} role="progressbar" aria-hidden={state === "idle"} />;
}
