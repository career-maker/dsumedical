import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternal } from "@/data/nav";

/** Next Link for internal routes, plain new-tab anchor for external URLs (mailto/tel open in place). */
export function SmartLink({ href, children, ...rest }: ComponentProps<typeof Link>) {
  const h = String(href);
  if (!isExternal(h)) return <Link prefetch={false} href={href} {...rest}>{children}</Link>;
  const newTab = h.startsWith("http");
  return (
    <a href={h} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(rest as object)}>
      {children}
    </a>
  );
}
