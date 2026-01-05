"use client";

import { IconComponent } from "@/components/IconComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabConfig {
  value: string;
  label: string;
  icon?: "FileTextIcon" | "VideoCameraIcon" | "MusicNotesIcon" | string;
  count?: number;
}

interface FilterTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
  showCount?: boolean;
  variant?: "default" | "simple";
}

export function FilterTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
  tabsListClassName,
  tabsTriggerClassName,
  showCount = true,
  variant = "default",
}: FilterTabsProps) {
  const isDefaultVariant = variant === "default";

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className={cn("w-full", className)}
    >
      <TabsList
        className={cn(
          isDefaultVariant
            ? "justify-center mb-12 bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
            : "grid w-full",
          tabsListClassName
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              isDefaultVariant
                ? "flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-md text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary/30 dark:data-[state=active]:text-primary dark:data-[state=active]:border-primary transition-all duration-200 hover:text-primary hover:border-primary group"
                : "",
              tabsTriggerClassName
            )}
          >
            {tab.icon && (
              <IconComponent
                iconName={tab.icon as any}
                weight={activeTab === tab.value ? "duotone" : "regular"}
                size={16}
                className={cn(
                  isDefaultVariant &&
                    "group-hover:text-primary transition-colors"
                )}
              />
            )}

            <span
              className={cn(
                isDefaultVariant && "group-hover:text-primary transition-colors"
              )}
            >
              {tab.label}
            </span>
            {showCount && tab.count !== undefined && (
              <span
                className={cn(
                  "ml-2 rounded-sm px-2.5 py-1.5 text-xs font-medium",
                  isDefaultVariant
                    ? activeTab === tab.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                    : activeTab === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  );
}
