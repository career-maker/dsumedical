import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { news, newsTabs, tagLabel } from "@/data/home";
import type { NewsItem } from "@/data/home";
import { site } from "@/lib/site";
import styles from "./NewsArticle.module.scss";

type Props = { item: NewsItem; prev?: NewsItem; next?: NewsItem };

function Neighbour({ item, dir }: { item?: NewsItem; dir: "prev" | "next" }) {
  if (!item) return <span className={styles.navGap} aria-hidden="true" />;
  return (
    <Link prefetch={false} href={`/news/${item.slug}`} className={`${styles.nav} ${dir === "next" ? styles.navNext : ""}`} rel={dir}>
      <span className={styles.navDir}>{dir === "prev" ? "← Previous" : "Next →"}</span>
      <span className={styles.navTitle}>{item.title}</span>
      {item.date && <span className={styles.navDate}>{item.date}</span>}
    </Link>
  );
}

export function NewsArticle({ item, prev, next }: Props) {
  const latest = news.filter((n) => n.slug !== item.slug).slice(0, 4);
  const url = encodeURIComponent(`${site}/news/${item.slug}`);
  const text = encodeURIComponent(item.title);
  const shares = [
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${url}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  ];

  return (
    <section className={styles.section} aria-label="Article">
      <div className={styles.grid}>
        <article className={styles.article}>
          <div className={styles.cover}>
            <Image src={`/images/${item.photo}`} alt={item.alt} fill sizes="(max-width: 1100px) 100vw, 860px" />
          </div>
          <p className={styles.meta}>
            <Link prefetch={false} href={`/news#${item.tag}`} className={styles.tag}>
              {tagLabel(item.tag)}
            </Link>
            {item.date && <time dateTime={item.iso}>{item.date}</time>}
          </p>

          <div className={styles.body}>
            {item.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {item.highlights && (
            <section className={styles.block} aria-labelledby="news-highlights">
              <h2 id="news-highlights">{item.highlights.title}</h2>
              <ul className={styles.list}>
                {item.highlights.items.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {item.facts && (
            <dl className={styles.facts}>
              {item.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {item.source && (
            <p className={styles.source}>
              <a href={item.source.href} target="_blank" rel="noopener noreferrer">
                {item.source.label} ↗
              </a>
            </p>
          )}

          <nav className={styles.pager} aria-label="More stories">
            <Neighbour item={prev} dir="prev" />
            <Neighbour item={next} dir="next" />
          </nav>
        </article>

        <aside className={styles.aside} aria-label="Widgets">
          <section className={styles.widget} aria-labelledby="w-latest">
            <h2 id="w-latest">Latest updates</h2>
            <ul className={styles.latest}>
              {latest.map((n) => (
                <li key={n.slug}>
                  <Link prefetch={false} href={`/news/${n.slug}`}>
                    <span className={styles.thumb}>
                      <Image src={`/images/${n.photo}`} alt="" fill sizes="96px" />
                    </span>
                    <span>
                      <strong>{n.title}</strong>
                      {n.date && <time dateTime={n.iso}>{n.date}</time>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.widget} aria-labelledby="w-cats">
            <h2 id="w-cats">Browse by category</h2>
            <ul className={styles.cats}>
              {newsTabs.filter((t) => t.id === "all" || news.some((x) => x.tag === t.id)).map((t) => {
                const n = t.id === "all" ? news.length : news.filter((x) => x.tag === t.id).length;
                return (
                  <li key={t.id}>
                    <Link prefetch={false} href={t.id === "all" ? "/news" : `/news#${t.id}`}>
                      <span>{t.label}</span>
                      <span className={styles.count}>{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.widget} aria-labelledby="w-share">
            <h2 id="w-share">Share this story</h2>
            <ul className={styles.share}>
              {shares.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.cta} aria-labelledby="w-cta">
            <h2 id="w-cta">Thinking of studying at CDSIMER?</h2>
            <p>Talk to our admissions team about MBBS and other programmes.</p>
            <Button href="/admissions" variant="white">
              Admissions
            </Button>
            <a href="tel:+916366885501" className={styles.call}>
              Student Admission Enquiry: 6366 885 501
            </a>
          </section>
        </aside>
      </div>
    </section>
  );
}
