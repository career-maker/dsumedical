import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { external, mobileMenu, navAdmissions, navLeft, navRight, topErp, topLeft, topRight } from "@/data/nav";
import type { NavLink } from "@/data/nav";
import { HeaderScroll } from "./HeaderScroll";
import { NavDrop } from "./NavDrop";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.scss";


function Mega({ item }: { item: NavLink }) {
  return (
    <div className={styles.mega}>
      <div className={styles.megaGrid}>
        {(item.children ?? []).map((g, i) => (
          <section key={g.label} className={styles.megaCol} style={{ gridArea: `g${i}` }}>
            <h3>
              <SmartLink href={g.href}>{g.label}</SmartLink>
            </h3>
            <ul className={g.children && g.children.length > 8 ? styles.megaTwo : undefined}>
              {(g.children ?? []).map((l) => (
                <li key={l.label}>
                  <SmartLink href={l.href}>{l.label}</SmartLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <SmartLink href={item.href} className={styles.megaAll}>
        View all departments
      </SmartLink>
    </div>
  );
}

function NavItem({ item }: { item: NavLink }) {
  return (
    <div className={`${styles.item} ${item.mega ? styles.megaItem : ""}`}>
      <SmartLink href={item.href} className={styles.navLink}>
        {item.label}
        {item.children && <Icon name="chevron-down" />}
      </SmartLink>
      {item.children && (item.mega ? <Mega item={item} /> : <NavDrop items={item.children} />)}
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
              <li key={t.label} className={t.children ? `${styles.item} ${styles.topItem}` : undefined}>
                <SmartLink href={t.href}>{t.label}</SmartLink>
                {t.children && <NavDrop items={t.children} />}
              </li>
            ))}
            <li>
              <SmartLink href={topErp.href} className={styles.erp}>
                <Icon name="erp" /> {topErp.label}
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
            <div className={styles.item}>
              <Button href="/admissions" variant="primary" className={styles.admissions} width={170}>
                Admissions
              </Button>
              <NavDrop items={navAdmissions.children ?? []} />
            </div>
          </nav>
          <MobileNav items={mobileMenu} cta={{ label: "Admissions", href: "/admissions" }} />
        </div>
      </div>
    </header>
  );
}
