import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { researchChecks, researchTiles } from "@/data/research";
import styles from "./Research.module.scss";
import { fluid } from "@/lib/sizes";

const tileHref: Record<string, string> = {
  "home-research-labs": "/research#criw",
  "home-research-projects": "/research#ongoing",
  "home-research-clinical": "/research#ongoing",
  "home-research-publications": "/research#published-articles",
  "home-research-conferences": "/research#student-research",
  "home-research-grants": "/research#ongoing",
};

export function Research() {
  return (
    <section className={styles.section} aria-labelledby="research-title">
      <div className={styles.inner}>
        <h2 id="research-title" className={styles.title}>
          Research &amp; Innovation
        </h2>
        <p className={styles.text}>
          Fostering scientific discovery and evidence-based medicine through collaborative research, interdisciplinary
          innovation, and cutting-edge clinical studies that contribute to advancements in healthcare and improve patient
          outcomes.
        </p>
        <div className={styles.checks}>
          <Image src="/images/home-research-bg.jpg" alt="" fill sizes={fluid(615)} className={styles.checksBg} />
          <ul>
            {researchChecks.map((c) => (
              <li key={c}>
                <Icon name="tick" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.mosaic}>
          {researchTiles.map((t) => (
            <li key={t.photo} className={styles[t.photo.replace("home-research-", "t_")]}>
              <Photo name={t.photo} alt={t.alt} cover={t.cover} sizes={fluid(304)} className={styles.tilePhoto} />
              <span>{t.label}</span>
              <Link prefetch={false} href={tileHref[t.photo]} className="stretch-link" aria-label={t.label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
