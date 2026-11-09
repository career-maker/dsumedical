"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SubmitButton } from "@/components/ui/Button";
import { deptTabs, depts } from "@/data/pages/clinical";
import { news, newsTabs } from "@/data/home";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import dept from "./DeptIndex.module.scss";
import styles from "./Explorers.module.scss";

type Tab = { id: string; label: string };

function Tabs({ tabs, value, onChange, label, name }: { tabs: readonly Tab[]; value: string; onChange: (v: string) => void; label: string; name: string }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {tabs.map((t) => (
        <button key={t.id} id={`${name}-tab-${t.id}`} type="button" role="tab" aria-selected={value === t.id} aria-controls={`${name}-panel`} className={value === t.id ? styles.on : ""} onClick={() => onChange(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function DeptExplorer() {
  const [tab, setTab] = useState<string>("pre");
  const list = depts.filter((d) => d.tab === tab);
  return (
    <div className={dept.layout}>
      <div className={dept.rail} role="tablist" aria-label="Department categories" aria-orientation="vertical">
        {deptTabs.map((t) => (
          <button key={t.id} id={`dept-tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls="dept-panel" className={tab === t.id ? dept.on : ""} onClick={() => setTab(t.id)}>
            {t.label}
            <small>{depts.filter((d) => d.tab === t.id).length}</small>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="dept-panel" aria-labelledby={`dept-tab-${tab}`}>
        <ul className={dept.grid}>
          {list.map((d) => (
            <li key={d.slug}>
              <Link prefetch={false} href={`/department/${d.slug}`} className={dept.card}>
                <span className={dept.img}>
                  <Image src={contentImageSrc(d.image)} alt="" fill sizes="(max-width: 1280px) 50vw, 360px" unoptimized={isRemoteContentImage(d.image)} />
                </span>
                <span className={dept.body}>
                  <h3>{d.name}</h3>
                  <p>{d.blurb}</p>
                  <span className={dept.foot}>
                    View department
                    <span className={dept.go} aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function NewsExplorer() {
  const [tab, setTab] = useState("all");
  // Category links elsewhere point at /news#events etc.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (newsTabs.some((t) => t.id === id)) setTab(id);
  }, []);
  const items = tab === "all" ? news : news.filter((n) => n.tag === tab);
  return (
    <>
      <Tabs tabs={newsTabs} value={tab} onChange={setTab} label="News categories" name="news" />
      <div role="tabpanel" id="news-panel" aria-labelledby={`news-tab-${tab}`}>
      {items.length ? (
        <ul className={styles.cards}>
          {items.map((n) => (
            <li key={n.slug}>
              <Link prefetch={false} href={`/news/${n.slug}`} className={styles.card}>
                <span className={styles.img}>
                  <Image src={`/images/${n.photo}`} alt={n.alt} fill sizes="(max-width: 1280px) 50vw, 404px" />
                </span>
                <span className={styles.body}>
                  {n.date && <time dateTime={n.iso}>{n.date}</time>}
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                  <span className={styles.more}>Read more →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No updates in this category yet.</p>
      )}
      </div>
    </>
  );
}

type Group = { label: string; images: { src: string; alt: string }[] };

const GALLERY_PAGE = 12;

export function Gallery({ groups }: { groups: Group[] }) {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const tabs = groups.length > 1 ? [{ id: "all", label: "All" }, ...groups.map((g) => ({ id: g.label, label: g.label }))] : [];
  const shown = groups.filter((g) => tab === "all" || g.label === tab).flatMap((g) => g.images);
  const pages = Math.ceil(shown.length / GALLERY_PAGE);
  const start = page * GALLERY_PAGE;
  const go = (n: number) => {
    setPage(n);
    setOpen(null);
    document.getElementById("gal-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, shown.length]);

  return (
    <>
      {tabs.length > 0 && <Tabs tabs={tabs} value={tab} onChange={(v) => { setTab(v); setPage(0); setOpen(null); }} label="Gallery modules" name="gal" />}
      <div role="tabpanel" id="gal-panel" aria-labelledby={`gal-tab-${tab}`}>
      <span id="gal-top" className={styles.galTop} />
      <ul className={styles.gallery}>
        {shown.slice(start, start + GALLERY_PAGE).map((im, i) => (
          <li key={im.src + (start + i)}>
            <button type="button" onClick={() => setOpen(start + i)} aria-label={`Open image: ${im.alt}`}>
              <Image src={contentImageSrc(im.src)} alt={im.alt} fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized={isRemoteContentImage(im.src)} />
            </button>
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <nav className={styles.pager} aria-label="Gallery pages">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">
            ‹
          </button>
          {Array.from({ length: pages }, (_, n) => (
            <button key={n} type="button" onClick={() => go(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n + 1}`} className={n === page ? styles.pageOn : ""}>
              {n + 1}
            </button>
          ))}
          <button type="button" onClick={() => go(page + 1)} disabled={page === pages - 1} aria-label="Next page">
            ›
          </button>
        </nav>
      )}
      </div>
      {open !== null && shown[open] &&
        // Portalled to <body>: an animated ancestor (transform) would otherwise become the containing block of this fixed overlay.
        createPortal(
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={shown[open].alt} onClick={() => setOpen(null)}>
          <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
          <button type="button" className={`${styles.nav} ${styles.prev}`} aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + shown.length) % shown.length); }}>
            ‹
          </button>
          {/* Sized by the photo itself (width/height only give the aspect before it loads), so there is no letterbox gap. */}
          <Image className={styles.full} src={contentImageSrc(shown[open].src)} unoptimized={isRemoteContentImage(shown[open].src)} alt={shown[open].alt} width={1600} height={1067} sizes="92vw" onClick={(e) => e.stopPropagation()} />
          <button type="button" className={`${styles.nav} ${styles.next}`} aria-label="Next image" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % shown.length); }}>
            ›
          </button>
        </div>,
          document.body,
        )}
    </>
  );
}

