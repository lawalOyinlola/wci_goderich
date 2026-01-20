"use client";

import ComingSoon from "@/components/ComingSoon";
import { ClockIcon } from "@phosphor-icons/react";

export default function ServicesPage() {
  return (
    <ComingSoon
      title="Church Services"
      description="Join us for our weekly services and worship with us. Service times and schedules will be available here soon, along with information about our different service formats and special programs."
      icon={<ClockIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
