import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Dots } from "./Icon";
import styles from "./Button.module.scss";

type Variant = "primary" | "soft" | "outline" | "glass" | "white" | "gray" | "light";

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Trailing icon; defaults to the dots glyph for primary/outline/glass. */
  icon?: ReactNode | null;
  className?: string;
  /** Design-px width taken from the mockup (content-sized when omitted). */
  width?: number;
};

const dotsVariants: Variant[] = ["primary", "outline", "glass"];

export function Button({ href, variant = "primary", children, icon, className, width }: ButtonProps) {
  const trailing =
    icon === undefined ? (dotsVariants.includes(variant) ? <Dots color={variant === "white" ? "#dc2725" : "#fff"} /> : null) : icon;
  return (
    <Link prefetch={false} href={href} className={`${styles.btn} ${styles[variant]} ${className ?? ""}`}
      style={width ? ({ "--w": `calc(${width} * var(--u))` } as CSSProperties) : undefined}
    >
      <span>{children}</span>
      {trailing}
    </Link>
  );
}