const fields = {
  admission: { programme: true, message: "Your question (optional)" },
  appointment: { programme: false, message: "Department / reason for visit" },
  contact: { programme: false, message: "Your message" },
} as const;

export function Enquiry({ kind }: { kind: keyof typeof fields }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const f = fields[kind];

  if (sent)
    return (
      <div className={styles.success} role="status">
        <h3>Thank you!</h3>
        <p>Your request has been noted. Our team will contact you shortly.</p>
        <button type="button" onClick={() => setSent(false)}>Submit another</button>
      </div>
    );

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError("");

        const values = new FormData(e.currentTarget);
        const submission = {
          kind,
          name: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          ...(f.programme ? { programme: values.get("programme") } : {}),
          ...(!f.programme ? { city: values.get("city") } : {}),
          message: values.get("message"),
          consent: values.get("consent") === "true"
        };

        try {
          const response = await fetch("/api/enquiries", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(submission)
          });
          if (!response.ok) {
            setError(
              response.status === 429
                ? "Too many submissions. Please try again later."
                : "We could not submit your request. Please check your details and try again."
            );
            return;
          }
          setSent(true);
        } catch {
          setError("We could not submit your request. Please try again shortly.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <label>
        <span className={styles.sr}>Full name</span>
        <input name="name" placeholder="Full name" required maxLength={120} autoComplete="name" />
      </label>
      <label>
        <span className={styles.sr}>Phone</span>
        <input name="phone" type="tel" placeholder="Phone number" required maxLength={15} pattern="[0-9+ ]{10,15}" autoComplete="tel" />
      </label>
      <label>
        <span className={styles.sr}>Email</span>
        <input name="email" type="email" placeholder="Email address" required maxLength={254} autoComplete="email" />
      </label>
      {f.programme ? (
        <label>
          <span className={styles.sr}>Programme</span>
          <select name="programme" required defaultValue="">
            <option value="" disabled>Select a Programme</option>
            <option>MBBS</option>
            <option>Post Graduation</option>
            <option>Ph.D</option>
          </select>
        </label>
      ) : (
        <label>
          <span className={styles.sr}>City</span>
          <input name="city" placeholder="City" maxLength={120} autoComplete="address-level2" />
        </label>
      )}
      <label className={styles.full2}>
        <span className={styles.sr}>{f.message}</span>
        <textarea name="message" maxLength={4000} rows={4} placeholder={f.message} />
      </label>
      <label className={`${styles.full2} ${styles.consent}`}>
        <input name="consent" type="checkbox" value="true" required />
        <span>
          I agree to be contacted and to the <Link prefetch={false} href="#">Privacy Policy</Link>.
        </span>
      </label>
      {error && <p role="alert">{error}</p>}
      <SubmitButton className={styles.submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</SubmitButton>
    </form>
  );
}
