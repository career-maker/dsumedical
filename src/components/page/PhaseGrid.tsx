"use client";

import { useState } from "react";
import type { AcademicYear } from "@/data/pages/academic-year";
import styles from "./PhaseGrid.module.scss";

/** Year rows with one button per phase; a phase opens a compact panel under its row with its notices, grouped. */
export function PhaseGrid({ data }: { data: AcademicYear }) {
  const [open, setOpen] = useState<{ row: number; col: number } | null>(null);
  const [group, setGroup] = useState<string | null>(null);

  const toggle = (row: number, col: number) => {
    const same = open?.row === row && open.col === col;
    setOpen(same ? null : { row, col });
    setGroup(null);
  };

  return (
    <div className={styles.grid} role="table" aria-label="Academic year">
      <div className={`${styles.row} ${styles.head}`} role="row">
        <span role="columnheader">Academic year</span>
        {data.cols.map((c) => (
          <span key={c} role="columnheader">
            {c}
          </span>
        ))}
      </div>
      {data.rows.map((r, ri) => {
        const cell = open?.row === ri ? r.cells[open.col] : null;
        return (
          <div key={r.year} className={styles.block}>
            <div className={styles.row} role="row">
              <span className={styles.year} role="cell">
                {r.year}
              </span>
              {r.cells.map((c, ci) => (
                <span key={ci} role="cell" className={styles.cell}>
                  {c ? (
                    <button
                      type="button"
                      className={`${styles.phase} ${open?.row === ri && open.col === ci ? styles.on : ""}`}
                      aria-expanded={open?.row === ri && open.col === ci}
                      onClick={() => toggle(ri, ci)}
                    >
                      {c.label}
                    </button>
                  ) : (
                    <span className={styles.none} aria-label="Not applicable">
                      —
                    </span>
                  )}
                </span>
              ))}
            </div>
            {cell && (
              <div className={styles.panel}>
                {cell.groups.map((g) => {
                  const key = `${ri}-${g.title}`;
                  const isOpen = group === key;
                  return (
                    <div key={g.title} className={styles.group}>
                      <button type="button" className={styles.groupBtn} aria-expanded={isOpen} onClick={() => setGroup(isOpen ? null : key)}>
                        {g.title}
                        <span className={styles.count}>{g.items.length + (g.subs ?? []).reduce((n, s) => n + s.items.length, 0)}</span>
                      </button>
                      {isOpen && (
                        <div className={styles.items}>
                          <DocList items={g.items} />
                          {g.subs?.map((s) => (
                            <div key={s.title} className={styles.sub}>
                              <p>{s.title}</p>
                              <DocList items={s.items} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DocList({ items }: { items: { title: string; href: string }[] }) {
  if (!items.length) return null;
  return (
    <ul>
      {items.map((d) => (
        <li key={d.href + d.title}>
          <a href={d.href} target="_blank" rel="noopener noreferrer">
            <span className={styles.pdf}>PDF</span>
            {d.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
