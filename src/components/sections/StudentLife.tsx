import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { studentLife } from "@/data/news";
import styles from "./StudentLife.module.scss";

export function StudentLife() {
  return (
    <section className={styles.section} aria-labelledby="life-title">
      <div className={styles.inner}>
        <h2 id="life-title" className={styles.title}>
          Student Life @ CDSIMER
        </h2>
        <p className={styles.sub}>
          Experience a vibrant campus life filled with learning, culture, innovation, events, and unforgettable student
          experiences at CDSIMER.
        </p>
        <Button href="/student-life" variant="primary" className={styles.explore} width={136}>
          Explore
        </Button>
        <ul className={styles.grid}>
          {studentLife.map((s) => (
            <li key={s.photo} className={styles[s.photo.replace("life-", "g_")]}>
              <Photo name={s.photo} alt={s.alt} sizes="(max-width: 960px) 100vw, 683px" className={styles.photo} />
              {s.label && <span>{s.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
