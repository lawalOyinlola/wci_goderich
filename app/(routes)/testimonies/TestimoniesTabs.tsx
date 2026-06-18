"use client";

import { useMemo } from "react";
import { FilterTabs, type TabConfig } from "@/components/ui/filter-tabs";
import type { TestimonyCounts } from "./TestimoniesContent";

interface TestimoniesTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
  // Stable per-type counts from the API (independent of the active tab).
  counts: TestimonyCounts | null;
}

export default function TestimoniesTabs({
  activeTab,
  onTabChange,
  children,
  counts,
}: TestimoniesTabsProps) {
  const testimonyTypes = useMemo<TabConfig[]>(
    () => [
      {
        value: "all",
        label: "All",
        count: counts?.all,
      },
      {
        value: "written",
        label: "Written",
        icon: "FileTextIcon",
        count: counts?.written,
      },
      {
        value: "video",
        label: "Video",
        icon: "VideoCameraIcon",
        count: counts?.video,
      },
      {
        value: "audio",
        label: "Audio",
        icon: "MusicNotesIcon",
        count: counts?.audio,
      },
    ],
    [counts]
  );

  return (
    <FilterTabs
      tabs={testimonyTypes}
      activeTab={activeTab}
      onTabChange={onTabChange}
      countLoading={counts === null}
    >
      {children}
    </FilterTabs>
  );
}