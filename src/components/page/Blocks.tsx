import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Block, RichTextContent } from "@/data/pages/types";
import { Counter } from "@/components/ui/Counter";
import { DeptExplorer, Enquiry, Gallery, NewsExplorer } from "./Explorers";
import { AccreditationLogos, legacyAccreditationLogos } from "./AccreditationLogos";
import { JumpNav } from "./JumpNav";
import { InnerMotion } from "./InnerMotion";
import { AdministrationCarousel } from "./AdministrationCarousel";
import { LeaderSlides } from "./LeaderSlides";
import { RichText } from "./RichText";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import styles from "./Blocks.module.scss";

function Head({ title, lead, id, accent = false }: { title: string; lead?: RichTextContent; id?: string; accent?: boolean }) {
  return (
    <header className={`${styles.head} ${accent ? styles.headAccent : ""}`}>
      <h2 id={id}>{title}</h2>
      <RichText content={lead} />
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

function TableCell({ content }: { content: RichTextContent }) {
  return typeof content === "string" ? <Cell v={content} /> : <RichText content={content} />;
}

function isSerialNumberColumn(label: string) {
  const normalized = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return ["slno", "sno", "sino", "serialno", "serialnumber"].includes(normalized);
}

function PdfIcon() {
  return (
    <span className={styles.docIcon} aria-hidden="true">
      <svg viewBox="0 0 44 52" width="44" height="52">
      <defs>
        <linearGradient id="pdfg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f05a28" />
          <stop offset="1" stopColor="#d1281c" />
        </linearGradient>
      </defs>
      <path d="M4 6a4 4 0 0 1 4-4h20l12 12v32a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="url(#pdfg)" />
      <path d="M28 2l12 12H32a4 4 0 0 1-4-4z" fill="#fff" opacity=".45" />
      <text x="22" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="inherit">PDF</text>
      </svg>
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
    </svg>
  );
}

/** Content on the left, a photo filling the right column so narrow blocks never leave a hole. */
function Aside({ img, children }: { img?: string; children: React.ReactNode }) {
  return (
    <div className={img ? styles.aside : styles.asideSingle}>
      <div className={styles.asideMain}>{children}</div>
      {img && (
        <div className={styles.sideMedia} data-rv>
          <Image src={contentImageSrc(img)} alt="" fill sizes="(max-width: 960px) 100vw, 640px" unoptimized={isRemoteContentImage(img)} />
        </div>
      )}
    </div>
  );
}

const POOL = {
  text: ["about.jpg", "hospital-ward.jpg", "life-group.jpg", "research-labs.jpg", "life-library.jpg"],
  faq: ["life-students.jpg", "hospital-ward.jpg", "research-labs.jpg"],
  form: ["academics-girl.jpg", "why-girl.jpg", "journey-student.jpg"],
  address: ["life-campus.jpg", "about.jpg"],
} as const;

function Render({ b, auto, useFallbackImages }: { b: Block; auto?: string; useFallbackImages: boolean }) {
  switch (b.t) {
    case "text": {
      const image = b.image ?? auto;
      return (
        <Section block={b}>
          <div className={`${styles.split} ${image ? "" : styles.single} ${b.flip ? styles.flip : ""} ${b.id === "legacy-of-late-sri-r-dayananda-sagar" ? styles.legacyLayout : ""}`}>
            <div className={styles.copy} data-rv>
              {b.eyebrow && <p className={styles.eyebrow}>{b.eyebrow}</p>}
              <h2>{b.title}</h2>
              <RichText content={b.body} unorderedListClassName={styles.bullets} />
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
            {image && (
              <div className={`${styles.media} ${b.id === "legacy-of-late-sri-r-dayananda-sagar" ? styles.art : ""}`} data-rv>
                <Image src={contentImageSrc(image)} alt={b.alt ?? ""} fill sizes="(max-width: 1280px) 100vw, 700px" unoptimized={isRemoteContentImage(image)} />
              </div>
            )}
          </div>
        </Section>
      );
    }
    case "cards": {
      const isWhyCdsimer = b.id === "why-cdsimer" || slug(b.title) === "why-cdsimer";
      const isAccreditations = b.id === "accreditations-and-recognitions" || slug(b.title) === "accreditations-and-recognitions";
      if (isAccreditations) {
        return (
          <Section block={{ ...b, id: "accreditations-and-recognitions" }}>
            <Head title={b.title} lead={b.lead} />
            <AccreditationLogos items={legacyAccreditationLogos(b.items)} />
          </Section>
        );
      }
      return (
        <Section block={{ ...b, id: isWhyCdsimer ? "why-cdsimer" : b.id }}>
          <Head title={b.title} lead={b.lead} accent={b.id === "programs-listing"} />
          <ul className={`${styles.grid} ${styles[`c${b.cols ?? 3}`]} ${isWhyCdsimer ? styles.cardsColor : ""} ${b.id === "programs-listing" ? styles.fixed3 : ""}`}>
            {b.items.map((c) => {
              const inner = (
                <>
                  {c.image && (
                    <span className={styles.cardImg}>
                      <Image src={contentImageSrc(c.image)} alt="" fill sizes="(max-width: 1280px) 100vw, 540px" unoptimized={isRemoteContentImage(c.image)} />
                    </span>
                  )}
                  <div className={styles.cardBody}>
                    {c.tag && <span className={styles.tag}>{c.tag}</span>}
                    <h3>{c.title}</h3>
                    <RichText content={c.text} />
                    {c.href && <span className={styles.more}>Learn more →</span>}
                  </div>
                </>
              );
              const cardClassName = `${styles.card} ${b.id === "vision" ? styles.visionCard : ""}`;
              return (
                <li key={c.title}>
                  {c.href ? (
                    <SmartLink href={c.href} className={cardClassName}>
                      {inner}
                    </SmartLink>
                  ) : (
                    <div className={cardClassName}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      );
    }
    case "logos":
      return (
        <Section block={b}>
          {b.title && <Head title={b.title} lead={b.lead} />}
          <AccreditationLogos items={b.items} />
        </Section>
      );
    case "stats":
      return (
        <Section block={b}>
          {b.title && <Head title={b.title} lead={b.lead} accent={slug(b.title) === "key-highlights"} />}
          <ul className={`${styles.stats} ${slug(b.title ?? "") === "key-highlights" ? styles.statsColor : ""}`}>
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
      if (b.id === "journey") {
        return (
          <Section block={{ id: b.id, tone: "cream" }}>
            <Head title={b.title} lead={b.lead} accent />
            <div className={styles.journeyMarquee} role="region" aria-label={b.title}>
              <ol className={styles.journeyTrack}>
                {[...b.items, ...b.items].map((item, index) => {
                  const isClone = index >= b.items.length;
                  return (
                    <li
                      key={`${isClone ? "clone-" : ""}${item.title}-${index}`}
                      className={styles.journeyCard}
                      aria-hidden={isClone || undefined}
                    >
                      {item.label && <span className={styles.journeyLabel}>{item.label}</span>}
                      <h3>{item.title}</h3>
                      <RichText content={item.text} />
                    </li>
                  );
                })}
              </ol>
            </div>
          </Section>
        );
      }
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ol className={styles.steps}>
            {b.items.map((s, i) => (
              <li key={s.title}>
                <span className={styles.dot}>{s.label ?? i + 1}</span>
                <h3>{s.title}</h3>
                <RichText content={s.text} />
              </li>
            ))}
          </ol>
        </Section>
      );
    case "profiles":
      if (b.id === "leadership") {
        return <LeaderSlides title={b.title} items={b.items} />;
      }
      if (b.id === "administration") {
        return (
          <Section block={b}>
            <Head title={b.title} lead={b.lead} accent />
            <AdministrationCarousel items={b.items} />
          </Section>
        );
      }
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <ul className={`${styles.grid} ${styles.c3}`}>
            {b.items.map((p) => (
              <li key={p.name} className={`${styles.profile} ${p.image ? "" : styles.plain}`}>
                <span className={styles.avatar} aria-hidden="true">
                  {p.image ? <Image src={contentImageSrc(p.image)} alt="" fill sizes="96px" unoptimized={isRemoteContentImage(p.image)} /> : initials(p.name) || p.name[0]}
                </span>
                <h3>{p.name}</h3>
                <p className={styles.role}>{p.role}</p>
                <RichText content={p.text} />
              </li>
            ))}
          </ul>
        </Section>
      );
    case "docs":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} accent />
          <ul className={`${styles.grid} ${styles.c3} ${styles.docsGrid}`}>
            {b.items.map((d) => {
              const tile = (
                <>
                  <PdfIcon />
                  <span className={styles.docBody}>
                    <h3 data-reveal="in">{d.title}</h3>
                    <span className={styles.docRule} />
                    <span className={styles.dl}>View / Download</span>
                  </span>
                  <span className={styles.docDeco} aria-hidden="true">
                    <span className={styles.docSheet} />
                    <span className={styles.docBtn}><DownloadIcon /></span>
                  </span>
                </>
              );
              return (
                <li key={d.title} className={styles.doc}>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                      {tile}
                    </a>
                  ) : (
                    <div className={styles.docLink}>{tile}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      );
    case "table": {
      const columns = b.cols.some(isSerialNumberColumn) ? b.cols : ["SI No", ...b.cols];
      const serialNumberColumns = columns.map(isSerialNumberColumn);
      return (
        <Section block={{ id: b.id }}>
          <Head title={b.title} lead={b.lead} />
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={b.title}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => {
                  let dataColumnIndex = 0;
                  return (
                    <tr key={i}>
                      {columns.map((column, j) => {
                        if (serialNumberColumns[j]) {
                          return <td key={j} data-label={column}>{i + 1}</td>;
                        }

                        const content = r[dataColumnIndex] ?? "";
                        dataColumnIndex += 1;
                        return (
                          <td key={j} data-label={column}>
                            <TableCell content={content} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      );
    }
    case "faq":
      return (
        <Section block={{ id: b.id, tone: "cream" }}>
          <Aside img={auto ?? (useFallbackImages ? POOL.faq[0] : undefined)}>
            <Head title={b.title} lead={b.lead} />
            <div className={styles.faq}>
              {b.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <RichText content={f.a} />
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
          <Aside img={auto ?? (useFallbackImages ? POOL.form[0] : undefined)}>
            <Head title={b.title} lead={b.lead} />
            <Enquiry kind={b.kind} />
          </Aside>
        </Section>
      );
    case "address":
      return (
        <Section block={{ id: b.id }}>
          <Aside img={auto ?? (useFallbackImages ? POOL.address[0] : undefined)}>
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
          <Head title={b.title} accent />
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
            <RichText content={b.text} />
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

export function Blocks({
  blocks,
  useFallbackImages = true,
  showJumpNav = true
}: {
  blocks: Block[];
  useFallbackImages?: boolean;
  showJumpNav?: boolean;
}) {
  const list = withIds(blocks);
  const taken = new Set(list.flatMap((b) => ("image" in b && b.image ? [b.image] : [])));
  const used = { text: 0, faq: 0, form: 0, address: 0 };
  const autos = useFallbackImages
    ? list.map((b, i) => {
        const kind = b.t === "text" ? (b.image ? null : "text") : b.t === "faq" || b.t === "form" || b.t === "address" ? b.t : null;
        if (!kind) return undefined;
        const pool = POOL[kind];
        const start = used[kind]++ + i;
        const pick = pool.map((_, k) => pool[(start + k) % pool.length]).find((x) => !taken.has(x)) ?? pool[start % pool.length];
        taken.add(pick);
        return pick;
      })
    : list.map(() => undefined);
  const jump = list.filter((b) => "id" in b && b.id && "title" in b && b.title);
  return (
    <>
      {showJumpNav && jump.length > 0 && <JumpNav items={jump as { id: string; title: string }[]} />}
      <InnerMotion />
      {list.map((b, i) => (
        <Render key={i} b={b} auto={autos[i]} useFallbackImages={useFallbackImages} />
      ))}
    </>
  );
}
