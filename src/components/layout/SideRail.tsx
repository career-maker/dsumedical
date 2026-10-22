import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { doc } from "@/data/pages/docs";
import { ShareMenu } from "./ShareMenu";
import styles from "./SideRail.module.scss";

// Every action opens its target directly: no intermediate pages.
const actions = [
  { icon: "download-side", label: "Download brochure", href: doc.brochure },
  { icon: "phone-side", label: "Call admissions", href: "tel:+916366885501" },
  { icon: "whatsapp", label: "Chat on WhatsApp", href: "https://wa.me/916366885501" },
  { icon: "play-side", label: "Watch our videos on YouTube", href: "https://www.youtube.com/@Dayanandasagaruniversityblr" },
] as const;

export function SideRail() {
  const newTab = (href: string) => href.startsWith("http") || href.startsWith("/docs/");
  return (
    <aside className={styles.rail} aria-label="Quick actions">
      <Link prefetch={false} href="/enquiry" className={styles.enquire}>
        <span>Enquire Now</span>
      </Link>
      <ul className={styles.panel}>
        {actions.map((a) => (
          <li key={a.label}>
            <a href={a.href} aria-label={a.label} {...(newTab(a.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Icon name={a.icon} />
            </a>
          </li>
        ))}
        <ShareMenu />
      </ul>
    </aside>
  );
}
