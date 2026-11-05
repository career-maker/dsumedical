"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deptTabs, depts } from "@/data/pages/clinical";
import { news, newsTabs } from "@/data/home";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
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
    <>
      <Tabs tabs={deptTabs} value={tab} onChange={setTab} label="Department categories" name="dept" />
      <div role="tabpanel" id="dept-panel" aria-labelledby={`dept-tab-${tab}`}>
      <ul className={styles.cards}>
        {list.map((d, i) => (
          <li key={d.slug}>
            <Link prefetch={false} href={`/department/${d.slug}`} className={styles.card}>
              <span className={styles.img}>
                <Image src={contentImageSrc(d.image)} alt="" fill sizes="(max-width: 1280px) 50vw, 404px" unoptimized={isRemoteContentImage(d.image)} />
              </span>
              <span className={styles.body}>
                <h3>{d.name}</h3>
                <p>{d.blurb}</p>
                <span className={styles.more}>View department →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

export function NewsExplorer() {
  const [tab, setTab] = useState("all");
  const items = tab === "all" ? news : news.filter((n) => n.tag === tab);
  return (
    <>
      <Tabs tabs={newsTabs} value={tab} onChange={setTab} label="News categories" name="news" />
      <div role="tabpanel" id="news-panel" aria-labelledby={`news-tab-${tab}`}>
      {items.length ? (
        <ul className={styles.cards}>
          {items.map((n, i) => (
            <li key={n.title} className={styles.card}>
              <span className={styles.img}>
                <Image src={contentImageSrc(`/images/${n.photo}.jpg`)} alt={n.alt} fill sizes="(max-width: 1280px) 50vw, 404px" />
              </span>
              <span className={styles.body}>
                <time dateTime={n.iso}>{n.date}</time>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </span>
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

export function Gallery({ groups }: { groups: Group[] }) {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const tabs = groups.length > 1 ? [{ id: "all", label: "All" }, ...groups.map((g) => ({ id: g.label, label: g.label }))] : [];
  const shown = groups.filter((g) => tab === "all" || g.label === tab).flatMap((g) => g.images);

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
      {tabs.length > 0 && <Tabs tabs={tabs} value={tab} onChange={(v) => { setTab(v); setOpen(null); }} label="Gallery modules" name="gal" />}
      <div role="tabpanel" id="gal-panel" aria-labelledby={`gal-tab-${tab}`}>
      <ul className={styles.gallery}>
        {shown.map((im, i) => (
          <li key={im.src + i}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open image: ${im.alt}`}>
              <Image src={contentImageSrc(im.src)} alt={im.alt} fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized={isRemoteContentImage(im.src)} />
            </button>
          </li>
        ))}
      </ul>
      </div>
      {open !== null && shown[open] && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={shown[open].alt} onClick={() => setOpen(null)}>
          <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
          <button type="button" className={`${styles.nav} ${styles.prev}`} aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + shown.length) % shown.length); }}>
            ‹
          </button>
          <div className={styles.full} onClick={(e) => e.stopPropagation()}>
            <Image src={contentImageSrc(shown[open].src)} alt={shown[open].alt} fill sizes="90vw" unoptimized={isRemoteContentImage(shown[open].src)} />
          </div>
          <button type="button" className={`${styles.nav} ${styles.next}`} aria-label="Next image" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % shown.length); }}>
            ›
          </button>
        </div>
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
        Full name
        <input name="name" required maxLength={120} autoComplete="name" />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" required maxLength={15} pattern="[0-9+ ]{10,15}" autoComplete="tel" />
      </label>
      <label>
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" />
      </label>
      {f.programme ? (
        <label>
          Programme
          <select name="programme" required defaultValue="">
            <option value="" disabled>Select a programme</option>
            <option>MBBS</option>
            <option>Post Graduation</option>
            <option>Ph.D</option>
          </select>
        </label>
      ) : (
        <label>
          City
          <input name="city" maxLength={120} autoComplete="address-level2" />
        </label>
      )}
      <label className={styles.full2}>
        {f.message}
        <textarea name="message" maxLength={4000} rows={4} />
      </label>
      <label className={`${styles.full2} ${styles.consent}`}>
        <input name="consent" type="checkbox" value="true" required />
        <span>
          I agree to be contacted and to the <Link prefetch={false} href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
