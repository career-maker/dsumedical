import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/iconMeta";
import { FoldCol } from "./FoldCol";
import styles from "./Footer.module.scss";

const quickLinks = [
  { label: "Academics", href: "/programs" },
  { label: "Hospital", href: "/hospital" },
  { label: "Research", href: "/research" },
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

const departments = ["Pre clinical", "Para clinical", "Clinical", "Super Speciality", "Others"];

// Official profiles, as linked from cdsimer.edu.in.
const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "fb", label: "Facebook", href: "https://www.facebook.com/Cdsimer-103453821618631" },
  { icon: "x", label: "X (Twitter)", href: "https://twitter.com/CDSIMER_DSU" },
  { icon: "ig", label: "Instagram", href: "https://www.instagram.com/cdsimerblr/" },
  { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/in/cd-simer-839531200/" },
  { icon: "yt", label: "YouTube", href: "https://www.youtube.com/channel/UCaM-Ha3YDgcH203jPh0iReQ" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <FoldCol as="nav" className={styles.col1} id="footer-quick" title="Quick Links">
          <ul>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link prefetch={false} href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </FoldCol>
        <FoldCol as="nav" className={styles.col2} id="footer-dept" title="Departments">
          <ul>
            {departments.map((d) => (
              <li key={d}>
                <Link prefetch={false} href="/department">{d}</Link>
              </li>
            ))}
          </ul>
        </FoldCol>
        <FoldCol as="address" className={styles.col3} id="footer-contact" title="Contact Us">
          <p className={styles.name}>
            Dr. Chandramma Dayananda Sagar
            <br />
            Institute of Medical Education &amp; Research
          </p>
          <a href="mailto:admissions.cdsimer@dsu.edu.in">
            <Icon name="mail" />
            admissions.cdsimer@dsu.edu.in
          </a>
          <a href="tel:+916366885501">
            <Icon name="phone-footer" />
            Student Admission Enquiry: 6366 885 501
          </a>
          <a href="tel:08026086500">
            <Icon name="phone-footer" />
            Hospital Enquiry: 080 2608 6500
          </a>
          <p className={styles.kea}>KEA (CET) CODE: M083</p>
        </FoldCol>
        <div className={styles.about}>
          <Image src="/images/logo-cdsimer-footer.png" alt="CDSIMER" width={237} height={95} className={styles.logo} />
          <p>
            Founded in the 1960s by Dr. Chandramma D. Sagar, the Sagar Group’s healthcare journey grew into a trusted
            institution under the leadership of Dr. D. Hemachandra Sagar and Dr. D. Premachandra Sagar.
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
                  <Icon name={s.icon} className={styles.soc} />
                  <Icon name={`${s.icon}-r` as IconName} className={styles.socHover} />
                </a>
              </li>
            ))}
          </ul>
          <Icon name="dsu-lockup" size={176} className={styles.dsu} />
        </div>

        <div className={styles.legal}>
          <p>© 2026 DSU. All Rights Reserved.</p>
          <p className={styles.policies}>
            <Link prefetch={false} href="#">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link prefetch={false} href="#">Terms&amp;Conditions</Link>
          </p>
          <p className={styles.credit}>
            Designed By:{" "}
            <a href="https://www.intersmartsolution.com/" target="_blank" rel="noopener noreferrer" aria-label="Intersmart Solution">
              <Icon name="intersmart" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
