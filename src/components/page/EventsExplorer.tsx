"use client";

import { useState } from "react";
import { EventCard } from "@/components/ui/EventCard";
import { events } from "@/data/events";
import styles from "./EventsExplorer.module.scss";

const tabs = [
  { id: "activity", label: "Faculty Activity" },
  { id: "studentActivity", label: "Student Activity" },
  { id: "facultyAchievements", label: "Faculty Achievements" },
  { id: "studentAchievements", label: "Student Achievements" },
] as const;

const STEP = 15;

/** Events from the existing CDSIMER events page, text only: four categories, a year filter and a "show more" step (the faculty list has 400+ entries). */
export function EventsExplorer() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("activity");
  const [year, setYear] = useState("all");
  const [shown, setShown] = useState(STEP);
  const all = events[tab];
  const years = [...new Set(all.map((e) => e.year).filter((y): y is string => !!y))];
  const list = year === "all" ? all : all.filter((e) => e.year === year);

  const pick = (id: (typeof tabs)[number]["id"]) => {
    setTab(id);
    setYear("all");
    setShown(STEP);
  };

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.tabs} role="tablist" aria-label="Event categories">
          {tabs.map((t) => (
            <button key={t.id} id={`events-tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls="events-panel" className={tab === t.id ? styles.on : ""} onClick={() => pick(t.id)}>
              {t.label}
              <small>{events[t.id].length}</small>
            </button>
          ))}
        </div>
        {years.length > 1 && (
          <label className={styles.year}>
            <span className={styles.srOnly}>Filter by year</span>
            <select value={year} onChange={(e) => { setYear(e.target.value); setShown(STEP); }}>
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div role="tabpanel" id="events-panel" aria-labelledby={`events-tab-${tab}`}>
        <ul className={styles.list}>
          {list.slice(0, shown).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </ul>
        {list.length > shown && (
          <button type="button" className={styles.more} onClick={() => setShown((n) => n + STEP)}>
            Show more events ({list.length - shown} left)
          </button>
        )}
      </div>
    </>
  );
}
