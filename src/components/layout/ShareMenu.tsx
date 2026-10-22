"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./SideRail.module.scss";

const paths = {
  facebook: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1z",
  x: "M17.5 3h3.1l-6.8 7.7L21.8 21h-6.2l-4.9-6.3L5 21H1.9l7.3-8.3L2 3h6.3l4.4 5.8L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z",
  linkedin:
    "M5.4 8.7H2.2V21h3.2V8.7zM3.8 3.5a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM21.8 21v-6.7c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.7 1-3.2 1.8V8.7h-3.2V21h3.2v-6.8c0-.4 0-.7.1-1 .3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.6V21h3.2z",
  whatsapp:
    "M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z",
  mail: "M3 5h18v14H3V5zm2 2v.5l7 4.8 7-4.8V7H5zm14 3.1l-7 4.8-7-4.8V17h14v-6.9z",
  link: "M10.6 13.4a3 3 0 004.2 0l3-3a3 3 0 10-4.2-4.2l-1 1M13.4 10.6a3 3 0 00-4.2 0l-3 3a3 3 0 104.2 4.2l1-1",
} as const;

/** Share icon in the side rail: hovering (or tapping on touch) fans out the share targets. */
export function ShareMenu() {
  const pathname = usePathname();
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("CDSIMER");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(location.href);
    setTitle(document.title);
  }, [pathname]);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { key: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { key: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { key: "whatsapp", label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { key: "mail", label: "Share by email", href: `mailto:?subject=${t}&body=${u}` },
  ] as const;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <li className={`${styles.share} ${open ? styles.shareOpen : ""}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-label="Share" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Icon name="share-side" />
      </button>
      <div className={styles.fan} role="group" aria-label="Share this page">
        {links.map((l) => (
          <a key={l.key} href={l.href} aria-label={l.label} title={l.label} target={l.key === "mail" ? undefined : "_blank"} rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={paths[l.key]} fillRule="evenodd" />
            </svg>
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link" title={copied ? "Copied" : "Copy link"}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={paths.link} />
          </svg>
        </button>
      </div>
    </li>
  );
}
