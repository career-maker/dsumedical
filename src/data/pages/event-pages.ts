import { eventDetails } from "../event-details";
import type { PageDef } from "./types";

/**
 * One page per entry of src/data/event-details.ts: /events/<id>. The Read More button on an event card shows
 * whenever its id has an entry there, so adding an entry gives any event an inner page.
 * The page body is the EventDetail block (text, documents, photos, Related / Latest events, Previous / Next).
 */
export const eventPages: PageDef[] = Object.entries(eventDetails).map(([id, d]) => ({
  slug: `events/${id}`,
  title: d.heading,
  eyebrow: d.date ? `Events · ${d.date}` : "Events",
  lead: d.date ?? "CDSIMER events",
  hero: "news-1.jpg",
  heroAlt: "Conference audience",
  blocks: [{ t: "event", id }],
}));
