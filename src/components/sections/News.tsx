"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { news, newsTabs } from "@/data/news";
import styles from "./News.module.scss";

export function News() {
  const [tab, setTab] = useState("all");
  const items = tab === "all" ? news : news.filter((n) => n.tag === tab);

  return (
    <section className={styles.section} aria-labelledby="news-title">
      <div className={styles.inner}>
        <h2 id="news-title" className={styles.title}>
          News &amp; Events
        </h2>
        <p className={styles.sub}>
          Stay informed with the latest updates, academic achievements, research breakthroughs, hospital initiatives, and
          upcoming events at CDSIMER.
        </p>
        <div className={styles.tabs} role="tablist" aria-label="News categories">
          {newsTabs.map((t) => (
            <button
              key={t.id}
              id={`news-tab-${t.id}`}
              aria-controls="news-panel"
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.on : ""}`}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id="news-panel" aria-labelledby={`news-tab-${tab}`}>
        {items.length > 0 ? (
          <ul className={styles.cards}>
            {items.map((n) => (
              <li key={n.title} className={styles.card}>
                <Photo name={n.photo} alt={n.alt} sizes="(max-width: 768px) 100vw, 640px" eager className={styles.photo} />
                <time className={styles.date} dateTime={n.iso}>{n.date}</time>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <Link prefetch={false} href="/news" className={styles.more}>
                  READ MORE &gt;
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No updates in this category yet.</p>
        )}
        </div>
      </div>
    </section>
  );
}
