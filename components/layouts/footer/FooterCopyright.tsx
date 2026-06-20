"use client";

import { useEffect, useState } from "react";
import {
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  type Icon,
} from "@phosphor-icons/react";
import { AUTHOR, AUTHOR_SOCIAL_LINKS } from "@/lib/constants/site";

const AUTHOR_SOCIAL_ICONS: Record<string, Icon> = {
  Portfolio: GlobeIcon,
  GitHub: GithubLogoIcon,
  LinkedIn: LinkedinLogoIcon,
  X: XLogoIcon,
};

export function FooterCopyright() {
  const [year, setYear] = useState<number>(2026); // Default fallback year

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <span className="text-muted-foreground order-last flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm md:order-first">
      <span>
        &copy; {year} WCI Goderich. All rights reserved. | Developed by{" "}
        <a
          href={AUTHOR.url}
          target="_blank"
          rel="noopener noreferrer me author"
          className="font-semibold hover:underline transition-colors"
        >
          {AUTHOR.shortName}
        </a>
      </span>
    </span>
  );
}
