import { iconMeta, type IconName } from "@/data/iconMeta";

type IconProps = {
  name: IconName;
  /** Overrides the design width (px); height scales with the aspect ratio. */
  size?: number;
  className?: string;
  flip?: boolean;
};

export function Icon({ name, size, className, flip }: IconProps) {
  const { w, h } = iconMeta[name];
  const width = size ?? w;
  const height = size ? (h * size) / w : h;
  // Plain <img>: these are small pre-sized PNGs, so the optimizer adds nothing, and next/image's dev
  // check warns whenever a fluid (calc) width rounds differently from the intrinsic width attribute.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.png`}
      alt=""
      width={Math.round(width)}
      height={Math.round(height)}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ width: `calc(${width} * var(--u))`, height: "auto", ...(flip ? { transform: "scaleX(-1)" } : {}) }}
      aria-hidden="true"
    />
  );
}

/** Four-dot "sparkle" glyph used inside every call-to-action button. */
export function Dots({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill={color}>
      <circle cx="9" cy="3" r="1.6" />
      <circle cx="3.5" cy="9" r="1.6" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="14.5" cy="9" r="1.6" />
      <circle cx="9" cy="15" r="1.6" />
    </svg>
  );
}
