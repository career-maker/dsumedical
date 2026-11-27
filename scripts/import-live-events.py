"""Rebuilds the events data from https://cdsimer.edu.in/events:
   src/data/events.ts          every event (text, date, PDF report, id)
   src/data/events-latest.ts   the 3 newest events per category (home page)
   src/data/event-details.ts   inner pages ("Read More"): the live site's own inner pages plus events that carry photos
Files they link to (PDF reports, photos) are copied to public/docs/events and public/images/events.
Run from the project root:  python scripts/import-live-events.py

To give ANY event an inner page by hand: add its id (see events.ts) to EXTRA_DETAILS below (or straight to
src/data/event-details.ts); the card then shows a Read More button and the page /events/<id> exists."""
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

BASE = "https://cdsimer.edu.in"
NL = chr(10)
MONTHS = {m: i + 1 for i, m in enumerate("january february march april may june july august september october november december".split())}
SHORT = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()

# Hand-written inner pages, keyed by the start of the event text. Only facts from the live listing are used.
EXTRA_DETAILS = {
    "A soft skill training program was conducted for the teaching and non-teaching staff on 9th November, 2022": {
        "heading": "Soft Skill Training Programme",
        "paras": ["A soft skill training programme was conducted for the teaching and non-teaching staff of CDSIMER on 9th November, 2022 by a professional trainer."],
        "items": ["Date: 9 November 2022", "Participants: teaching and non-teaching staff", "Trainer: a professional trainer"],
    },
}


def fetch(url, tries=5):
    for a in range(tries):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=120)
            return r.read()
        except Exception:
            time.sleep(2 * (a + 1))
    raise SystemExit("could not download " + url)


def page(url):
    return re.sub(r"<!--.*?-->", "", fetch(url).decode("utf-8", "ignore"), flags=re.S)


def txt(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s)).replace("\xa0", " ").replace("�", "–")).strip()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


IMG = re.compile(r"\.(jpe?g|png|gif|webp)$", re.I)


def when(title):
    """First date written in the text: '28th October, 2026', '5 Jan 2022' or '17-02-2023'. Returns (iso, display) or None."""
    m = re.search(r"(\d{1,2})(?:st|nd|rd|th)?[\s,.-]*(?:of\s+)?(%s)[a-z]*[\s,.-]*(\d{4})" % "|".join(k[:3] for k in MONTHS), title, flags=re.I)
    if m:
        d, mo, y = int(m.group(1)), [i for k, i in MONTHS.items() if k.startswith(m.group(2).lower())][0], int(m.group(3))
    else:
        m = re.search(r"\b(\d{1,2})[-/.](\d{1,2})[-/.](20\d{2})\b", title)
        if not m:
            return None
        d, mo, y = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if not (1 <= d <= 31 and 1 <= mo <= 12):
        return None
    return f"{y}-{mo:02d}-{d:02d}", f"{d} {SHORT[mo - 1]} {y}"


GAL = re.compile(r'<ul id="sigFree\w*" class="sigFreeContainer.*?</ul>', re.S)
GAL_LINK = re.compile(r'<a[^>]*class="sigFreeLink[^"]*"[^>]*href="([^"]+)"|<a[^>]*href="([^"]+)"[^>]*class="sigFreeLink')


def take_galleries(seg):
    """Replace each photo gallery by a marker; return the new text and the galleries (lists of full-size image paths)."""
    gals = []

    def rep(m):
        gals.append([re.sub(r"/{2,}", "/", a or b) for a, b in GAL_LINK.findall(m.group(0))])
        return f"@@GAL{len(gals) - 1}@@"

    return GAL.sub(rep, seg), gals


def attachments(seg, gals):
    """PDF, photos, inner-page slug and gallery link found in one event's HTML."""
    out = {"pdf": None, "images": [], "inner": None, "gallery": False}
    for g in re.findall(r"@@GAL(\d+)@@", seg):
        out["images"] += gals[int(g)]
    for href, _label in re.findall(r'<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>', seg, flags=re.S):
        href = re.sub(r"/{2,}", "/", href)
        if href.lower().endswith(".pdf"):
            out["pdf"] = out["pdf"] or href
        elif IMG.search(href):
            out["images"].append(href)
        elif href == "/gallery":
            out["gallery"] = True
        elif href.startswith("/") and len(href) > 1:
            out["inner"] = out["inner"] or href.strip("/")
    out["images"] = list(dict.fromkeys(out["images"]))
    return out


