"use client";

import { useMemo } from "react";
import { FilterTabs, type TabConfig } from "@/components/ui/filter-tabs";
import type { Testimony } from "@/lib/types/testimonies";

interface TestimoniesTabsProps {
  testimonies: readonly Testimony[];
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

export default function TestimoniesTabs({
  testimonies,
  activeTab,
  onTabChange,
  children,
}: TestimoniesTabsProps) {
  const testimonyTypes = useMemo<TabConfig[]>(() => {
    const counts = testimonies.reduce(
      (acc, t) => {
        acc[t.type]++;
        return acc;
      },
      { written: 0, video: 0, audio: 0 }
    );

    return [
      {
        value: "all",
        label: "All",
        count: testimonies.length,
      },
      {
        value: "written",
        label: "Written",
        icon: "FileTextIcon",
        count: counts.written,
      },
      {
        value: "video",
        label: "Video",
        icon: "VideoCameraIcon",
        count: counts.video,
      },
      {
        value: "audio",
        label: "Audio",
        icon: "MusicNotesIcon",
        count: counts.audio,
      },
    ];
  }, [testimonies]);

  return (
    <FilterTabs
      tabs={testimonyTypes}
      activeTab={activeTab}
      onTabChange={onTabChange}
    >
      {children}
    </FilterTabs>
  );
}
