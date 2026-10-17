import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { journeys } from "@/data/content";
import styles from "./Journey.module.scss";

export function Journey() {
  return (
    <section className={styles.section} aria-labelledby="journey-title">
      <div className={styles.inner}>
        <h2 id="journey-title" className={styles.title}>
          Education <i>•</i> Healthcare <i>•</i> Research
        </h2>
        <p className={styles.sub}>
          <span>Choose Your Journey</span>
        </p>
        <ul className={styles.cards}>
          {journeys.map((j) => (
            <li key={j.key} className={`${styles.card} ${j.theme === "hot" ? styles.hot : ""}`}>
              <Photo name={`journey-${j.key}`} alt={j.alt} sizes="(max-width: 960px) 100vw, 547px" className={styles.photo} />
              <div className={styles.body}>
                <h3 className={styles.head}>
                  <Icon name={j.icon} />
                  {j.title}
                </h3>
                <p className={styles.text}>{j.text}</p>
                <ul className={styles.chips}>
                  {j.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Button
                  href={j.cta.href}
                  variant={j.theme === "hot" ? "white" : "soft"}
                  icon={null}
                  className={styles.cta}
                >
                  {j.cta.label}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
