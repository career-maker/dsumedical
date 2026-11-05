import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { external, navLeft, navRight, topLeft, topRight } from "@/data/nav";
import type { NavLink } from "@/data/nav";
import { HeaderScroll } from "./HeaderScroll";
import { MobileNav } from "./MobileNav";
import { fetchHeader } from "@/lib/api/global";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import styles from "./Header.module.scss";


function NavItem({ item }: { item: NavLink }) {
  return (
    <div className={styles.item}>
      <SmartLink href={item.href} className={styles.navLink}>
        {item.label}
        {item.children && <Icon name="chevron-down" />}
      </SmartLink>
      {item.children && (
        <ul className={styles.drop}>
          {item.children.map((c) => (
            <li key={c.label}>
              <SmartLink href={c.href}>{c.label}</SmartLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function Header() {
  const content = await fetchHeader();
  const currentNavLeft = content?.navLeft ?? navLeft;
  const currentNavRight = content?.navRight ?? navRight;
  const currentTopLeft = content?.topLeft ?? topLeft;
  const currentTopRight = content?.topRight ?? topRight;
  const erp = content?.erpLink ?? { label: "ERP Login", href: external.erp };
  const admissions = content?.admissionsAction ?? { label: "Admissions", href: "/admissions", variant: "primary" as const };
  const logo = contentImageSrc(content?.cdsimerLogo ?? "/images/logo-cdsimer.png");
  return (
    <header className={styles.wrap} data-site-header>
      <HeaderScroll />
      <div className={styles.topbar}>
        <div className={styles.topInner}>
          <ul className={styles.topList}>
            {currentTopLeft.map((t) => (
              <li key={t.label}>
                <SmartLink href={t.href}>{t.label}</SmartLink>
              </li>
            ))}
          </ul>
          <ul className={styles.topList}>
            {currentTopRight.map((t) => (
              <li key={t.label}>
                <SmartLink href={t.href}>{t.label}</SmartLink>
              </li>
            ))}
            <li>
              <SmartLink href={erp.href} className={styles.erp}>
                <Icon name="erp" /> {erp.label}
              </SmartLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <nav className={styles.navLeft} aria-label="Primary">
            <Link prefetch={false} href="/" aria-label="Home">
              <Icon name="home" />
            </Link>
            {currentNavLeft.map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
          </nav>
          <div className={styles.logos}>
            <SmartLink href={content?.universityHref || external.dsu} aria-label="Dayananda Sagar University">
              {content?.universityLogo ? (
                <Image src={contentImageSrc(content.universityLogo)} alt="Dayananda Sagar University" width={176} height={72} className={styles.dsu} unoptimized={isRemoteContentImage(content.universityLogo)} />
              ) : (
                <Icon name="dsu-lockup" className={styles.dsu} />
              )}
            </SmartLink>
            <Link prefetch={false} href="/" aria-label="CDSIMER home">
              <Image src={logo} alt="CDSIMER" width={183} height={73} preload unoptimized={isRemoteContentImage(logo)} />
            </Link>
          </div>
          <nav className={styles.navRight} aria-label="Secondary">
            {currentNavRight.map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
            <a href={content?.phoneHref || "tel:+916366885501"} className={styles.phone}>
              <Icon name="phone-header" /> {content?.phoneLabel ?? "6366 885 501"}
            </a>
            <Button href={admissions.href} variant={admissions.variant ?? "primary"} className={styles.admissions} width={170}>
              {admissions.label}
            </Button>
          </nav>
          <MobileNav items={[...currentNavLeft, ...currentNavRight, ...currentTopRight.slice(1, 3), ...currentTopLeft.slice(0, 1)]} cta={admissions} />
        </div>
      </div>
    </header>
  );
}
