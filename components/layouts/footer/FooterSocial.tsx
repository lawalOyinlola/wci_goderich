"use client";

import Link from "next/link";
import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

export function FooterSocial() {
  return (
    <div className="order-first flex flex-wrap justify-center gap-4 text-sm md:order-last">
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X/Twitter"
        className="text-muted-foreground hover:text-primary block"
      >
        <XLogoIcon size={24} weight="duotone" />
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-muted-foreground hover:text-primary block"
      >
        <LinkedinLogoIcon size={24} weight="duotone" />
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="text-muted-foreground hover:text-primary block"
      >
        <FacebookLogoIcon size={24} weight="duotone" />
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Threads"
        className="text-muted-foreground hover:text-primary block"
      >
        <TiktokLogoIcon size={24} weight="duotone" />
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-muted-foreground hover:text-primary block"
      >
        <YoutubeLogoIcon size={24} weight="duotone" />
      </Link>
    </div>
  );
}

