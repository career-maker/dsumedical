import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { researchChecks, researchTiles } from "@/data/research";
import styles from "./Research.module.scss";

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
          <Image src="/images/research-labs.jpg" alt="" fill sizes="615px" className={styles.checksBg} />
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
            <li key={t.photo} className={styles[t.photo.replace("research-", "t_")]}>
              <Photo name={t.photo} alt={t.alt} cover={t.cover} sizes="304px" className={styles.tilePhoto} />
              <span>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
