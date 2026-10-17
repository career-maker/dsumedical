"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { crosses } from "@/data/crosses";
import { departmentTabs, departments } from "@/data/content";
import styles from "./Departments.module.scss";

function Chevron({ active }: { active?: boolean }) {
  return (
    <span className={`${styles.next} ${active ? styles.nextOn : ""}`} aria-hidden="true">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="m4.5 1.5 4.5 4.5-4.5 4.5" />
      </svg>
    </span>
  );
}

export function Departments() {
  const [tab, setTab] = useState("para");
  const items = departments.filter((d) => d.tab === tab);

  return (
    <section className={styles.section} aria-labelledby="dept-title">
      <div className={styles.pattern} aria-hidden="true">
        {crosses.map((c) => (
          <i
            key={`${c.x}-${c.y}`}
            style={{
              left: `calc(${c.x} * var(--u))`,
              top: `calc(${c.y} * var(--u))`,
              width: `calc(${c.w} * var(--u))`,
              height: `calc(${c.h} * var(--u))`,
              opacity: c.o,
            }}
          />
        ))}
      </div>
      <div className={styles.inner}>
        <h2 id="dept-title" className={styles.title}>
          Departments
        </h2>
        <p className={styles.sub}>
          Discover specialized departments focused on top-notch medical education, patient care, and innovative research,
          shaping future healthcare professionals.
        </p>
        <div className={styles.tabs} role="tablist" aria-label="Department categories">
          {departmentTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabOn : ""}`}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        {items.length > 0 ? (
          <ul className={styles.cards}>
            {items.map((d, i) => (
              <li key={d.title} className={styles.card}>
                <Photo name={d.photo} alt={d.alt} sizes="404px" className={styles.photo} />
                <span className={styles.badge}>
                  <Icon name={d.icon} />
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <Chevron active={i === 1} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Departments in this category will be listed soon.</p>
        )}
      </div>
    </section>
  );
}
