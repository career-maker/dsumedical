import Image from "next/image";
import styles from "./LeaderSlides.module.scss";

type Slide = { title: string; body: string[]; image: string; alt?: string };

const Leaf = () => (
  <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 35V17M20 26c-7 0-11-4-11-11 7 0 11 4 11 11ZM20 22c0-7 4-11 11-11 0 7-4 11-11 11Z" />
  </svg>
);

const Steth = () => (
  <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 6v10a7 7 0 0 0 14 0V6M8 6h4M22 6h4M17 23v3a7 7 0 0 0 14 0v-4" />
    <circle cx="31" cy="19" r="3" />
  </svg>
);

/** Leadership messages as two side-by-side cards on a campus-photo backdrop (stacked on small screens). Title format: "Name, Role – Org". */
export function LeaderSlides({ id, title, items }: { id?: string; title: string; items: Slide[] }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.bg} aria-hidden="true">
        <Image src="/images/leadership-campus.jpg" alt="" fill sizes="(max-width: 960px) 100vw, 60vw" />
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid} role="group" aria-label={title}>
          {items.map((s) => {
            const [name, role = ""] = s.title.split(/,\s(.+)/);
            // A third paragraph is the personal sign-off: shown as an italic footer line.
            const closing = s.body.length > 2 ? s.body[s.body.length - 1] : null;
            const body = closing ? s.body.slice(0, -1) : s.body;
            return (
              <article key={s.title} className={`${styles.card}`}>
                <span className={styles.quote} aria-hidden="true">
                  &rdquo;
                </span>
                <div className={styles.main}>
                  <div className={styles.photo}>
                    <Image src={`/images/${s.image}`} alt={s.alt ?? ""} fill sizes="(max-width: 960px) 40vw, 220px" />
                  </div>
                  <div className={styles.who}>
                    <h3>{name}</h3>
                    {role && <p className={styles.role}>{role}</p>}
                    <hr />
                  </div>
                  <div className={styles.copy}>
                    {body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
                <footer className={styles.foot}>
                  {closing ? <Leaf /> : <Steth />}
                  {closing ? <p>{closing}</p> : <hr />}
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
