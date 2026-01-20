"use client";

import ComingSoon from "@/components/ComingSoon";
import { MapPinIcon } from "@phosphor-icons/react";

export default function LocationPage() {
  return (
    <ComingSoon
      title="Church Location"
      description="Find our church location and get directions. We're working on providing you with detailed location information, maps, parking details, and transportation options. This information will be available here soon."
      icon={<MapPinIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
