"use client";

import Link from "next/link";
import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { CHURCH_INFO } from "@/lib/constants";

const iconMap = {
  XLogoIcon,
  LinkedinLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
} as const;

export function FooterSocial() {
  const { SOCIAL_LINKS } = CHURCH_INFO;

  return (
    <div className="order-first flex flex-wrap justify-center gap-4 text-sm md:order-last">
      {SOCIAL_LINKS.map((social, index) => {
        const IconComponent = iconMap[social.icon as keyof typeof iconMap];

        return (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="text-muted-foreground hover:text-primary block"
          >
            <IconComponent size={24} weight="duotone" />
          </Link>
        );
      })}
    </div>
  );
}
