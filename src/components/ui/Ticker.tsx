import { Icon } from "./Icon";
import styles from "./Ticker.module.scss";

// The live cdsimer.edu.in bar carries these two enquiry numbers (and a newsletter link, dropped here). Repeated so the strip fills a wide screen.
const base = [
  { text: "Student Admission Enquiry : 6366885501", href: "tel:+916366885501" },
  { text: "Hospital Enquiry : 080-26086500", href: "tel:08026086500" },
];
export const updates = Array.from({ length: 5 }, () => base).flat();

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
            <li key={`${u.text}-${i}`} aria-hidden={i >= updates.length}>
              <a href={u.href} tabIndex={i >= updates.length ? -1 : undefined}>
                {u.text}
              </a>
              <Sparkle />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
