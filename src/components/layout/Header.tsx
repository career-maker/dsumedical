import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.scss";

const topLeft = ["Info under MSR Clause B.1.11", "NMC"];
const topRight = ["Hostel", "University Examination", "Career", "AEBAS Dashboard"];
const navLeft = [
  { label: "Programs", href: "/programs", chevron: true },
  { label: "Hospital", href: "/hospital" },
  { label: "Department", href: "/department" },
  { label: "Research", href: "/research" },
];
const navRight = [
  { label: "University", href: "/university" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className={styles.wrap}>
      <div className={styles.topbar}>
        <div className={styles.topInner}>
          <ul className={styles.topList}>
            {topLeft.map((t) => (
              <li key={t}>
                <Link href="/">{t}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.topList}>
            {topRight.map((t) => (
              <li key={t}>
                <Link href="/">{t}</Link>
              </li>
            ))}
            <li>
              <Link href="/" className={styles.erp}>
                <Icon name="erp" /> ERP Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <nav className={styles.navLeft} aria-label="Primary">
            <Link href="/" aria-label="Home">
              <Icon name="home" />
            </Link>
            {navLeft.map((n) => (
              <Link key={n.label} href={n.href} className={styles.navLink}>
                {n.label}
                {n.chevron && <Icon name="chevron-down" />}
              </Link>
            ))}
          </nav>
          <Link href="/" className={styles.logos} aria-label="Dayananda Sagar University and CDSIMER">
            <Icon name="dsu-lockup" className={styles.dsu} />
            <Image src="/images/logo-cdsimer.png" alt="CDSIMER" width={183} height={73} priority />
          </Link>
          <nav className={styles.navRight} aria-label="Secondary">
            {navRight.map((n) => (
              <Link key={n.label} href={n.href} className={styles.navLink}>
                {n.label}
              </Link>
            ))}
            <a href="tel:+916366885501" className={styles.phone}>
              <Icon name="phone-header" /> 6366 885 501
            </a>
            <Button href="/admissions" variant="primary" className={styles.admissions} width={170}>
              Admissions
            </Button>
          </nav>
          <MobileNav items={[...navLeft, ...navRight]} cta={{ label: "Admissions", href: "/admissions" }} />
        </div>
      </div>
    </header>
  );
}
