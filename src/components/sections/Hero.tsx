"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./Hero.module.scss";

const updates = [
  "Hospital Enquiry",
  "MBBS Admission Enquiry",
  "Hospital Enquiry",
  "MBBS Admission Enquiry",
  "CDSIMER Newsletter",
  "Hospital Enquiry",
  "CDSIMER Newsletter",
  "MBBS Admission Enquiry",
  "MBBS Admission Enquiry",
];

function Sparkle() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="#fff" aria-hidden="true">
      <path d="M6.5 0 8 5 13 6.5 8 8 6.5 13 5 8 0 6.5 5 5z" />
    </svg>
  );
}

const slides = [0, 1, 2]; // same hero slide repeated; swap in distinct content later
const INTERVAL_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setIndex((i) => (i + d + slides.length) % slides.length);

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
      {slides.map((n) => (
        <div
          key={n}
          className={`${styles.panel} ${n === index ? styles.on : ""}`}
          aria-hidden={n !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${n + 1} of ${slides.length}`}
        >
        <Image src="/images/hero.jpg" alt="Smiling medical student holding textbooks on the CDSIMER campus" width={2063} height={1032} priority={n === 0} sizes="100vw" className={styles.bg} />
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
          <h1 className={styles.title}>
            Future Doctors.
            <br />
            Real Clinical Exposure.
            <br />
            Transformative Research.
          </h1>
          <div className={styles.actions}>
            <Button href="/admissions" variant="primary" width={160}>
              Apply Now
            </Button>
            <Button href="/programs" variant="outline" width={220}>
              Explore Programs
            </Button>
            <Button href="/appointment" variant="glass" width={250}>
              Book an Appointment
            </Button>
          </div>
        </div>
        </div>
      ))}
      <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous slide" onClick={() => go(-1)}>
        <Icon name="arrow-left" />
      </button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next slide" onClick={() => go(1)}>
        <Icon name="arrow-left" flip />
      </button>

      <div className={styles.ticker}>
        <div className={styles.label}>
          <Icon name="megaphone" />
          <span>Latest Updates</span>
        </div>
        <div className={styles.track} role="marquee" aria-label="Latest updates">
          <ul className={styles.slide}>
            {[...updates, ...updates].map((u, i) => (
              <li key={`${u}-${i}`} aria-hidden={i >= updates.length}>
                <span>{u}</span>
                <Sparkle />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
