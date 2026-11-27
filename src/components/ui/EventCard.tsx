import { Button } from "@/components/ui/Button";
import { eventDetails } from "@/data/event-details";
import type { EventItem } from "@/data/events";
import styles from "./EventCard.module.scss";

/** Text-only event card (the live events have no photos): date block, what happened, any details, and the PDF report when there is one. */
export function EventCard({ event }: { event: EventItem }) {
  const [day, mon, year] = event.date ? event.date.split(" ") : [];
  return (
    <li className={styles.card}>
      <div className={styles.when} aria-hidden={!event.date}>
        {event.date ? (
          <>
            <strong>{day}</strong>
            <span>{mon}</span>
            <small>{year}</small>
          </>
        ) : (
          <span className={styles.nodate}>Event</span>
        )}
      </div>
      <div className={styles.body}>
        {event.date && <time dateTime={event.iso} className={styles.sr}>{event.date}</time>}
        <h3>{event.title}</h3>
        {event.paras?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {event.items && (
          <ul>
            {event.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
        {event.link && (
          <a href={event.link.href} className={styles.more}>
            {event.link.label} →
          </a>
        )}
        {event.href && (
          <a href={event.href} target="_blank" rel="noopener noreferrer" className={styles.more}>
            View report (PDF) →
          </a>
        )}
        {eventDetails[event.id] && (
          <div className={styles.readMore}>
            <Button href={`/events/${event.id}`} variant="soft">
              Read More
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}
