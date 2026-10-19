import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Block } from "@/data/pages/types";
import { Counter } from "@/components/ui/Counter";
import { DeptExplorer, Enquiry, Gallery, NewsExplorer } from "./Explorers";
import { InnerMotion } from "./InnerMotion";
import styles from "./Blocks.module.scss";

function Head({ title, lead, id }: { title: string; lead?: string; id?: string }) {
  return (
    <header className={styles.head}>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

const slug = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Section({ block, children, wide }: { block: { id?: string; tone?: "cream" }; children: React.ReactNode; wide?: boolean }) {
  return (
    <section id={block.id} className={`${styles.section} ${block.tone === "cream" ? styles.cream : ""}`}>
      <div className={`${styles.wrap} ${wide ? styles.wide : ""}`}>{children}</div>
    </section>
  );
}

const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Outline/glass buttons are white-on-translucent (hero only); swap for light backgrounds. */
const onLight = (v?: "primary" | "outline" | "glass" | "soft") => (v === "outline" || v === "glass" ? "gray" : (v ?? "primary"));

function Cell({ v }: { v: string }) {
  if (v.includes("@")) return <a href={`mailto:${v}`}>{v}</a>;
  if (/^\+?[\d ]{8,}$/.test(v)) return <a href={`tel:${v.replace(/ /g, "")}`}>{v}</a>;
  return <>{v}</>;
}

/** Content on the left, a photo filling the right column so narrow blocks never leave a hole. */
function Aside({ img, children }: { img: string; children: React.ReactNode }) {
  return (
    <div className={styles.aside}>
      <div className={styles.asideMain}>{children}</div>
      <div className={styles.sideMedia} data-rv>
        <Image src={`/images/${img}`} alt="" fill sizes="(max-width: 960px) 100vw, 640px" />
      </div>
    </div>
  );
}

// Photos auto-assigned to blocks that have none, cycling per kind so neighbouring blocks differ.
const POOL = {
  text: ["about.jpg", "hospital-ward.jpg", "life-group.jpg", "research-labs.jpg", "life-library.jpg"],
  faq: ["life-students.jpg", "hospital-ward.jpg", "research-labs.jpg"],
  form: ["academics-girl.jpg", "why-girl.jpg", "journey-student.jpg"],
  address: ["life-campus.jpg", "about.jpg"],
} as const;

function Render({ b, auto }: { b: Block; auto?: string }) {
  switch (b.t) {
    case "text":
      return (
        <Section block={b}>
          <div className={`${styles.split} ${b.image || auto ? "" : styles.single} ${b.flip ? styles.flip : ""}`}>
            <div className={styles.copy} data-rv>
              {b.eyebrow && <p className={styles.eyebrow}>{b.eyebrow}</p>}
              <h2>{b.title}</h2>
              {b.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {b.bullets && (
                <ul className={styles.bullets}>
                  {b.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
              {b.actions && (
                <div className={styles.row}>
                  {b.actions.map((a) => (
                    <Button key={a.label} href={a.href} variant={onLight(a.variant)}>
                      {a.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            {(b.image || auto) && (
              <div className={styles.media} data-rv>
                <Image src={`/images/${b.image ?? auto}`} alt={b.alt ?? ""} fill sizes="(max-width: 1280px) 100vw, 700px" />
              </div>
            )}
          </div>
        </Section>
      );
    case "cards":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ul className={`${styles.grid} ${styles[`c${b.cols ?? 3}`]}`}>
            {b.items.map((c) => {
              const inner = (
                <>
                  {c.image && (
                    <span className={styles.cardImg}>
                      <Image src={`/images/${c.image}`} alt="" fill sizes="(max-width: 1280px) 100vw, 540px" />
                    </span>
                  )}
                  <span className={styles.cardBody}>
                    {c.tag && <span className={styles.tag}>{c.tag}</span>}
                    <h3>{c.title}</h3>
                    {c.text && <p>{c.text}</p>}
                    {c.href && <span className={styles.more}>Learn more →</span>}
                  </span>
                </>
              );
              return (
                <li key={c.title}>
                  {c.href ? (
                    <SmartLink href={c.href} className={styles.card}>
                      {inner}
                    </SmartLink>
                  ) : (
                    <div className={styles.card}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      );
    case "stats":
      return (
        <Section block={b}>
          {b.title && <Head title={b.title} lead={b.lead} />}
          <ul className={styles.stats}>
            {b.items.map((s) => (
              <li key={s.label}>
                <strong>
                  <Counter value={s.value} />
                </strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </Section>
      );
    case "steps":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ol className={styles.steps}>
            {b.items.map((s, i) => (
              <li key={s.title}>
                <span className={styles.dot}>{s.label ?? i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      );
    case "profiles":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ul className={`${styles.grid} ${styles.c3}`}>
            {b.items.map((p) => (
              <li key={p.name} className={`${styles.profile} ${p.image ? "" : styles.plain}`}>
                <span className={styles.avatar} aria-hidden="true">
                  {p.image ? <Image src={`/images/${p.image}`} alt="" fill sizes="96px" /> : initials(p.name) || p.name[0]}
                </span>
                <h3>{p.name}</h3>
                <p className={styles.role}>{p.role}</p>
                {p.text && <p>{p.text}</p>}
              </li>
            ))}
          </ul>
        </Section>
      );
    case "docs":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ul className={`${styles.grid} ${styles.c3}`}>
            {b.items.map((d) => (
              <li key={d.title} className={styles.doc}>
                <span className={styles.file}>{d.type}</span>
                <div>
                  <h3>{d.title}</h3>
                  {d.note && <p>{d.note}</p>}
                </div>
                {d.href ? (
                  <SmartLink href={d.href} className={styles.dl}>
                    View / Download
                  </SmartLink>
                ) : (
                  <span className={styles.pending}>Link pending</span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      );
    case "table":
      return (
        <Section block={{ id: b.id }}>
          <Head title={b.title} lead={b.lead} />
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={b.title}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {b.cols.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} data-label={b.cols[j]}>
                        <Cell v={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      );
    case "faq":
      return (
        <Section block={{ id: b.id, tone: "cream" }}>
          <Aside img={auto ?? POOL.faq[0]}>
            <Head title={b.title} lead={b.lead} />
            <div className={styles.faq}>
              {b.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Aside>
        </Section>
      );
    case "gallery":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <Gallery groups={b.groups} />
        </Section>
      );
    case "form":
      return (
        <Section block={{ id: b.id, tone: "cream" }}>
          <Aside img={auto ?? POOL.form[0]}>
            <Head title={b.title} lead={b.lead} />
            <Enquiry kind={b.kind} />
          </Aside>
        </Section>
      );
    case "address":
      return (
        <Section block={{ id: b.id }}>
          <Aside img={auto ?? POOL.address[0]}>
            <Head title={b.title} />
            <address className={styles.address}>
              {b.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
              <a href={`tel:${b.phone.replace(/ /g, "")}`}>{b.phone}</a>
              <a href={`mailto:${b.email}`}>{b.email}</a>
            </address>
            <div className={styles.row}>
              <Button href={b.mapsHref}>Maps &amp; Directions</Button>
            </div>
          </Aside>
        </Section>
      );
    case "map":
      return (
        <Section block={{ id: b.id }}>
          <Head title={b.title} lead={b.lead} />
          <div className={styles.map}>
            <iframe title={b.title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(b.query)}&output=embed`} />
          </div>
          <div className={styles.row}>
            <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.query)}`}>Open in Google Maps</Button>
          </div>
        </Section>
      );
    case "links":
      return (
        <Section block={{ id: b.id }}>
          <Head title={b.title} />
          <ul className={styles.chips}>
            {b.items.map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href}>{l.label}</SmartLink>
              </li>
            ))}
          </ul>
        </Section>
      );
    case "departments":
      return (
        <Section block={{}} wide>
          <DeptExplorer />
        </Section>
      );
    case "news":
      return (
        <Section block={{}}>
          <NewsExplorer />
        </Section>
      );
    case "cta":
      return (
        <section className={styles.cta}>
          <div className={styles.wrap}>
            <h2>{b.title}</h2>
            <p>{b.text}</p>
            <div className={`${styles.row} ${styles.center}`}>
              {b.actions.map((a) => (
                <Button key={a.label} href={a.href} variant={onLight(a.variant)}>
                  {a.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      );
  }
}

/** Every titled block gets an anchor id (its own, or one derived from the title). */
function withIds(blocks: Block[]): Block[] {
  const seen = new Set<string>();
  return blocks.map((b) => {
    if (!("title" in b) || !b.title || b.t === "cta" || b.t === "stats") return b;
    let id = ("id" in b && b.id) || slug(b.title);
    while (seen.has(id)) id += "-2";
    seen.add(id);
    return { ...b, id } as Block;
  });
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const list = withIds(blocks);
  // Pick a photo for every block that needs one and has none, cycling through each kind's pool.
  const taken = new Set(list.flatMap((b) => ("image" in b && b.image ? [b.image] : [])));
  const used = { text: 0, faq: 0, form: 0, address: 0 };
  const autos = list.map((b, i) => {
    const kind = b.t === "text" ? (b.image ? null : "text") : b.t === "faq" || b.t === "form" || b.t === "address" ? b.t : null;
    if (!kind) return undefined;
    const pool = POOL[kind];
    const start = used[kind]++ + i;
    const pick = pool.map((_, k) => pool[(start + k) % pool.length]).find((x) => !taken.has(x)) ?? pool[start % pool.length];
    taken.add(pick);
    return pick;
  });
  const jump = list.filter((b) => "id" in b && b.id && "title" in b && b.title);
  return (
    <>
      {jump.length >= 4 && (
        <nav className={styles.jump} aria-label="On this page">
          <ul>
            {jump.map((b) => (
              <li key={(b as { id: string }).id}>
                <a href={`#${(b as { id: string }).id}`}>{(b as { title: string }).title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <InnerMotion />
      {list.map((b, i) => (
        <Render key={i} b={b} auto={autos[i]} />
      ))}
    </>
  );
}
