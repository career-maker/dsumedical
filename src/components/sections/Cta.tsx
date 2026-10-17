import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./Cta.module.scss";

export function Cta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={styles.inner}>
        <h2 id="cta-title" className={styles.title}>
          Ready to Begin Your Medical Journey?
        </h2>
        <p className={styles.sub}>
          Take the first step toward a successful future. Apply now and join a community committed to academic excellence
          and growth.
        </p>
        <div className={styles.actions}>
          <Button href="/admissions" variant="primary" width={160}>
            Apply Now
          </Button>
          <Button href="/prospectus" variant="soft" icon={<Icon name="cta-download" />} width={254}>
            Download Prospectus
          </Button>
          <Button href="/contact" variant="gray" icon={<Icon name="cta-phone" />} width={314}>
            Talk to Admission Counselor
          </Button>
          <Button href="/campus-tour" variant="light" icon={<Icon name="cta-calendar" />} width={267}>
            Schedule Campus Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
