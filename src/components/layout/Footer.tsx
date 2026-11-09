import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/iconMeta";
import { fetchFooter } from "@/lib/api/global";
import { contentImageSrc, isRemoteContentImage } from "@/lib/content-media";
import { SmartLink } from "@/components/ui/SmartLink";
import { RichText } from "@/components/page/RichText";
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

export async function Footer() {
  const content = await fetchFooter();
  const links = content?.quickLinks ?? quickLinks;
  const departmentItems = content?.departmentLinks ?? departments.map((label) => ({ label, href: "/department" }));
  const aboutLogo = contentImageSrc(content?.aboutLogo ?? "/images/logo-cdsimer-footer.png");
  const helplinePhone = content?.helplinePhone ?? "+91 6366885501";
  const tel = (phone: string) => phone.startsWith("tel:") ? phone : `tel:${phone.replace(/[\s()-]/g, "")}`;
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <FoldCol as="nav" className={styles.col1} id="footer-quick" title="Quick Links">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href}>{l.label}</SmartLink>
              </li>
            ))}
          </ul>
        </FoldCol>
        <FoldCol as="nav" className={styles.col2} id="footer-dept" title="Departments">
          <ul>
            {departmentItems.map((d) => (
              <li key={d.label}>
                <SmartLink href={d.href}>{d.label}</SmartLink>
              </li>
            ))}
          </ul>
        </FoldCol>
        <FoldCol as="address" className={styles.col3} id="footer-contact" title="Contact Us">
          {content?.contactName ? (
            <RichText content={content.contactName} className={styles.name} />
          ) : (
            <p className={styles.name}>
              Dr. Chandramma Dayananda Sagar<br />Institute of Medical Education &amp; Research
            </p>
          )}
          <a href={`mailto:${content?.contactEmail ?? "admissions.cdsimer@dsu.edu.in"}`}>
            <Icon name="mail" />
            {content?.contactEmail ?? "admissions.cdsimer@dsu.edu.in"}
          </a>
          <a href={content?.contactPhone ? tel(content.contactPhone) : "tel:+916366885501"}>
            <Icon name="phone-footer" />
            {content?.contactPhone ?? "Student Admission Enquiry: 6366 885 501"}
          </a>
          <a href="tel:08026086500">
            <Icon name="phone-footer" />
            Hospital Enquiry: 080 2608 6500
          </a>
          <p className={styles.kea}>KEA (CET) CODE: M083</p>
        </FoldCol>
        <div className={styles.about}>
          <Image src={aboutLogo} alt="CDSIMER" width={237} height={95} className={styles.logo} unoptimized={isRemoteContentImage(aboutLogo)} />
          <RichText
            content={content?.aboutDescription ?? "Founded in the 1960s by Dr. Chandramma D. Sagar, the Sagar Group’s healthcare journey grew into a trusted institution under the leadership of Dr. D. Hemachandra Sagar and Dr. D. Premachandra Sagar."}
          />
        </div>

        <div className={styles.helpline}>
          <Icon name="headset" />
          <span className={styles.helpTitle}>{content?.helplineTitle ?? "Admissions Helpline"}</span>
          <a href={tel(helplinePhone)} className={styles.helpPhone}>
            <Icon name="phone-btn" />
            {helplinePhone}
          </a>
          <ul className={styles.socials}>
            {(content?.socials ?? socials).map((s) => (
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
          <p>{content?.copyright ?? "© 2026 DSU. All Rights Reserved."}</p>
          <p className={styles.policies}>
            <SmartLink href={content?.privacyAction.href ?? "/privacy"}>{content?.privacyAction.label ?? "Privacy Policy"}</SmartLink>
            <span aria-hidden="true">|</span>
            <SmartLink href={content?.termsAction.href ?? "/terms"}>{content?.termsAction.label ?? "Terms&Conditions"}</SmartLink>
          </p>
          <p className={styles.credit}>
            {content?.designerName ?? "Designed By:"}{" "}
            <a href={content?.designerHref ?? "https://www.intersmartsolution.com/"} target="_blank" rel="noopener noreferrer" aria-label={content?.designerName ?? "Intersmart Solution"}>
              <Icon name="intersmart" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
