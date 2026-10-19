import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/data/photos";
import styles from "./Photo.module.scss";

type PhotoProps = {
  name: keyof typeof photos | (string & {});
  alt: string;
  /** File under /images (defaults to `${name}.jpg`). */
  src?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Skip the exact crop and use CSS cover instead (for images the PDF crops with a mask). */
  cover?: boolean;
  /** CSS object-position used with `cover`. */
  position?: string;
};

/** Renders an image at the exact crop and scale used in the design, scaling fluidly with its box. */
export function Photo({ name, alt, src, sizes, priority, className, cover, position }: PhotoProps) {
  const place = photos[name];
  const [cx, cy, cw, ch] = place.clip;
  const [ix, iy, iw, ih] = place.img;
  const file = src ?? `/images/${name}.jpg`;
  return (
    <div
      className={`${styles.frame} ${className ?? ""}`}
      style={{ aspectRatio: `${cw} / ${ch}`, "--w": `calc(${cw} * var(--u))` } as CSSProperties}
    >
      {cover ? (
        <Image src={file} alt={alt} fill sizes={sizes} preload={priority} style={{ objectFit: "cover", objectPosition: position }} />
      ) : (
        <Image
          src={file}
          alt={alt}
          width={Math.round(iw)}
          height={Math.round(ih)}
          sizes={sizes}
          preload={priority}
          className={styles.img}
          style={{
            left: `${((ix - cx) / cw) * 100}%`,
            top: `${((iy - cy) / ch) * 100}%`,
            width: `${(iw / cw) * 100}%`,
            height: `${(ih / ch) * 100}%`,
          }}
        />
      )}
    </div>
  );
}
