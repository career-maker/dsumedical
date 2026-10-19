import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Ticker } from "@/components/ui/Ticker";
import { crumbs } from "@/data/pages";
import type { PageDef } from "@/data/pages/types";
import styles from "./PageHero.module.scss";

export function PageHero({ page }: { page: PageDef }) {
  const trail = crumbs(page.slug, page.title);
  return (
    <>
    <section className={styles.hero} aria-labelledby="page-title">
      <Image src={`/images/${page.hero}`} alt={page.heroAlt} fill preload sizes="100vw" className={styles.bg} />
      <div className={styles.shade} />
      <div className={styles.inner}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link prefetch={false} href="/">Home</Link>
          {trail.map((c, i) => (
            <span key={c.href}>
              <span aria-hidden="true"> / </span>
              {i === trail.length - 1 ? <span aria-current="page">{c.label}</span> : <Link prefetch={false} href={c.href}>{c.label}</Link>}
            </span>
          ))}
        </nav>
        <p className={styles.eyebrow}>{page.eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          {page.title}
        </h1>
        <p className={styles.lead}>{page.lead}</p>
        {page.actions && (
          <div className={styles.actions}>
            {page.actions.map((a) => (
              <Button key={a.label} href={a.href} variant={a.variant ?? "primary"}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
    <Ticker />
    </>
  );
}
