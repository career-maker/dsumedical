"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { crosses } from "@/data/crosses";
import { departmentTabs, departments } from "@/data/content";
import { depts } from "@/data/pages/clinical";
import { photos } from "@/data/photos";
import styles from "./Departments.module.scss";

function Chevron() {
  return (
    <span className={styles.next} aria-hidden="true">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="m4.5 1.5 4.5 4.5-4.5 4.5" />
      </svg>
    </span>
  );
}

// Home cards: the four designed ones keep their exact art; every other department comes from the shared list.
const designed = new Map(departments.map((d) => [d.title, d]));
const tabIcon = { pre: "ac-mbbs", para: "d-path", clinical: "ac-pg", super: "ac-ss" } as const;
const others = ["radiodiagnosis", "anaesthesiology", "forensic-medicine-and-toxicology"];
const cardsFor = (tab: string) =>
  depts
    .filter((d) => (tab === "others" ? others.includes(d.slug) : d.tab === tab))
    .slice(0, 4)
    .map((d) => ({ ...d, art: designed.get(d.name) }));

export function Departments() {
  const [tab, setTab] = useState("para");
  const items = cardsFor(tab);

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
              id={`dept-tab-${t.id}`}
              aria-controls="dept-panel"
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

        <div role="tabpanel" id="dept-panel" aria-labelledby={`dept-tab-${tab}`}>
        {items.length > 0 ? (
          <ul className={styles.cards}>
            {items.map((d) => (
              <li key={d.slug} className={styles.card}>
                {d.art && d.art.photo in photos ? (
                  <Photo name={d.art.photo} alt={d.art.alt} sizes="404px" className={styles.photo} />
                ) : (
                  <div className={styles.cover}>
                    <Image src={`/images/${d.image}`} alt="" fill sizes="404px" />
                  </div>
                )}
                <span className={styles.badge}>
                  <Icon name={d.art?.icon ?? tabIcon[d.tab]} />
                </span>
                <h3>{d.name}</h3>
                <Link prefetch={false} href={`/department/${d.slug}`} className={styles.overlay} aria-label={`${d.name} department`} />
                <p>{d.art?.text ?? d.blurb}</p>
                <Chevron />
              </li>
            ))}
          </ul>
        ) : null}
        </div>
      </div>
    </section>
  );
}
