import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import styles from "./SideRail.module.scss";

const actions = [
  { icon: "download-side", label: "Download brochure", href: "/brochure" },
  { icon: "phone-side", label: "Call admissions", href: "tel:+916366885501" },
  { icon: "whatsapp", label: "Chat on WhatsApp", href: "https://wa.me/916366885501" },
  { icon: "play-side", label: "Watch campus video", href: "/campus-tour" },
  { icon: "share-side", label: "Share", href: "/share" },
] as const;

export function SideRail() {
  const external = (href: string) => href.startsWith("http");
  return (
    <aside className={styles.rail} aria-label="Quick actions">
      <Link href="/enquiry" className={styles.enquire}>
        <span>Enquire Now</span>
      </Link>
      <ul className={styles.panel}>
        {actions.map((a) => (
          <li key={a.label}>
            {external(a.href) ? (
              <a href={a.href} aria-label={a.label} target="_blank" rel="noopener noreferrer">
                <Icon name={a.icon} />
              </a>
            ) : (
              <Link href={a.href} aria-label={a.label}>
                <Icon name={a.icon} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
