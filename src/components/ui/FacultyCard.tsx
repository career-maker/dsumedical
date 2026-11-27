import styles from "./FacultyCard.module.scss";

export type Faculty = { name: string; role: string; /** Lines like "Qualification : MBBS, MS" (one per line). */ text?: string; /** File in /images; its background-free copy lives in /faculty-cut. */ image?: string };

/** Path of the transparent cutout made by scripts/make-faculty-cutouts.py for a photo in /images. */
export const cutoutSrc = (image: string) => `/faculty-cut/${image.replace(/\.[^.]+$/, "").replace(/\//g, "__")}.webp`;

/** Faculty tile: the person's cutout stands on a coloured panel that starts halfway up the figure, so the head and shoulders rise above it (colour cycles with `tone`); name, designation and credentials sit below. All tiles share one size. */
export function FacultyCard({ person, tone = 0, style, extra }: { person: Faculty; tone?: number; style?: React.CSSProperties; /** Beyond the first rows: hidden on desktop until Load more. */ extra?: boolean }) {
  const rows = (person.text ?? "")
    .split("\n")
    .map((l) => l.split(/\s*:\s*/))
    .filter((p) => p.length > 1 && p[1]);
  return (
    <li className={`${styles.card} ${styles[`t${tone % 5}`]}`} style={style} data-extra={extra ? "" : undefined}>
      <div className={styles.stage} aria-hidden="true">
        {person.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cutoutSrc(person.image)} alt="" className={styles.figure} width={526} height={520} loading="lazy" decoding="async" />
        ) : (
          <span className={styles.ghost} />
        )}
      </div>
      <div className={styles.body}>
        <h3>{person.name}</h3>
        <p className={styles.role}>{person.role}</p>
        {rows.length > 0 && (
          <dl className={styles.facts}>
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </li>
  );
}
