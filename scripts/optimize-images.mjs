// Pre-generates resized WebP copies of public/images into public/_opt/ (run by deploy.sh).
// Needed because the beta server's old glibc can't load `sharp`, so Next's runtime optimiser can't resize.
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

// Every width the browser can ask for: next.config deviceSizes + Next default imageSizes.
const WIDTHS = [32, 48, 64, 96, 128, 256, 360, 384, 480, 640, 768, 1024, 1280, 1536, 1920];
const src = "public/images";
const out = "public/_opt/images";
await mkdir(out, { recursive: true });

let n = 0;
// Recurse so subfolders (e.g. images/dept/<slug>/) get the same /_opt mirror the image loader expects.
for (const f of await readdir(src, { recursive: true })) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const base = f.replace(/\.\w+$/, "");
  const from = path.join(src, f);
  await mkdir(path.dirname(path.join(out, base)), { recursive: true });
  // Skip images whose largest variant is already newer than the source.
  const last = await stat(path.join(out, `${base}-${WIDTHS.at(-1)}.webp`)).catch(() => null);
  if (last && last.mtimeMs > (await stat(from)).mtimeMs) continue;
  const meta = await sharp(from).metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width); // never upscale; smaller sources reuse their natural size
    await sharp(from).resize({ width }).webp({ quality: w >= 1024 ? 50 : 62, effort: 6 }).toFile(path.join(out, `${base}-${w}.webp`));
    n++;
  }
}
console.log(`optimised ${n} files into ${out}`);
