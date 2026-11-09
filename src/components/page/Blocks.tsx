import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Block, ProseItem, RichTextContent } from "@/data/pages/types";
import { Counter } from "@/components/ui/Counter";
import { DeptExplorer, Enquiry, Gallery, NewsExplorer } from "./Explorers";
import { AccreditationLogos, legacyAccreditationLogos } from "./AccreditationLogos";
import { Carousel } from "./Carousel";
import { LeaderSlides } from "./LeaderSlides";
import marquee from "./Marquee.module.scss";
import { VideoFrame } from "./VideoFrame";
import { PhaseGrid } from "./PhaseGrid";
import { JumpNav } from "./JumpNav";
import { InnerMotion } from "./InnerMotion";
import { AdministrationCarousel } from "./AdministrationCarousel";
import { LeadershipSlides } from "./LeadershipSlides";
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

/** Inline markup in running text: [label](url) links, **semi-bold** and ==accent colour==. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|==[^=]+==)/g);
  return (
    <>
      {parts.map((s, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(s);
        if (link)
          return (
            <SmartLink key={i} href={link[2]}>
              {link[1]}
            </SmartLink>
          );
        if (s.startsWith("**") && s.length > 4) return <strong key={i}><Rich text={s.slice(2, -2)} /></strong>;
        if (s.startsWith("==") && s.length > 4) return <span key={i} className={styles.accent}>{s.slice(2, -2)}</span>;
        return s;
      })}
    </>
  );
}

function ProseItems({ items }: { items: ProseItem[] }) {
  return (
    <>
      {items.map((it, i) =>
        "p" in it ? (
          <p key={i}>
            <Rich text={it.p} />
          </p>
        ) : "h" in it ? (
          <h3 key={i}>{it.h}</h3>
        ) : (
          <ul key={i}>
            {it.ul.map((li) =>
              typeof li === "string" ? (
                <li key={li}>{li}</li>
              ) : (
                <li key={li.text}>
                  {li.text}
                  <ul>
                    {li.sub.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        ),
      )}
    </>
  );
}

function Cell({ v }: { v: string }) {
  const link = /^\[(.+)\]\((.+)\)$/.exec(v);
  if (link) return <SmartLink href={link[2]}>{link[1]}</SmartLink>;
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

function PdfIcon({ label = "PDF" }: { label?: string }) {
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
      <text x="22" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="inherit">{label}</text>
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
      const image = b.center ? undefined : b.image ?? auto;
      return (
        <Section block={b}>
          <div className={`${styles.split} ${image || b.video ? "" : styles.single} ${b.center ? styles.centered : ""} ${b.flip ? styles.flip : ""} ${b.id === "legacy-of-late-sri-r-dayananda-sagar" ? styles.legacyLayout : ""}`}>
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
            {b.video && (
              <div className={`${styles.media} ${styles.video}`} data-rv>
                <VideoFrame id={b.video} title={b.title} />
              </div>
            )}
            {!b.video && image && (
              <div className={`${styles.media} ${b.fit ? styles[b.fit] : ""} ${b.id === "legacy-of-late-sri-r-dayananda-sagar" ? styles.art : ""}`} data-rv>
                <Image src={contentImageSrc(image)} alt={b.alt ?? ""} fill sizes={b.fit ? "(max-width: 1280px) 100vw, 620px" : "(max-width: 1280px) 100vw, 700px"} unoptimized={isRemoteContentImage(image)} />
              </div>
            )}
          </div>
        </Section>
      );
    }
    case "cards": {
      if (b.logos)
        return (
          <Section block={b}>
            <Head title={b.title} lead={b.lead} />
            <ul className={`${styles.logoGrid} ${styles[`c${b.cols ?? 4}`]}`}>
              {b.items.map((c) => {
                const inner = (
                  <>
                    <span className={styles.logo}>{c.image && <Image src={contentImageSrc(c.image)} alt={`${c.title}${typeof c.text === "string" && c.text ? `: ${c.text}` : ""}`} fill sizes="(max-width: 640px) 70vw, 300px" unoptimized={isRemoteContentImage(c.image)} />}</span>
                    {c.href && <span className={styles.more}>{b.more ?? "Learn more"} →</span>}
                  </>
                );
                return (
                  <li key={c.title}>
                    {c.href ? (
                      <SmartLink href={c.href} className={styles.logoItem}>
                        {inner}
                      </SmartLink>
                    ) : (
                      <div className={styles.logoItem}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Section>
        );
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
          <ul className={`${styles.grid} ${styles[`c${b.cols ?? 3}`]} ${isWhyCdsimer || b.colored ? styles.cardsColor : ""} ${b.id === "programs-listing" ? styles.fixed3 : ""}`}>
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
                    {c.bullets && (
                      <ul className={styles.cardList}>
                        {c.bullets.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    )}
                    {c.href && <span className={styles.more}>{b.more ?? "Learn more"} →</span>}
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
          <ul className={`${styles.stats} ${b.colored || slug(b.title ?? "") === "key-highlights" ? styles.statsColor : ""}`}>
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
      if (b.marquee || b.id === "journey") {
        return (
          <Section block={b.id === "journey" ? { id: b.id, tone: "cream" } : b}>
            <Head title={b.title} lead={b.lead} accent />
            <div className={marquee.root} role="region" aria-label={b.title}>
              <ol className={marquee.track}>
                {[0, 1].map((copy) =>
                  b.items.map((s, i) => (
                    <li key={`${copy}-${s.title}`} className={marquee.card} aria-hidden={copy ? true : undefined}>
                      <span className={marquee.label}>{s.label ?? i + 1}</span>
                      <h3>{s.title}</h3>
                      <RichText content={s.text} />
                    </li>
                  )),
                )}
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
        return <LeadershipSlides title={b.title} items={b.items} />;
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
          <ul className={`${styles.grid} ${styles[`c${b.cols ?? 3}`]} ${b.items.length === 1 ? styles.singleProfile : ""}`}>
            {b.items.map((p) => (
              <li key={p.name} className={`${styles.profile} ${p.image ? "" : styles.plain}`}>
                <span className={styles.avatar} aria-hidden="true">
                  {p.image ? <Image src={contentImageSrc(p.image)} alt="" fill sizes="(max-width: 640px) 100vw, 420px" unoptimized={isRemoteContentImage(p.image)} /> : initials(p.name) || p.name[0]}
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
                  <PdfIcon label={d.type ?? "PDF"} />
                  <span className={styles.docBody}>
                    <h3 data-reveal="in">{d.title}</h3>
                    <RichText content={d.note} />
                    <span className={styles.docRule} />
                    <span className={styles.dl}>{d.type === "LINK" ? "Open link" : "View / Download"}</span>
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
                    <SmartLink href={d.href} className={styles.docLink}>
                      {tile}
                    </SmartLink>
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
        <Section block={{ id: b.id, tone: b.tone ?? (b.plain ? undefined : "cream") }}>
          <Head title={b.title} lead={b.lead} />
          <Aside img={b.image ?? auto ?? (useFallbackImages ? POOL.faq[0] : undefined)}>
            <div className={styles.faq}>
              {b.items.map((f, i) => (
                <details key={f.q} name={`faq-${b.id ?? slug(b.title)}`} open={b.open !== false && i === 0}>
                  <summary>{f.q}</summary>
                  {typeof f.a === "string" ? (
                    f.a.split("\n\n").map((para) => <p key={para}>{para}</p>)
                  ) : (
                    <RichText content={f.a} />
                  )}
                </details>
              ))}
            </div>
          </Aside>
        </Section>
      );
    case "prose": {
      // cols: the first heading group stays full width; every later heading starts its own card in a row.
      const groups: ProseItem[][] = [];
      if (b.cols)
        for (const it of b.items) {
          if ("h" in it || !groups.length) groups.push([]);
          groups[groups.length - 1].push(it);
        }
      return (
        <Section block={b}>
          <div className={b.image ? `${styles.split} ${b.flip ? styles.flip : ""}` : undefined}>
            <div className={`${styles.prose} ${styles.proseWide}`}>
              {b.title && <h2>{b.title}</h2>}
              {b.cols ? (
                <>
                  <ProseItems items={groups[0]} />
                  <div className={styles.proseCols}>
                    {groups.slice(1).map((g, i) => (
                      <div key={i} className={styles.proseCard}>
                        <ProseItems items={g} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <ProseItems items={b.items} />
              )}
            </div>
            {b.image && (
              <div className={styles.media} data-rv>
                <Image src={contentImageSrc(b.image)} alt={b.alt ?? ""} fill sizes="(max-width: 1280px) 100vw, 700px" unoptimized={isRemoteContentImage(b.image)} />
              </div>
            )}
          </div>
        </Section>
      );
    }
    case "phasegrid":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <PhaseGrid data={b.data} />
        </Section>
      );
    case "carousel":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <Carousel items={b.items} grid={b.grid} />
        </Section>
      );
    case "slides":
      return (
        <Section block={b}>
          <Head title={b.title} lead={b.lead} />
          <LeaderSlides items={b.items} />
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
          <Head title={b.title} lead={b.lead} />
          <Aside img={b.image ?? auto ?? (useFallbackImages ? POOL.form[0] : undefined)}>
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
  const list = withIds(blocks.filter((b) => !(b.t === "links" && b.title.startsWith("Related"))));
  // Pick a photo for every block that needs one and has none, cycling through each kind's pool.
  const taken = new Set(list.flatMap((b) => ("image" in b && b.image ? [b.image] : [])));
  const used = { text: 0, faq: 0, form: 0, address: 0 };
  const autos = useFallbackImages
    ? list.map((b, i) => {
        const kind = b.t === "text" ? (b.image || b.video || b.center ? null : "text") : b.t === "faq" || b.t === "form" || b.t === "address" ? b.t : null;
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
