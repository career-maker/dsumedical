"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Block } from "@/data/pages/types";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import styles from "./Blocks.module.scss";

type Profile = Extract<Block, { t: "profiles" }>["items"][number];

export function AdministrationCarousel({ items }: { items: Profile[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    const element = track.current;
    if (!element) return;
    setCanScrollPrevious(element.scrollLeft > 2);
    setCanScrollNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(element);
    return () => observer.disconnect();
  }, [items.length, updateControls]);

  const scroll = (direction: -1 | 1) => {
    const element = track.current;
    const firstItem = element?.firstElementChild;
    if (!element || !(firstItem instanceof HTMLElement)) return;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({ left: direction * (firstItem.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <>
      <ul ref={track} className={styles.profileTrack} tabIndex={0} aria-label="Scrollable list" onScroll={updateControls}>
        {items.map((profile, index) => (
          <li key={`${profile.name}-${index}`} className={styles.profileItem}>
            <figure className={styles.person}>
              <span className={styles.personPortrait}>
                {profile.image && (
                  <Image
                    src={contentImageSrc(profile.image)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 960px) 45vw, 300px"
                    unoptimized={isRemoteContentImage(profile.image)}
                  />
                )}
              </span>
              <figcaption>
                <h3>{profile.name}</h3>
                <p>{profile.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className={styles.profileControls}>
        <button type="button" aria-label="Previous" disabled={!canScrollPrevious} onClick={() => scroll(-1)} />
        <button type="button" aria-label="Next" className={styles.next} disabled={!canScrollNext} onClick={() => scroll(1)} />
      </div>
    </>
  );
}
