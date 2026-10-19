import { Icon } from "./Icon";
import styles from "./Ticker.module.scss";

export const updates = [
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
    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true">
      <path d="M6.5 0 8 5 13 6.5 8 8 6.5 13 5 8 0 6.5 5 5z" />
    </svg>
  );
}

/** "Latest Updates" strip. `loop` adds the second copy that makes the marquee seamless. */
export function Ticker({ loop = true, className }: { loop?: boolean; className?: string }) {
  return (
    <div className={`${styles.ticker} ${className ?? ""}`}>
      <div className={styles.label}>
        <Icon name="megaphone" />
        <span>Latest Updates</span>
      </div>
      <div className={styles.track} role="marquee" aria-label="Latest updates">
        <ul className={styles.slide}>
          {(loop ? [...updates, ...updates] : updates).map((u, i) => (
            <li key={`${u}-${i}`} aria-hidden={i >= updates.length}>
              <span>{u}</span>
              <Sparkle />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
