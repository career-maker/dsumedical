import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/iconMeta";
import styles from "./Footer.module.scss";

const quickLinks = [
  { label: "Academics", href: "/programs" },
  { label: "Hospital", href: "/hospital" },
  { label: "Research", href: "/research" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

const departments = ["Pre clinical", "Para clinical", "Clinical", "Super Speciality"];

// Social profile URLs were not supplied with the design; these point to each network's root until confirmed.
const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "fb", label: "Facebook", href: "https://www.facebook.com/" },
  { icon: "x", label: "X (Twitter)", href: "https://x.com/" },
  { icon: "ig", label: "Instagram", href: "https://www.instagram.com/" },
  { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: "yt", label: "YouTube", href: "https://www.youtube.com/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.col1} aria-labelledby="footer-quick">
          <h2 id="footer-quick">Quick Links</h2>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.col2} aria-labelledby="footer-dept">
          <h2 id="footer-dept">Departments</h2>
          <ul>
            {departments.map((d) => (
              <li key={d}>
                <Link href="/department">{d}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className={styles.col3}>
          <h2>Contact Us</h2>
          <p className={styles.name}>
            Dr. Chandramma Dayananda Sagar
            <br />
            Institute of Medical Education &amp; Research
          </p>
          <a href="mailto:admissions.cdsimer@dsu.edu.in">
            <Icon name="mail" />
            admissions.cdsimer@dsu.edu.in
          </a>
          <a href="tel:18004259900">
            <Icon name="phone-footer" />
            1800 425 9900
          </a>
        </address>
        <div className={styles.about}>
          <Image src="/images/logo-cdsimer-footer.png" alt="CDSIMER" width={237} height={95} className={styles.logo} />
          <p>
            Founded in the 1960s by Dr. Chandramma D. Sagar, the Sagar Group’s healthcare journey grew into a trusted
            institution under the leadership of Dr. D. Hemachandra Sagar and Dr. Premachandra Sagar.
          </p>
        </div>

        <div className={styles.helpline}>
          <Icon name="headset" />
          <span className={styles.helpTitle}>Admissions Helpline</span>
          <a href="tel:+916366885501" className={styles.helpPhone}>
            <Icon name="phone-btn" />
            +91 6366885501
          </a>
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
          <Icon name="dsu-lockup" size={176} className={styles.dsu} />
          <Link href="/brochure" className={styles.brochure}>
            <Icon name="download-btn" />
            Download Brochure
          </Link>
        </div>

        <div className={styles.legal}>
          <p>© 2026 DSU. All Rights Reserved.</p>
          <p className={styles.policies}>
            <Link href="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms">Terms&amp;Conditions</Link>
          </p>
          <p className={styles.credit}>
            Designed By: <Icon name="intersmart" />
          </p>
        </div>
      </div>
    </footer>
  );
}
