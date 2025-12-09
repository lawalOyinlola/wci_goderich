"use client";

import Link from "next/link";
import type { Route } from "next";
import { CaretDoubleRightIcon } from "@phosphor-icons/react";
import { FOOTER_LINKS } from "./footerItems";

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
      {FOOTER_LINKS.map((link, index) => (
        <div key={index} className="space-y-4 text-sm">
          <span className="block font-medium">{link.group}</span>
          {link.items.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              href={item.href as Route}
              className="group text-muted-foreground hover:text-primary flex items-center gap-1 duration-150"
            >
              <span>{item.title}</span>
              <CaretDoubleRightIcon className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-150" />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
