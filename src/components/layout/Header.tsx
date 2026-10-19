import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { external, navLeft, navRight, topLeft, topRight } from "@/data/nav";
import type { NavLink } from "@/data/nav";
import { HeaderScroll } from "./HeaderScroll";
import { MobileNav } from "./MobileNav";
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

export function Header() {
  return (
    <header className={styles.wrap} data-site-header>
      <HeaderScroll />
      <div className={styles.topbar}>
        <div className={styles.topInner}>
          <ul className={styles.topList}>
            {topLeft.map((t) => (
              <li key={t.label}>
                <SmartLink href={t.href}>{t.label}</SmartLink>
              </li>
            ))}
          </ul>
          <ul className={styles.topList}>
            {topRight.map((t) => (
              <li key={t.label}>
                <SmartLink href={t.href}>{t.label}</SmartLink>
              </li>
            ))}
            <li>
              <SmartLink href={external.erp} className={styles.erp}>
                <Icon name="erp" /> ERP Login
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
            {navLeft.map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
          </nav>
          <div className={styles.logos}>
            <SmartLink href={external.dsu} aria-label="Dayananda Sagar University">
              <Icon name="dsu-lockup" className={styles.dsu} />
            </SmartLink>
            <Link prefetch={false} href="/" aria-label="CDSIMER home">
              <Image src="/images/logo-cdsimer.png" alt="CDSIMER" width={183} height={73} preload />
            </Link>
          </div>
          <nav className={styles.navRight} aria-label="Secondary">
            {navRight.map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
            <a href="tel:+916366885501" className={styles.phone}>
              <Icon name="phone-header" /> 6366 885 501
            </a>
            <Button href="/admissions" variant="primary" className={styles.admissions} width={170}>
              Admissions
            </Button>
          </nav>
          <MobileNav items={[...navLeft, ...navRight, ...topRight.slice(1, 3), ...topLeft.slice(0, 1)]} cta={{ label: "Admissions", href: "/admissions" }} />
        </div>
      </div>
    </header>
  );
}
