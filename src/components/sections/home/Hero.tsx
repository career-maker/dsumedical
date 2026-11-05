"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Ticker } from "@/components/ui/Ticker";
import styles from "./Hero.module.scss";

const slides = [
  {
    img: "hero.jpg",
    alt: "Smiling medical student holding textbooks on the CDSIMER campus",
    title: ["Future Doctors.", "Real Clinical Exposure.", "Transformative Research."],
    actions: [["Apply Now", "/admissions"], ["Explore Programs", "/programs"], ["Book an Appointment", "/appointment"]],
  },
  {
    img: "journey-hospital.jpg",
    alt: "CDSIMER teaching hospital building",
    title: ["900+ Bed Teaching Hospital.", "Learn at the Bedside.", "Care that Counts."],
    actions: [["Visit Hospital", "/hospital"], ["Our Departments", "/department"], ["Book an Appointment", "/appointment"]],
  },
  {
    img: "journey-research.jpg",
    alt: "Researchers working with microscopes in a CDSIMER laboratory",
    title: ["Research that Heals.", "Labs that Inspire.", "Ideas that Travel."],
    actions: [["Explore Research", "/research"], ["Research Centres", "/research"], ["Book an Appointment", "/appointment"]],
  },
  {
    img: "life-group.jpg",
    alt: "Students and staff gathered on the CDSIMER campus",
    title: ["A Campus Built to Grow.", "Life Beyond the Lecture.", "Your Journey Starts Here."],
    actions: [["Campus Life", "/student-life"], ["Apply Now", "/admissions"], ["Book an Appointment", "/appointment"]],
  },
];
const INTERVAL_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the first slide (and one ticker copy) is in the initial HTML; the rest mounts after load so
  // it neither competes with the LCP image for bandwidth nor adds to first-paint work.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  const go = (d: number) => ready && setIndex((i) => (i + d + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, index]);

  return (
    <section
      className={styles.hero}
      aria-label="Welcome"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((sl, n) => (n > 0 && !ready ? null : (
        <div
          key={sl.img}
          className={`${styles.panel} ${n === index ? styles.on : ""}`}
          aria-hidden={n !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${n + 1} of ${slides.length}`}
        >
        <Image src={`/images/${sl.img}`} alt={sl.alt} width={2063} height={1032} preload={n === 0} fetchPriority={n === 0 ? "high" : "auto"} sizes="100vw" className={`${styles.bg} ${n ? styles.cover : ""}`} />
        <div className={styles.shade} />
        <div className={styles.content}>
          <ul className={styles.badges}>
            <li className={styles.badge}>
              <Image src="/images/badge-nabh.png" alt="NABH accredited" width={85} height={85} />
            </li>
            <li className={styles.badge}>
              <Image src="/images/badge-naac.png" alt="NAAC A+ accredited" width={85} height={85} />
            </li>
            <li className={`${styles.badge} ${styles.nabl}`}>
              <Image src="/images/badge-nabl.png" alt="NABL accredited laboratory" width={60} height={39} />
            </li>
          </ul>
          <h1 className={styles.title} data-motion>
            {sl.title.map((t, k) => (
              <span key={t} style={{ "--i": k } as CSSProperties}>
                {t}
              </span>
            ))}
          </h1>
          <div className={styles.actions}>
            {sl.actions.map(([label, href], k) => (
              <Button key={label} href={href} variant={(["primary", "outline", "glass"] as const)[k]} width={[160, 220, 250][k]}>
                {label}
              </Button>
            ))}
          </div>
        </div>
        </div>
      )))}
      <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous slide" onClick={() => go(-1)}>
        <Icon name="arrow-left" />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next slide" onClick={() => go(1)}>
        <Icon name="arrow-left" flip />
      </button>

      <Ticker loop={ready} className={styles.ticker} />
    </section>
  );
}