raw = page(BASE + "/events")


def pane(tid, nxt):
    s = raw.find(f'id="{tid}"')
    e = raw.find(f'id="{nxt}"') if nxt else raw.find("</article>", s)
    return raw[s:e]


entries = {"activity": [], "studentActivity": [], "facultyAchievements": [], "studentAchievements": []}

seg, gals = take_galleries(pane("fa", "sa"))
for p in re.split(r'(?=<p class="pheading">)', seg)[1:]:
    m = re.match(r'<p class="pheading">(.*?)(?:</p>|(?=<hr|<ul|<li|<p ))(.*)', p, flags=re.S)
    rest = m.group(2).split("<hr")[0]
    title = txt(m.group(1))
    if title:
        paras = [txt(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", rest, flags=re.S) if txt(x)]
        items = [txt(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", rest, flags=re.S) if txt(x)]
        entries["activity"].append({"title": title, "paras": paras, "items": items, "att": attachments(rest, gals)})

for key, tid, nxt in [("studentActivity", "sa", "fachive"), ("facultyAchievements", "fachive", "sachive"), ("studentAchievements", "sachive", None)]:
    seg, gals = take_galleries(pane(tid, nxt))
    seg = re.sub(r"<h3.*?</h3>", "", seg, flags=re.S)
    # Some events are laid out as a photo card (text above its photo) instead of a list item: treat them as list items.
    seg = re.sub(
        r'<div class="col-md-6; eventimg">\s*<p[^>]*>(.*?)</p>\s*(<a[^>]*href="[^"]+"[^>]*>)\s*<img[^>]*>\s*</a>\s*</div>',
        lambda m: "<li>" + m.group(1) + "</li>" + m.group(2) + "photo</a>",
        seg,
        flags=re.S,
    )
    for chunk in re.split(r"(?=<li(?:\s[^>]*)?>)", seg)[1:]:
        m = re.match(r"<li[^>]*>(.*?)</li>(.*)", chunk, flags=re.S)
        if m and txt(m.group(1)):
            # everything up to the next list item belongs to this event (its Read More link, thumbnails, gallery marker)
            entries[key].append({"title": txt(m.group(1)), "paras": [], "items": [], "att": attachments(chunk, gals)})

# --- dates, years, ids --------------------------------------------------------------------------------------------
used = set()
for lst in entries.values():
    y = None
    for e in lst:
        w = when(e["title"])
        if w:
            e["iso"], e["date"] = w
            y = w[0][:4]
        if y:
            e["year"] = y
        base = (e.get("iso") or e.get("year") or "undated") + "-" + "-".join(slugify(e["title"]).split("-")[:6])
        i, eid = 2, base
        while eid in used:
            eid, i = f"{base}-{i}", i + 1
        used.add(eid)
        e["id"] = eid

# --- files: copy what events link to onto our own server ---------------------------------------------------------
os.makedirs("public/docs/events", exist_ok=True)


def host_pdf(href):
    name = os.path.basename(href)
    dest = "public/docs/events/" + name
    if not os.path.exists(dest):
        data = fetch(BASE + urllib.parse.quote(href))
        assert data[:5] == b"%PDF-", href
        open(dest, "wb").write(data)
    return "/docs/events/" + name


def host_image(href, folder):
    name = os.path.basename(href)
    d = f"public/images/events/{folder}"
    os.makedirs(d, exist_ok=True)
    dest = f"{d}/{name}"
    if not os.path.exists(dest):
        data = fetch(BASE + urllib.parse.quote(href))
        assert len(data) > 1500 and data[:5] != b"<!DOC", href
        open(dest, "wb").write(data)
    return f"events/{folder}/{name}"


def inner_page(slug):
    """Content of one of the live site's own inner pages (for example /independence-day)."""
    h = page(f"{BASE}/{slug}")
    art = re.search(r"<article.*?</article>", h, flags=re.S).group(0)
    art = re.sub(r"<(script|style).*?</\1>", "", art, flags=re.S)
    art, gs = take_galleries(art)
    heading = txt(re.search(r"<title>(.*?)</title>", h, flags=re.S).group(1))
    att = attachments(art, gs)
    pdfs = []
    for href, label in re.findall(r'<a\s[^>]*href="([^"]+\.pdf)"[^>]*>(.*?)</a>', art, flags=re.S | re.I):
        pdfs.append((href, "Newsletter (PDF)" if "newsletter" in txt(label).lower() else "Read more (PDF)"))
    body = re.sub(r"<a\s[^>]*>.*?</a>", "", art, flags=re.S)  # link texts such as "Click to know more"
    paras = [txt(x) for x in re.findall(r"<(?:p|li)[^>]*>(.*?)</(?:p|li)>", body, flags=re.S) if len(txt(x)) > 3]
    return {"heading": heading, "paras": paras, "images": att["images"], "pdfs": pdfs}


def short_heading(title):
    # first sentence, but do not stop after "Dr." / "Mr." / "Ms." / "Prof."
    first = re.split(r"(?<!Dr\.)(?<!Mr\.)(?<!Ms\.)(?<!Mrs\.)(?<!Prof\.)(?<=[.!?])\s", title)[0].rstrip(".")
    if len(first) <= 90:
        return first
    return first[:90].rsplit(" ", 1)[0] + chr(0x2026)


details = {}
for lst in entries.values():
    for e in lst:
        att = e.pop("att")
        extra = next((v for k, v in EXTRA_DETAILS.items() if e["title"].startswith(k)), None)
        if att["pdf"]:
            e["href"] = host_pdf(att["pdf"])
        if att["gallery"]:
            e["link"] = {"label": "View photos", "href": "/gallery"}
        d = None
        if att["inner"]:
            src = inner_page(att["inner"])
            d = {"heading": src["heading"], "paras": src["paras"], "images": src["images"], "pdfs": src["pdfs"]}
            e["id"] = slugify(att["inner"])
        elif att["images"]:
            d = {"heading": (f"Event on {e['date']}" if e.get("date") else "Event details"), "paras": [e["title"]] + e["paras"], "images": att["images"], "pdfs": []}
            if e["items"]:
                d["items"] = e["items"]
        if extra:
            d = {**(d or {}), **extra}
        if d:
            out = {"heading": d["heading"], "paras": d.get("paras", [])}
            if e.get("date"):
                out["date"] = e["date"]
            if d.get("items"):
                out["items"] = d["items"]
            imgs = [{"src": host_image(u, e["id"]), "alt": f"{d['heading']}: photo {n}"} for n, u in enumerate(d.get("images", []), 1)]
            docs = [{"label": lab, "href": host_pdf(h)} for h, lab in d.get("pdfs", [])]
            if imgs:
                out["images"] = imgs
            if docs:
                out["pdfs"] = docs
            details[e["id"]] = out

head = "// Generated by scripts/import-live-events.py from https://cdsimer.edu.in/events (text only, same order as the live page)." + NL
keys = '"activity" | "studentActivity" | "facultyAchievements" | "studentAchievements"'
typ = "export type EventItem = { id: string; title: string; paras?: string[]; items?: string[]; href?: string; link?: { label: string; href: string }; date?: string; iso?: string; year?: string };" + NL + NL
open("src/data/events.ts", "w", encoding="utf-8").write(head + typ + f"export const events: Record<{keys}, EventItem[]> = " + json.dumps(entries, indent=1, ensure_ascii=False) + ";" + NL)
latest = {k: v[:3] for k, v in entries.items()}
open("src/data/events-latest.ts", "w", encoding="utf-8").write(
    head + "// The 3 newest events of each category, kept in a small file so the home page does not load the full list." + NL
    + 'import type { EventItem } from "./events";' + NL + NL
    + f"export const homeEvents: Record<{keys}, EventItem[]> = " + json.dumps(latest, indent=1, ensure_ascii=False) + ";" + NL
)
dtyp = (
    "// Inner pages of events (the Read More button and the page /events/<id>). Key = the event id from events.ts." + NL
    + "// To give another event an inner page, add an entry here: heading, paragraphs, optional bullet items, photos (files under /images) and PDFs." + NL
    + "export type EventDetail = { heading: string; date?: string; paras: string[]; items?: string[]; images?: { src: string; alt: string }[]; pdfs?: { label: string; href: string }[] };" + NL + NL
)
open("src/data/event-details.ts", "w", encoding="utf-8").write(dtyp + "export const eventDetails: Record<string, EventDetail> = " + json.dumps(details, indent=1, ensure_ascii=False) + ";" + NL)
sys.stdout.reconfigure(encoding="utf-8")
print({k: len(v) for k, v in entries.items()}, "inner pages:", len(details))
for k, v in details.items():
    print(" ", k, "| imgs", len(v.get("images", [])), "| pdfs", len(v.get("pdfs", [])), "|", v["heading"][:60])
