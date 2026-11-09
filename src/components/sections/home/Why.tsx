"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { whyItems } from "@/data/home";
import styles from "./Why.module.scss";
import { fluid } from "@/lib/sizes";

const SLIDE_MS = 2000;
// Sample video; replace with the CDSIMER campus video's YouTube ID.
const VIDEO_ID = "10yxPMitlJs";
const slides = [
  { src: "why-girl", alt: "Smiling medical student holding a folder" },
  { src: "academics-girl.jpg", alt: "Smiling postgraduate student holding books" },
  { src: "life-students.jpg", alt: "Students chatting on campus steps" },
  { src: "life-group.jpg", alt: "Group photo of students and staff" },
];

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 22 19" width="22" height="19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={flip ? { scale: "-1 1" } : undefined}>
      <path d="M2 9.5h17M12 2l7.5 7.5L12 17" />
    </svg>
  );
}

export function Why() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, i]);

  return (
    <section className={styles.section} aria-labelledby="why-title">
      <div className={styles.inner}>
        <h2 id="why-title" className={styles.title}>
          Why CDSIMER?
        </h2>
        <p className={styles.lead}>
          A premier medical institution offering world-class education, advanced healthcare facilities, research
          opportunities, and a vibrant campus experience.
        </p>
        <ul className={styles.grid}>
          {whyItems.map((w) => (
            <li key={w.icon}>
              <Icon name={w.icon} />
              <span>
                {w.lines[0]}
                <br />
                {w.lines[1]}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Button href="/about" variant="primary" width={160}>
            View More
          </Button>
          <Button href="/campus-tour" variant="soft" icon={<Icon name="campus-play" />} width={188}>
            Campus Tour
          </Button>
        </div>

        <div className={styles.video}>
          {playing ? (
            <iframe
              className={styles.fill}
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="CDSIMER campus video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <>
              <Photo name="why-video" alt="CDSIMER campus at dusk" sizes={fluid(421)} className={styles.fill} cover position="72% 50%" />
              <button type="button" className={styles.play} aria-label="Play campus video" onClick={() => setPlaying(true)}>
                <svg viewBox="0 0 43 43" width="43" height="43" aria-hidden="true">
                  <circle className={styles.disc} cx="21.5" cy="21.5" r="21.5" />
                  <path className={styles.tri} d="M17 13.5 30 21.5 17 29.5z" />
                </svg>
              </button>
            </>
          )}
        </div>
        <ul className={styles.badges}>
          <li>
            <Image src="/images/badge-nabh.png" alt="NABH" width={98} height={98} />
          </li>
          <li>
            <Image src="/images/badge-naac.png" alt="NAAC A+" width={98} height={98} />
          </li>
          <li>
            <Image src="/images/badge-nabl.png" alt="NABL" width={98} height={64} />
          </li>
        </ul>

        <div
          className={styles.portrait}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {slides.map((sl, n) => (
            <div key={sl.src} className={`${styles.slide} ${n === i ? styles.slideOn : ""}`} aria-hidden={n !== i}>
              {n === 0 ? (
                <Photo name="home-why" alt={sl.alt} sizes={fluid(421)} className={styles.fill} />
              ) : (
                <Image src={`/images/${sl.src}`} alt={sl.alt} fill sizes={fluid(421)} style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
              )}
            </div>
          ))}
          <div className={styles.slider}>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)}>
              <Arrow flip />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
