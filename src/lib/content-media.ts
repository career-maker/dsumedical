export function contentImageSrc(src: string) {
  return /^https?:\/\//i.test(src) || src.startsWith("/") ? src : `/images/${src}`;
}

export function isRemoteContentImage(src: string) {
  return /^https?:\/\//i.test(src);
}
