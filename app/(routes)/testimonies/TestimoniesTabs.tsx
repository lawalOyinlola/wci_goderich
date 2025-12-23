"use client";

import { useMemo } from "react";
import { IconComponent } from "@/components/IconComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Testimony } from "@/lib/types";

interface TestimonyType {
  value: string;
  label: string;
  icon?: "FileTextIcon" | "VideoCameraIcon" | "MusicNotesIcon";
  count: number;
}

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
  const testimonyTypes = useMemo<TestimonyType[]>(() => {
    const allCount = testimonies.length;
    const textCount = testimonies.filter(
      (t: Testimony) => t.type === "written"
    ).length;
    const videoCount = testimonies.filter(
      (t: Testimony) => t.type === "video"
    ).length;
    const audioCount = testimonies.filter(
      (t: Testimony) => t.type === "audio"
    ).length;

    return [
      {
        value: "all",
        label: "All",
        count: allCount,
      },
      {
        value: "written",
        label: "Written",
        icon: "FileTextIcon",
        count: textCount,
      },
      {
        value: "video",
        label: "Video",
        icon: "VideoCameraIcon",
        count: videoCount,
      },
      {
        value: "audio",
        label: "Audio",
        icon: "MusicNotesIcon",
        count: audioCount,
      },
    ];
  }, [testimonies]);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="justify-center mb-12 bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
        {testimonyTypes.map((type) => (
          <TabsTrigger
            key={type.value}
            value={type.value}
            className="flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-md text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary/30 dark:data-[state=active]:text-primary dark:data-[state=active]:border-primary transition-all duration-200 hover:text-primary hover:border-primary group"
          >
            {type.icon && (
              <IconComponent
                iconName={type.icon}
                weight={activeTab === type.value ? "duotone" : "regular"}
                size={16}
                className="group-hover:text-primary transition-colors"
              />
            )}

            <span className="group-hover:text-primary transition-colors">
              {type.label}
            </span>
            <span
              className={`ml-2 rounded-sm px-2.5 py-1.5 text-xs font-medium ${
                activeTab === type.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
              }`}
            >
              {type.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  );
}
