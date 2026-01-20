"use client";

import ComingSoon from "@/components/ComingSoon";
import { HouseIcon } from "@phosphor-icons/react";

export default function WSFPage() {
  return (
    <ComingSoon
      title="Winners Satellite Fellowship"
      description="Connect with a small group near you for fellowship and Bible study. Our satellite fellowship program brings the church community closer to you. Find a fellowship group in your area and join us for intimate worship and study sessions."
      icon={<HouseIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
