import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { community } from "@/data/community";
import styles from "./Community.module.scss";

export function Community() {
  return (
    <section className={styles.section} aria-labelledby="community-title">
      <Image src="/images/community-bg.jpg" alt="" width={1920} height={1280} className={styles.bg} />
      <div className={styles.inner}>
        <ul className={styles.collage}>
          {community.photos.map((p, i) => (
            <li key={p.photo} className={styles[`p${i + 1}`]}>
              <Photo name={p.photo} alt={p.alt} sizes="394px" className={styles.photo} />
            </li>
          ))}
        </ul>
        <div className={styles.bar}>
          <p>Committed to improving public health through accessible, compassionate, and community-focused healthcare services</p>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.follow}>
            <Icon name="instagram" />
            Follow Us
          </Link>
        </div>

        <h2 id="community-title" className={styles.title}>
          CDSIMER Community
        </h2>
        <p className={styles.tagline}>Serving Communities Beyond Campus</p>
        <p className={styles.intro}>{community.intro}</p>
        <ul className={styles.items}>
          {community.items.map((it) => (
            <li key={it.strong}>
              <span className={styles.circle}>
                <Icon name={it.icon} />
              </span>
              <span>
                <b>{it.strong}</b>
                {it.inline}
                <br />
                {it.rest}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
