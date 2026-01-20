"use client";

import ComingSoon from "@/components/ComingSoon";
import { CalendarIcon } from "@phosphor-icons/react";

export default function EventsPage() {
  return (
    <ComingSoon
      title="Upcoming Events"
      description="Discover upcoming events, conferences, and special programs. Stay connected with our church calendar featuring worship nights, conferences, community outreach events, and special celebrations. All event details will be available here soon."
      icon={<CalendarIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
