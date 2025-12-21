"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Music } from "lucide-react";
import { Testimony } from "@/lib/types";

interface TestimonyType {
  value: string;
  label: string;
  icon?: "FileText" | "Video" | "Music";
  count: number;
}

interface TestimoniesTabsProps {
  testimonies: Testimony[];
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
      (t: Testimony) => t.type === "text"
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
        value: "text",
        label: "Text",
        icon: "FileText",
        count: textCount,
      },
      {
        value: "video",
        label: "Video",
        icon: "Video",
        count: videoCount,
      },
      {
        value: "audio",
        label: "Audio",
        icon: "Music",
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
            {type.icon &&
              (type.icon === "FileText" ? (
                <FileText className="w-4 h-4 group-hover:text-primary transition-colors" />
              ) : type.icon === "Music" ? (
                <Music className="w-4 h-4 group-hover:text-primary transition-colors" />
              ) : type.icon === "Video" ? (
                <Video className="w-4 h-4 group-hover:text-primary transition-colors" />
              ) : null)}
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
