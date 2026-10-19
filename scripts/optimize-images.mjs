// Pre-generates resized WebP copies of public/images into public/_opt/ (run by deploy.sh).
// Needed because the beta server's old glibc can't load `sharp`, so Next's runtime optimiser can't resize.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

// Every width the browser can ask for: next.config deviceSizes + Next default imageSizes.
const WIDTHS = [32, 48, 64, 96, 128, 256, 360, 384, 480, 640, 768, 1024, 1280, 1536, 1920];
const src = "public/images";
const out = "public/_opt/images";
await mkdir(out, { recursive: true });

let n = 0;
for (const f of await readdir(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const base = f.replace(/\.\w+$/, "");
  const meta = await sharp(path.join(src, f)).metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width); // never upscale; smaller sources reuse their natural size
    await sharp(path.join(src, f)).resize({ width }).webp({ quality: 74, effort: 5 }).toFile(path.join(out, `${base}-${w}.webp`));
    n++;
  }
}
console.log(`optimised ${n} files into ${out}`);
