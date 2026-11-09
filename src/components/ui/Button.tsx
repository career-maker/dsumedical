import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Dots } from "./Icon";
import styles from "./Button.module.scss";

type Variant = "primary" | "soft" | "outline" | "glass" | "white" | "gray" | "light";

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Trailing icon; defaults to the dots glyph for primary/soft/outline/glass. */
  icon?: ReactNode | null;
  className?: string;
  /** Design-px width taken from the mockup (content-sized when omitted). */
  width?: number;
};

// Trailing glyph colour per variant: white on the dark / gradient fills, ink or brand colour on the light ones.
const dotColor: Record<Variant, string> = { primary: "#fff", outline: "#fff", glass: "#fff", white: "#dc2725", soft: "#ef6711", gray: "#212121", light: "#212121" };

export function Button({ href, variant = "primary", children, icon, className, width }: ButtonProps) {
  const trailing = icon === undefined ? <Dots color={dotColor[variant]} /> : icon;
  // Files and external sites open in a new tab.
  const newTab = href.startsWith("/docs/") || /\.pdf(?:[?#]|$)/i.test(href) || href.startsWith("http");
  return (
    <Link prefetch={false} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${styles.btn} ${styles[variant]} ${className ?? ""}`}
      style={width ? ({ "--w": `calc(${width} * var(--u))` } as CSSProperties) : undefined}
    >
      <span>{children}</span>
      {trailing}
    </Link>
  );
}

/** Form submit with the same look and hover motion as the link buttons. */
export function SubmitButton({ children, className, ...rest }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={`${styles.btn} ${styles.primary} ${className ?? ""}`} {...rest}>
      <span>{children}</span>
      <Dots />
    </button>
  );
}
