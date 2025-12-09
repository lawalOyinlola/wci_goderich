"use client";

import { FooterInfo } from "./FooterInfo";
import { FooterLinks } from "./FooterLinks";
import { FooterSocial } from "./FooterSocial";
import { FooterCopyright } from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="border-t bg-white pt-20 dark:bg-transparent">
      <div className="container px-6">
        {/* Top Footer */}
        <div className="grid gap-12 md:grid-cols-5">
          <FooterInfo />
          <FooterLinks />
        </div>
        {/* Bottom Footer */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <FooterCopyright />
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
