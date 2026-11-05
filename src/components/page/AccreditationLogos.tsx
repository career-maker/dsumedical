import Image from "next/image";
import type { Block } from "@/data/pages/types";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./AccreditationLogos.module.scss";

type LogoItem = Extract<Block, { t: "logos" }>["items"][number];

function Logo({ item }: { item: LogoItem }) {
  const content = (
    <>
      <span className={styles.logo}>
        {item.image ? (
          <Image
            src={contentImageSrc(item.image)}
            alt=""
            fill
            sizes="(max-width: 640px) 70vw, 300px"
            unoptimized={isRemoteContentImage(item.image)}
          />
        ) : null}
      </span>
      {item.href && <span className={styles.more}>Learn more <span aria-hidden="true">→</span></span>}
    </>
  );

  return item.href ? (
    <li>
      <SmartLink href={item.href} className={styles.item}>{content}</SmartLink>
    </li>
  ) : (
    <li>
      <div className={styles.item}>{content}</div>
    </li>
  );
}

export function AccreditationLogos({ items }: { items: LogoItem[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => <Logo key={`${item.image ?? item.href ?? "logo"}-${index}`} item={item} />)}
    </ul>
  );
}

export function legacyAccreditationLogos(items: Extract<Block, { t: "cards" }>["items"]): LogoItem[] {
  return items.flatMap(({ image, href }) => image ? [{ image, href }] : []);
}
