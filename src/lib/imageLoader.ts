// Used only when NEXT_PUBLIC_OPT_IMAGES=1 (beta server). Maps /images/x.jpg + width to the
// pre-generated /_opt/images/x-<width>.webp made by scripts/optimize-images.mjs.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("/images/")) return `/_opt${src.replace(/\.\w+$/, "")}-${width}.webp`;
  return src;
}
