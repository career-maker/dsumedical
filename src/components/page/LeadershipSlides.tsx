"use client";

import Image from "next/image";
import { useState } from "react";
import type { RichTextContent } from "@/data/pages/types";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import { RichText } from "./RichText";
import styles from "./LeadershipSlides.module.scss";

type Leader = {
  name: string;
  role: string;
  text?: RichTextContent;
  image?: string;
};

export function LeadershipSlides({ title, items }: { title: string; items: Leader[] }) {
  const [active, setActive] = useState(0);
  const select = (index: number) => setActive((index + items.length) % items.length);

  if (items.length === 0) return null;

  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <h2>{title}</h2>
        </header>
        <div role="region" aria-roledescription="carousel" aria-label="Message from the leadership">
          <div className={styles.stage} aria-live="polite">
            {items.map((leader, index) => (
              <article
                key={`${leader.name}-${index}`}
                className={`${styles.slide} ${index === active ? styles.on : ""}`}
                aria-hidden={index !== active}
                inert={index !== active}
              >
                <div className={styles.copy}>
                  <h3>{leader.name}{leader.role ? `, ${leader.role}` : ""}</h3>
                  <RichText content={leader.text} />
                </div>
                {leader.image && (
                  <div className={styles.photo}>
                    <Image
                      src={contentImageSrc(leader.image)}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 960px) 80vw, 440px"
                      unoptimized={isRemoteContentImage(leader.image)}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
          {items.length > 1 && (
            <div className={styles.controls}>
              <button type="button" aria-label="Previous message" onClick={() => select(active - 1)} />
              <div className={styles.dots}>
                {items.map((leader, index) => (
                  <button
                    key={`${leader.name}-dot`}
                    type="button"
                    aria-label={`Show message ${index + 1}`}
                    aria-current={index === active}
                    className={index === active ? styles.active : ""}
                    onClick={() => select(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label="Next message" className={styles.next} onClick={() => select(active + 1)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
