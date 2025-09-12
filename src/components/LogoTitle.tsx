"use client";

import Image from "next/image";
import Link from "next/link";

export default function LogoTitle() {
  return (
    <Link
      href="/"
      aria-label="go home"
      className="size-fit flex items-center gap-2"
    >
      <div className="relative w-10 h-10">
        <Image
          src="/lfc_logo.png"
          alt="Living Faith Church Logo"
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      <div>
        <h6 className="font-bold text-sm font-lora leading-none">
          WCI Goderich
        </h6>
        <p className="text-xs font-open-sans text-muted-foreground font-normal">
          Living Faith Church
        </p>
      </div>
    </Link>
  );
}
