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
  href: string;
  detail: {
    title: string;
    paragraphs: string[];
    facts: { icon: IconName; text: string }[];
  };
};

const programs: Program[] = [
  {
    id: "mbbs",
    label: "MBBS",
    icon: "ac-mbbs",
    href: "/programs/mbbs",
    detail: {
      title: "MBBS",
      paragraphs: [
        "The MBBS programme builds a strong foundation in medical sciences and takes students into the wards early, with clinical exposure from day one in a 900+ bed teaching hospital.",
        "Admission is based on the rank obtained in NEET-UG, followed by the applicable counselling process.",
      ],
      facts: [
        { icon: "ac-years", text: "4.5 years" },
        { icon: "ac-time", text: "Full Time" },
        { icon: "ac-students", text: "150+ seats" },
      ],
    },
  },
  {
    id: "pg",
    label: "Post graduate",
    icon: "ac-pg",
    href: "/programs/post-graduation",
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
  {
    id: "ss",
    label: "Super Speciality",
    icon: "ac-ss",
    href: "/programs/post-graduation",
    detail: {
      title: "Super Speciality",
      paragraphs: [
        "Super speciality training in advanced clinical disciplines under senior faculty, with high patient volume and modern diagnostic support.",
        "Admission follows the applicable NEET-SS and counselling norms.",
      ],
      facts: [
        { icon: "ac-years", text: "3 years" },
        { icon: "ac-time", text: "Full Time" },
        { icon: "ac-students", text: "Limited seats" },
      ],
    },
  },
  {
    id: "dr",
    label: "Doctoral Research",
    icon: "ac-dr",
    href: "/programs/ph-d",
    detail: {
      title: "Doctoral Research",
      paragraphs: [
        "Ph.D research in biomedical and clinical sciences with experienced guides, modern laboratories and institutional ethics oversight.",
        "Admission is through entrance test and interview as per Dayananda Sagar University regulations.",
      ],
      facts: [
        { icon: "ac-years", text: "As per DSU rules" },
        { icon: "ac-time", text: "Full / Part Time" },
        { icon: "ac-students", text: "Guided research" },
      ],
    },
  },
];

export function Academics() {
  const [activeId, setActiveId] = useState("mbbs");
  const active = programs.find((p) => p.id === activeId) ?? programs[0];

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
              <li key={p.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="program-panel"
                  className={`${styles.row} ${isActive ? styles.active : ""}`}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                >
                  <Icon name={`${p.icon}-o` as IconName} className={styles.icoO} />
                  <Icon name={`${p.icon}-w` as IconName} className={styles.icoW} />
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
            <div key={active.id} className={styles.swap}>
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
              <Button href={active.href} variant="glass" icon={null} className={styles.detailBtn} width={154}>
                View Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
