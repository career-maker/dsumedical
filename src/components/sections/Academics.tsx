"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { IconName } from "@/data/iconMeta";
import styles from "./Academics.module.scss";

type Program = {
  id: string;
  label: string;
  icon: IconName;
  activeIcon?: IconName;
  detail?: {
    title: string;
    paragraphs: string[];
    facts: { icon: IconName; text: string }[];
  };
};

const programs: Program[] = [
  { id: "mbbs", label: "MBBS", icon: "ac-mbbs" },
  {
    id: "pg",
    label: "Post graduate",
    icon: "ac-pg",
    detail: {
      title: "Post Graduate",
      paragraphs: [
        "The Post Graduate Program is offered under Dayananda Sagar University, Karnataka. All admissions are based on the rank obtained in the National Eligibility-cum-Entrance Test (NEET) conducted on an all India basis by the National Testing Agency.",
        "The seat allotment process happens by merit through counselling conducted by the Karnataka Examination Authority.",
      ],
      facts: [
        { icon: "ac-years", text: "3 years" },
        { icon: "ac-time", text: "Full Time" },
        { icon: "ac-students", text: "150 students per year" },
      ],
    },
  },
  { id: "ss", label: "Super Speciality", icon: "ac-ss" },
  { id: "dr", label: "Doctoral Research", icon: "ac-dr" },
];

export function Academics() {
  const [activeId, setActiveId] = useState("pg");
  const active = programs.find((p) => p.id === activeId) ?? programs[1];

  return (
    <section className={styles.section} aria-labelledby="academics-title">
      <Image src="/images/academics-bg.jpg" alt="" width={1800} height={1202} sizes="62vw" className={styles.bg} />
      <div className={styles.inner}>
        <h2 id="academics-title" className={styles.title}>
          Academics
        </h2>
        <p className={styles.lead}>
          Comprehensive medical education programs designed to build clinical expertise, professional excellence, and
          lifelong learning.
        </p>
        <ul className={styles.list} role="tablist" aria-label="Academic programs">
          {programs.map((p) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="program-panel"
                  className={`${styles.row} ${isActive ? styles.active : ""}`}
                  onClick={() => setActiveId(p.id)}
                >
                  <Icon name={p.icon} />
                  <span>{p.label}</span>
                  {isActive && <Icon name="ac-arrow" className={styles.arrow} />}
                </button>
              </li>
            );
          })}
        </ul>

        <Photo name="academics-girl" alt="Smiling postgraduate student holding books" sizes="374px" className={styles.photo} />

        <div id="program-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`} className={styles.card}>
          <Image src="/images/academics-card.jpg" alt="" fill sizes="677px" className={styles.cardBg} />
          <div className={styles.cardShade} />
          <div className={styles.cardBody}>
            {active.detail ? (
              <>
                <h3 className={styles.cardTitle}>{active.detail.title}</h3>
                {active.detail.paragraphs.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
                <ul className={styles.facts}>
                  {active.detail.facts.map((f) => (
                    <li key={f.text}>
                      <Icon name={f.icon} />
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Button href="/programs" variant="glass" icon={null} className={styles.detailBtn} width={154}>
                  View Detail
                </Button>
              </>
            ) : (
              <>
                <h3 className={styles.cardTitle}>{active.label}</h3>
                <p>Program details will be published soon.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
