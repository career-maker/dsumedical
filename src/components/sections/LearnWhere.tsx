import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { hospitalFacilities } from "@/data/content";
import styles from "./LearnWhere.module.scss";

export function LearnWhere() {
  return (
    <section className={styles.section} aria-labelledby="learn-title">
      <div className={styles.inner}>
        <h2 id="learn-title" className={styles.title}>
          Learn Where
          <br />
          Healthcare
          <br />
          Happens
        </h2>
        <p className={styles.text}>
          Gain hands-on clinical experience through a modern teaching hospital that combines learning with
          patient-centered care. Experience immersive clinical training in a modern teaching hospital equipped with
          advanced healthcare facilities. Build confidence through patient-centered care, multidisciplinary learning,
          and practical exposure.
        </p>
        <Button href="/hospital" variant="primary" className={styles.cta} width={284}>
          Explore Hospital Facilities
        </Button>
        <ul className={styles.list}>
          {hospitalFacilities.map((f) => (
            <li key={f.label}>
              <Icon name={f.icon} />
              <span>{f.label}</span>
              <Link prefetch={false} href="/hospital" className="stretch-link" aria-label={f.label} />
            </li>
          ))}
        </ul>
        <Photo name="hospital-ward" alt="Doctors and students around a patient bed in a hospital ward" sizes="596px" className={styles.photo} />
      </div>
    </section>
  );
}
