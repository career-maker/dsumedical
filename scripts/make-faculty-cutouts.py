"""Background-removed (transparent WebP) copies of every faculty / staff photo used by the profile cards.
Output: public/faculty-cut/<image path with / replaced by __>.webp  (the card component derives the same name).
Needs rembg, scipy, pillow (pip install rembg onnxruntime scipy pillow); the model downloads on first run.

  python scripts/make-faculty-cutouts.py          only photos that have no cutout yet
  python scripts/make-faculty-cutouts.py --all    redo every photo (use after changing this script)
  python scripts/make-faculty-cutouts.py john-stephen anil-kumar   redo only photos whose path contains one of the words

Two masks are combined:
  1. rembg (people model): good hair and edges, but it can erase white clothing that is lighter than the background.
  2. the photo's own background colour (flood-filled from the top and upper sides): exact for studio photos with an even
     colour. When the photo has an even background and mask 2 shows body that mask 1 lost, the two are merged.
Photos stored sideways (camera rotation tag) are turned upright first."""
import json
import os
import re
import sys

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove
from scipy import ndimage as ndi

OUT = "public/faculty-cut"
key = lambda n: re.sub(r"[^a-z]", "", re.sub(r"\b(dr|mr|ms|mrs)\b", "", n.lower()))


def load(path, marker):
    t = open(path, encoding="utf-8").read()
    t = t[t.index(marker):]
    t = t[t.index("= {") + 2 : t.rindex("}") + 1]
    return json.loads(re.sub(r",(\s*[}\]])", r"\1", t))


def colour_mask(im):
    """Foreground = everything that is not the background colour. Returns (mask, reliable)."""
    a = np.asarray(im, dtype=np.float64)
    h, w, _ = a.shape
    top = a[: max(3, h // 60), :, :].reshape(-1, 3)
    rows = slice(0, int(h * 0.35))
    sides = np.concatenate([a[rows, : max(3, w // 60)].reshape(-1, 3), a[rows, -max(3, w // 60):].reshape(-1, 3)])
    samples = np.concatenate([top, sides])
    bg = np.median(samples, axis=0)
    spread = np.linalg.norm(samples - bg, axis=1)
    reliable = bool(np.percentile(spread, 90) < 28)
    thr = max(34, np.percentile(spread, 97) * 1.4)
    cand = np.linalg.norm(a - bg, axis=2) < thr
    lab, _ = ndi.label(cand)
    keep = set(lab[0, :]) | set(lab[: int(h * 0.6), 0]) | set(lab[: int(h * 0.6), -1])
    keep.discard(0)
    fg = ndi.binary_fill_holes(~np.isin(lab, list(keep)))
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    if n2:
        fg = lab2 == (1 + int(np.argmax(ndi.sum(fg, lab2, range(1, n2 + 1)))))
    return fg, reliable


def main():
    redo = "--all" in sys.argv
    names = [a for a in sys.argv[1:] if not a.startswith("--")]
    live = load("src/data/pages/dept-live.ts", "export const liveDepts")
    fac = load("src/data/faculty-2026.ts", "export const faculty2026")
    images = set()
    for slug in set(live) | set(fac):
        old = {key(p["name"]): p for p in live.get(slug, {}).get("people", [])}
        if slug in fac:
            for p in fac[slug]:
                img = p.get("image") or (old.get(key(p["name"])) or {}).get("image")
                if img:
                    images.add(img)
        else:
            images.update(p["image"] for p in old.values() if p.get("image"))
    images.update(re.findall(r'image: "(lib-[^"]+)"', open("src/data/pages/general.ts", encoding="utf-8").read()))

    os.makedirs(OUT, exist_ok=True)
    session = new_session("u2net_human_seg")
    done, merged, turned = 0, [], []
    for img in sorted(images):
        dst = f"{OUT}/{re.sub(r'\.[^.]+$', '', img).replace('/', '__')}.webp"
        if names and not any(n in img for n in names):
            continue
        if os.path.exists(dst) and not redo and not names:
            continue
        raw = Image.open(f"public/images/{img}")
        if raw.getexif().get(274, 1) != 1:
            turned.append(img)  # carries a rotation tag; the pixels are used as stored (rembg would turn them again)
        im = Image.fromarray(np.asarray(raw.convert("RGB")))  # fresh image: no metadata for rembg to act on
        im.thumbnail((1600, 1600), Image.LANCZOS)  # a card is about 300 px wide; huge originals only cost time and memory
        if max(im.size) <= 800:
            im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)  # small thumbnails: smoother edges
        cut = remove(im, session=session)
        a1 = np.asarray(cut.getchannel("A"), dtype=np.float64) / 255
        m2, reliable = colour_mask(im)
        m1 = a1 > 0.5
        inner_mask = ndi.binary_erosion(m2, iterations=3, border_value=1)  # body without the colour fringe at its edge
        lost = (m1 & ~m2).sum() / max(1, m1.sum())  # what mask 2 would remove
        # Body that rembg erased or left see-through: only below the shoulders, and only regions that reach the bottom or a side
        # of the photo (a torso always does; a shadow beside the neck does not).
        w = inner_mask.shape[1]
        weak_zone = inner_mask & (a1 < 0.85)
        weak_zone[: int(weak_zone.shape[0] * 0.6)] = False
        lab, n = ndi.label(weak_zone)
        edge = lab[-3:, w // 5 : w - w // 5].ravel()  # the middle of the bottom edge: body there, not background beside the shoulders
        reach = {i for i in set(edge) if i}
        torso = np.isin(lab, list(reach)) if reach else np.zeros_like(weak_zone)
        weak = torso.sum() / max(1, inner_mask.sum())
        if reliable and lost < 0.06 and 0.02 < weak < 0.5:
            fill = ndi.binary_fill_holes(ndi.binary_dilation(torso, iterations=2) | m1).astype(np.float64)  # also closes small holes inside the body
            a = np.maximum(a1, np.asarray(Image.fromarray((fill * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))) / 255)
            cut.putalpha(Image.fromarray((a * 255).astype(np.uint8)))
            merged.append(img)
        cut = Image.merge("RGBA", (*im.split(), cut.getchannel("A")))  # colours always come from the photo itself (rembg blanks the colours it removes)
        a = cut.getchannel("A").filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.2))  # trim the light halo, soften the edge
        cut.putalpha(a)
        bbox = a.point(lambda v: 255 if v > 24 else 0).getbbox()
        if bbox:
            cut = cut.crop((0, bbox[1], cut.width, cut.height))  # drop empty space above the head
        cut.save(dst, "WEBP", quality=84, method=6)
        done += 1
    print(f"{done} cutouts made, {len(images)} photos in total")
    print("merged with the colour mask:", merged)
    print("turned upright (rotation tag):", turned)


if __name__ == "__main__":
    main()
