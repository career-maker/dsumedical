import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { external, mobileMenu, navAdmissions, navLeft, navRight, topEnquiry, topErp, topLeft, topRight } from "@/data/nav";
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
            <li className={`${styles.item} ${styles.topItem}`}>
              <SmartLink href={topEnquiry.href} className={styles.topLink}>
                <Icon name="phone-header" className={styles.phoneIcon} />
                {topEnquiry.label}
                <Icon name="chevron-down" />
              </SmartLink>
              <NavDrop items={topEnquiry.children ?? []} />
            </li>
          </ul>
          <ul className={styles.topList}>
            {topRight.map((t) => (
              <li key={t.label} className={t.children ? `${styles.item} ${styles.topItem}` : undefined}>
                <SmartLink href={t.href} className={t.children ? styles.topLink : undefined}>
                  {t.label}
                  {t.children && <Icon name="chevron-down" />}
                </SmartLink>
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
          <div className={styles.logoL}>
            <SmartLink href={external.dsu} aria-label="Dayananda Sagar University">
              <Icon name="dsu-lockup" className={styles.dsu} />
            </SmartLink>
          </div>
          <nav className={styles.nav} aria-label="Primary">
            <Link prefetch={false} href="/" aria-label="Home">
              <Icon name="home" />
            </Link>
            {[...navLeft, ...navRight].map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
            <div className={`${styles.item} ${styles.edge}`}>
              <Button href="/admissions" variant="primary" className={styles.admissions} width={170} icon={<Icon name="chevron-down" className={styles.btnChev} />}>
                Admissions
              </Button>
              <NavDrop items={navAdmissions.children ?? []} />
            </div>
          </nav>
          <div className={styles.logoR}>
            <Link prefetch={false} href="/" aria-label="CDSIMER home">
              <Image src="/images/logo-cdsimer.png" alt="CDSIMER" width={183} height={73} preload />
            </Link>
          </div>
          <MobileNav items={mobileMenu} cta={{ label: "Admissions", href: "/admissions" }} />
        </div>
      </div>
    </header>
  );
}
