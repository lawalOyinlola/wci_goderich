"use client";

import ComingSoon from "@/components/ComingSoon";
import { BookOpenIcon } from "@phosphor-icons/react";

export default function LibraryPage() {
  return (
    <ComingSoon
      title="Digital Library"
      description="Access our digital library of books, teachings, and resources. We're building a comprehensive collection of Christian literature, study materials, and educational resources for your spiritual growth."
      icon={<BookOpenIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />}
      className="pt-20"
    />
  );
}
