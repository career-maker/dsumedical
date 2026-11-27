"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { homeEvents } from "@/data/events-latest";
import type { IconName } from "@/data/iconMeta";
import styles from "./News.module.scss";

// The four categories of the existing CDSIMER events page; the home grid shows the three newest of each.
const tabs: { id: keyof typeof homeEvents; label: string; icon: IconName }[] = [
  { id: "activity", label: "Faculty Activity", icon: "n-events" },
  { id: "studentActivity", label: "Student Activity", icon: "n-acad" },
  { id: "facultyAchievements", label: "Faculty Achievements", icon: "n-res" },
  { id: "studentAchievements", label: "Student Achievements", icon: "n-hosp" },
];

export function News() {
  const [tab, setTab] = useState<keyof typeof homeEvents>("activity");
  const items = homeEvents[tab];

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
        <div className={styles.tabs} role="tablist" aria-label="Event categories">
          {tabs.map((t) => (
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
              <Icon name={t.icon} className={styles.icoO} />
              <Icon name={`${t.icon}-w` as IconName} className={styles.icoW} />
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id="news-panel" aria-labelledby={`news-tab-${tab}`}>
          <ul className={styles.cards}>
            {items.map((e) => (
              <li key={e.title} className={styles.event}>
                {e.date && <time className={styles.eventDate} dateTime={e.iso}>{e.date}</time>}
                <h3>{e.title}</h3>
                <Link prefetch={false} href="/events" className={styles.eventMore} aria-label="View all events">
                  VIEW ALL EVENTS &gt;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
