"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SubmitButton } from "@/components/ui/Button";
import { deptTabs, depts } from "@/data/pages/clinical";
import dept from "./DeptIndex.module.scss";
import styles from "./Explorers.module.scss";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import { clean, MAX } from "@/lib/form-validation";
import { enquiryRules } from "@/lib/enquiry-validation";
import { useFieldErrors } from "@/lib/use-field-errors";

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
              <Link prefetch={false} href={d.href ?? `/department/${d.slug}`} className={dept.card}>
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

type ProgrammeOption = { id: string; title: string };

/** Programme options from the Programs collection in Strapi (via /api/enquiry-options). */
function useProgrammeOptions(enabled: boolean) {
  const [state, setState] = useState<{ options: ProgrammeOption[]; status: "loading" | "ready" | "error" }>({
    options: [],
    status: enabled ? "loading" : "ready",
  });
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    fetch("/api/enquiry-options")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((body: { data?: { programmes?: ProgrammeOption[] } }) => {
        if (active) setState({ options: body.data?.programmes ?? [], status: "ready" });
      })
      .catch(() => active && setState({ options: [], status: "error" }));
    return () => {
      active = false;
    };
  }, [enabled]);
  return state;
}

/** Inline error under a field; `id` is referenced by the field's aria-describedby. */
function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span id={id} className={styles.fieldError} role="alert">
      {message}
    </span>
  ) : null;
}

export function Enquiry({ kind }: { kind: keyof typeof fields }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { errors, validate, validateForm, reset, setAll } = useFieldErrors(enquiryRules(kind));
  const f = fields[kind];
  const programmes = useProgrammeOptions(f.programme);

  // Current values of the form (uncontrolled inputs), consent as a boolean.
  const readValues = () => {
    const data = new FormData(formRef.current ?? undefined);
    return {
      name: clean(data.get("name")),
      phone: clean(data.get("phone")),
      email: clean(data.get("email")),
      ...(f.programme ? { programme: clean(data.get("programme")) } : { city: clean(data.get("city")) }),
      message: clean(data.get("message")),
      consent: data.get("consent") === "true",
    };
  };
  // Validate a field when it is left; once it shows an error, re-check as the user types so it clears.
  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name;
    if (name) validate(name, readValues());
  };
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (target.name && (errors[target.name] || target.type === "checkbox" || target.tagName === "SELECT")) {
      validate(target.name, readValues());
    }
  };
  // Accessibility/validation props for the field `name`.
  const field = (name: string) => ({
    name,
    "aria-invalid": !!errors[name] || undefined,
    "aria-describedby": errors[name] ? `enquiry-${kind}-${name}-error` : undefined,
  });
  const err = (name: string) => <FieldError id={`enquiry-${kind}-${name}-error`} message={errors[name]} />;

  if (sent)
    return (
      <div className={styles.success} role="status">
        <h3>Thank you!</h3>
        <p>Your request has been noted. Our team will contact you shortly.</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSent(false);
          }}
        >
          Submit another
        </button>
      </div>
    );

  return (
    <form
      ref={formRef}
      className={styles.form}
      noValidate
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;
        setError("");

        const submission = readValues();
        const invalid = validateForm(submission);
        const first = Object.keys(invalid)[0];
        if (first) {
          formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
          return;
        }

        setSubmitting(true);
        try {
          const response = await fetch("/api/enquiries", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              kind,
              ...submission,
              sourcePage: window.location.pathname,
              website: new FormData(formRef.current ?? undefined).get("website") ?? "",
            })
          });
          if (!response.ok) {
            // Field errors found on the server (e.g. a programme that was just unpublished).
            const body = (await response.json().catch(() => null)) as { errors?: Record<string, string> } | null;
            if (body?.errors) setAll(body.errors);
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
      {/* Honeypot: hidden from people, filled by bots; Strapi silently drops those submissions. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" className={styles.hp} />
      <label>
        <span className={styles.sr}>Full name</span>
        <input {...field("name")} placeholder="Full name *" required maxLength={MAX.name} autoComplete="name" />
        {err("name")}
      </label>
      <label>
        <span className={styles.sr}>Phone</span>
        <input {...field("phone")} type="tel" inputMode="tel" placeholder="Phone number *" required maxLength={20} autoComplete="tel" />
        {err("phone")}
      </label>
      <label>
        <span className={styles.sr}>Email</span>
        <input {...field("email")} type="email" placeholder="Email address *" required maxLength={MAX.email} autoComplete="email" />
        {err("email")}
      </label>
      {f.programme ? (
        <label>
          <span className={styles.sr}>Programme</span>
          <select {...field("programme")} required defaultValue="" disabled={programmes.status === "loading"}>
            <option value="" disabled>
              {programmes.status === "loading" ? "Loading programmes…" : "Select a Programme *"}
            </option>
            {programmes.options.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          {err("programme")}
          {programmes.status === "error" && (
            <span className={styles.fieldError} role="alert">Programmes could not be loaded. Please refresh the page.</span>
          )}
        </label>
      ) : (
        <label>
          <span className={styles.sr}>City</span>
          <input {...field("city")} placeholder="City" maxLength={MAX.subject} autoComplete="address-level2" />
          {err("city")}
        </label>
      )}
      <label className={styles.full2}>
        <span className={styles.sr}>{f.message}</span>
        <textarea {...field("message")} maxLength={MAX.message} rows={4} placeholder={f.message} />
        {err("message")}
      </label>
      <div className={styles.full2}>
        <label className={styles.consent}>
          <input {...field("consent")} type="checkbox" value="true" required />
          <span>
            I agree to be contacted and to the <Link prefetch={false} href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        {err("consent")}
      </div>
      {error && <p role="alert" className={styles.full2}>{error}</p>}
      <SubmitButton className={styles.submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</SubmitButton>
    </form>
  );
}
