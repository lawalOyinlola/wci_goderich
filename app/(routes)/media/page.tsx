"use client";

import ComingSoon from "@/components/ComingSoon";
import { VideoCameraIcon } from "@phosphor-icons/react";

export default function MediaPage() {
  return (
    <ComingSoon
      title="Media Library"
      description="Watch recent sermons, live streams, and multimedia content. Our media library is coming soon with a collection of inspiring messages, worship sessions, and special events."
      icon={<VideoCameraIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
