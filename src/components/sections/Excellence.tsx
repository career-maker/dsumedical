import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { stats } from "@/data/content";
import styles from "./Excellence.module.scss";

export function Excellence() {
  return (
    <section className={styles.section} aria-labelledby="excellence-title">
      <div className={styles.inner}>
        <h2 id="excellence-title" className={styles.title}>
          Excellence in Education, Research, &amp; Healthcare.
        </h2>
        <p className={styles.lead}>
          CDSIMER at Dayananda Sagar University delivers quality medical education through experienced faculty, modern
          infrastructure, clinical exposure, and a strong focus on research and patient care.
        </p>
        <Photo name="about" alt="Three CDSIMER doctors holding medical textbooks" sizes="(max-width: 960px) 100vw, 767px" className={styles.photo} />
        <ul className={styles.stats}>
          {stats.map((s) => (
            <li key={s.label} className={styles.stat}>
              <Icon name={s.icon} />
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
