"use client";

import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import LogoTitle from "@/components/LogoTitle";
import { FooterNewsletter } from "./FooterNewsletter";

export function FooterInfo() {
  return (
    <div className="md:col-span-2 flex flex-col gap-4">
      <LogoTitle />
      <p className="px-2 text-sm leading-relaxed">
        Spreading the Gospel and transforming lives in Sierra Leone and
        beyond. Join us in our mission to share God&apos;s love with
        everyone.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPinIcon size={18} color="var(--primary)" weight="duotone" />
          <span>Main Street, Goderich, Western Area</span>
        </div>

        <div className="flex items-center gap-2">
          <PhoneIcon size={18} color="var(--primary)" weight="duotone" />
          <span>+232 88 123 456</span>
        </div>

        <div className="flex items-center gap-2">
          <EnvelopeIcon
            size={18}
            color="var(--primary)"
            weight="duotone"
          />
          <span>info@wcigoderich.org</span>
        </div>
      </div>
      <FooterNewsletter />
    </div>
  );
}

