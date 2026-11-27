import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { eventDetails } from "@/data/event-details";
import { events } from "@/data/events";
import styles from "./EventDetail.module.scss";

const CATEGORY = { activity: "Faculty Activity", studentActivity: "Student Activity", facultyAchievements: "Faculty Achievements", studentAchievements: "Student Achievements" } as const;

// Events that have an inner page, newest first (undated last): the order of Previous / Next and of the Latest list.
const withPage = (Object.keys(CATEGORY) as (keyof typeof CATEGORY)[])
  .flatMap((cat) => events[cat].filter((e) => eventDetails[e.id]).map((e) => ({ id: e.id, iso: e.iso ?? "", cat })))
  .sort((a, b) => b.iso.localeCompare(a.iso));

/** Short label for a list: the page heading, or the first words of the text when the heading is only "Event on <date>". */
function label(id: string) {
  const d = eventDetails[id];
  if (!/^Event/.test(d.heading)) return d.heading;
  const t = d.paras[0] ?? d.heading;
  return t.length > 84 ? t.slice(0, 84).replace(/\s+\S*$/, "") + "…" : t;
}

function Item({ id }: { id: string }) {
  return (
    <li>
      <Link prefetch={false} href={`/events/${id}`}>
        <span>{label(id)}</span>
        {eventDetails[id].date && <small>{eventDetails[id].date}</small>}
      </Link>
    </li>
  );
}

/** Inner page of one event: text, documents and photos on the left; Related and Latest on the right; Previous / Next at the bottom. */
export function EventDetail({ id }: { id: string }) {
  const d = eventDetails[id];
  const i = withPage.findIndex((e) => e.id === id);
  const me = withPage[i];
  const related = withPage.filter((e) => e.id !== id && e.cat === me?.cat).slice(0, 5);
  const latest = withPage.filter((e) => e.id !== id).slice(0, 5);
  const newer = i > 0 ? withPage[i - 1] : undefined;
  const older = i >= 0 && i < withPage.length - 1 ? withPage[i + 1] : undefined;
  const one = d.images?.length === 1;

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <article className={styles.main}>
          {me && <p className={styles.cat}>{CATEGORY[me.cat]}</p>}
          {d.paras.map((p) => (
            <p key={p} className={styles.text}>
              {p}
            </p>
          ))}
          {d.items && (
            <ul className={styles.items}>
              {d.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
          {d.pdfs && (
            <div className={styles.docs}>
              {d.pdfs.map((x) => (
                <Button key={x.href} href={x.href} variant="soft">
                  {x.label}
                </Button>
              ))}
            </div>
          )}
          {d.images && (
            <div className={`${styles.photos} ${one ? styles.one : ""}`}>
              {d.images.map((im) => (
                // The whole photo is shown (no cropping); click opens the full-size file in a new tab.
                <a key={im.src} href={`/images/${im.src}`} target="_blank" rel="noopener noreferrer">
                  <Image src={`/images/${im.src}`} alt={im.alt} width={1200} height={900} sizes={one ? "(max-width: 960px) 100vw, 760px" : "(max-width: 960px) 100vw, 360px"} />
                </a>
              ))}
            </div>
          )}
          <nav className={styles.pager} aria-label="More events">
            {newer ? (
              <Link prefetch={false} href={`/events/${newer.id}`} className={styles.prev}>
                <small>← Previous</small>
                <span>{label(newer.id)}</span>
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link prefetch={false} href={`/events/${older.id}`} className={styles.next}>
                <small>Next →</small>
                <span>{label(older.id)}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
        <aside className={styles.side} aria-label="Events">
          {related.length > 0 && (
            <section className={styles.widget}>
              <h2>Related events</h2>
              <ul>
                {related.map((e) => (
                  <Item key={e.id} id={e.id} />
                ))}
              </ul>
            </section>
          )}
          <section className={styles.widget}>
            <h2>Latest events</h2>
            <ul>
              {latest.map((e) => (
                <Item key={e.id} id={e.id} />
              ))}
            </ul>
            <Link prefetch={false} href="/events" className={styles.all}>
              All events →
            </Link>
          </section>
        </aside>
      </div>
    </section>
  );
}
