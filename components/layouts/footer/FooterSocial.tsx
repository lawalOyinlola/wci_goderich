import Link from "next/link";
import { IconComponent } from "@/components/IconComponent";
import { CHURCH_INFO } from "@/lib/constants";

export function FooterSocial() {
  const { SOCIAL_LINKS } = CHURCH_INFO;

  return (
    <div className="order-first flex flex-wrap justify-center gap-4 text-sm md:order-last">
      {SOCIAL_LINKS.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="group/social flex items-center justify-center p-2.5 min-h-11 min-w-11"
        >
          <IconComponent
            iconName={social.icon}
            size={24}
            className="text-muted-foreground group-hover/social:text-primary"
          />
        </Link>
      ))}
    </div>
  );
}
