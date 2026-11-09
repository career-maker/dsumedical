"use client";

import { useState } from "react";
import styles from "./VideoFrame.module.scss";

/** YouTube poster with a play button; the player (privacy-enhanced domain) loads only after the click. */
export function VideoFrame({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing)
    return (
      <iframe
        className={styles.frame}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  return (
    <button type="button" className={styles.poster} onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className={styles.play} aria-hidden="true" />
    </button>
  );
}
