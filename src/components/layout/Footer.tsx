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
          <a href={tel(content?.contactPhone ?? "1800 425 9900")}>
            <Icon name="phone-footer" />
            {content?.contactPhone ?? "1800 425 9900"}
          </a>
        </FoldCol>
        <div className={styles.about}>
          <Image src={aboutLogo} alt="CDSIMER" width={237} height={95} className={styles.logo} unoptimized={isRemoteContentImage(aboutLogo)} />
          <RichText
            content={content?.aboutDescription ?? "Founded in the 1960s by Dr. Chandramma D. Sagar, the Sagar Group’s healthcare journey grew into a trusted institution under the leadership of Dr. D. Hemachandra Sagar and Dr. Premachandra Sagar."}
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
          <SmartLink href={content?.brochureAction.href ?? "/brochure"} className={styles.brochure}>
            <Icon name="download-btn" />
            {content?.brochureAction.label ?? "Download Brochure"}
          </SmartLink>
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
