import Image from "next/image";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { whyItems } from "@/data/content";
import styles from "./Why.module.scss";

export function Why() {
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
          <Photo name="why-video" alt="CDSIMER campus at dusk" sizes="421px" className={styles.fill} />
          <button type="button" className={styles.play} aria-label="Play campus video">
            <svg viewBox="0 0 43 43" width="43" height="43" aria-hidden="true">
              <circle cx="21.5" cy="21.5" r="21.5" fill="rgba(255,255,255,.8)" />
              <path d="M17 13.5 30 21.5 17 29.5z" fill="#777" />
            </svg>
          </button>
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

        <div className={styles.portrait}>
          <Photo name="why-girl" alt="Smiling medical student holding a folder" sizes="421px" className={styles.fill} />
          <div className={styles.slider}>
            <button type="button" aria-label="Previous">
              <Icon name="slide-next" flip />
            </button>
            <button type="button" aria-label="Next">
              <Icon name="slide-next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
