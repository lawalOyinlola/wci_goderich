"use client";

import ComingSoon from "@/components/ComingSoon";
import { UsersIcon } from "@phosphor-icons/react";

export default function ServiceUnitsPage() {
  return (
    <ComingSoon
      title="Service Units"
      description="Find a unit to serve and grow your faith. Discover various service opportunities where you can contribute your talents and gifts to the ministry. Information about all available service units will be available here soon."
      icon={<UsersIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
