import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { admissionsMenu, external, navLeft, navRight, topLeft, topRight } from "@/data/nav";
import type { NavLink } from "@/data/nav";
import { HeaderDrop } from "./HeaderDrop";
import { HeaderScroll } from "./HeaderScroll";
import { MobileNav } from "./MobileNav";
import { fetchHeader } from "@/lib/api/global";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import styles from "./Header.module.scss";

/** Full-width Departments panel: one column per group, laid out by grid areas g0..gN. */
function MegaMenu({ item }: { item: NavLink }) {
  return (
    <div className={styles.mega}>
      <div className={styles.megaGrid}>
        {item.children!.map((g, i) => (
          <section key={g.label} className={styles.megaCol} style={{ gridArea: `g${i}` }}>
            <h3>
              <SmartLink href={g.href}>{g.label}</SmartLink>
            </h3>
            <ul className={g.twoCol ? styles.megaTwo : undefined}>
              {g.children?.map((c) => (
                <li key={c.label}>
                  <SmartLink href={c.href}>{c.label}</SmartLink>
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
  const hasKids = Boolean(item.children?.length);
  return (
    <div className={`${styles.item} ${item.mega ? styles.megaItem : ""}`}>
      <SmartLink href={item.href} className={styles.navLink}>
        {item.label}
        {hasKids && <Icon name="chevron-down" />}
      </SmartLink>
      {hasKids && (item.mega ? <MegaMenu item={item} /> : <HeaderDrop items={item.children!} />)}
    </div>
  );
}

function TopItem({ item }: { item: NavLink }) {
  if (!item.children?.length) {
    return (
      <li>
        <SmartLink href={item.href}>{item.label}</SmartLink>
      </li>
    );
  }
  return (
    <li className={`${styles.item} ${styles.topItem}`}>
      <SmartLink href={item.href} className={styles.topLink}>
        {item.label}
        <Icon name="chevron-down" />
      </SmartLink>
      <HeaderDrop items={item.children} />
    </li>
  );
}

export async function Header() {
  // Menus come from src/data/nav.ts (the beta site's structure: grouped dropdowns and the Departments
  // mega menu, which the CMS navigation fields cannot express). Logos, phone, ERP and the Admissions
  // label still come from the CMS when set.
  const content = await fetchHeader();
  const erp = content?.erpLink ?? { label: "ERP Login", href: external.erp };
  const admissions = content?.admissionsAction ?? { label: "Admissions", href: "/admissions", variant: "primary" as const };
  const logo = contentImageSrc(content?.cdsimerLogo ?? "/images/logo-cdsimer.png");
  const mobileItems: NavLink[] = [
    { label: "Home", href: "/" },
    ...navLeft,
    ...navRight,
    { label: admissions.label, href: admissions.href, children: admissionsMenu },
    ...topRight.filter((t) => t.href !== external.aebas && t.href !== external.hostel),
    ...topLeft,
    erp,
    ...topRight.filter((t) => t.href === external.aebas || t.href === external.hostel),
  ];
  return (
    <header className={styles.wrap} data-site-header>
      <HeaderScroll />
      <div className={styles.topbar}>
        <div className={styles.topInner}>
          <ul className={styles.topList}>
            {topLeft.map((t) => (
              <TopItem key={t.label} item={t} />
            ))}
          </ul>
          <ul className={styles.topList}>
            {topRight.map((t) => (
              <TopItem key={t.label} item={t} />
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
            {navLeft.map((n) => (
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
            {navRight.map((n) => (
              <NavItem key={n.label} item={n} />
            ))}
            <a href={content?.phoneHref || "tel:+916366885501"} className={styles.phone}>
              <Icon name="phone-header" /> {content?.phoneLabel ?? "6366 885 501"}
            </a>
            <div className={styles.item}>
              <Button
                href={admissions.href}
                variant={admissions.variant ?? "primary"}
                className={styles.admissions}
                width={170}
                icon={<Icon name="chevron-down" className={styles.btnChev} />}
              >
                {admissions.label}
              </Button>
              <HeaderDrop items={admissionsMenu} />
            </div>
          </nav>
          <MobileNav items={mobileItems} cta={admissions} />
        </div>
      </div>
    </header>
  );
}
