"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterTabs, type TabConfig } from "@/components/ui/filter-tabs";
import { BookOpenIcon } from "@phosphor-icons/react";
import { PRAYER_POINTS } from "@/lib/constants";
import { formatOrdinal } from "@/lib/utils";

interface PrayerPointsProps {
  initialCategory?: string;
}

export default function PrayerPoints({ initialCategory }: PrayerPointsProps) {
  // Footer label for midnight groups: "Week {cycleWeek} • Monday 5th 2026"
  const getMidnightWeekLabel = (groupNumber: number) => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysSinceStart = Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    const currentWeekOfYear = Math.floor(daysSinceStart / 7);
    const cycleWeekNumber = (currentWeekOfYear % 6) + 1;

    // Start of current week, then adjust to Monday
    const weekStart = new Date(startOfYear);
    weekStart.setDate(startOfYear.getDate() + currentWeekOfYear * 7);
    const dayOfWeek = weekStart.getDay(); // 0=Sun,1=Mon,...6=Sat
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    weekStart.setDate(weekStart.getDate() + mondayOffset);

    // Calculate the specific day for this group (0 = Monday, 1 = Tuesday, etc.)
    const groupDayOffset = groupNumber - 1; // Group 1 = Monday (0), Group 2 = Tuesday (1), etc.
    const groupDate = new Date(weekStart);
    groupDate.setDate(weekStart.getDate() + groupDayOffset);

    const weekday = groupDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const day = formatOrdinal(groupDate.getDate());
    const year = groupDate.getFullYear();

    return `Week ${cycleWeekNumber} • ${weekday} ${day} ${year}`;
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") || initialCategory;

  // Validate and set active tab from URL
  const validCategories = [
    "all",
    "midnight",
    "general-personal-growth",
    "general-family-relationships",
    "general-church-community",
    "general-global-concerns",
    "special",
  ];
  const activeTab =
    categoryParam && validCategories.includes(categoryParam)
      ? categoryParam
      : "all";

  const tabs = useMemo<TabConfig[]>(() => {
    // Count midnight groups (all groups together)
    const midnightCount = PRAYER_POINTS.filter(
      (point) => point.category === "midnight"
    ).length;

    // Count general subcategories
    const generalSubcategories = [
      { value: "personal-growth", label: "Personal Growth" },
      { value: "family-relationships", label: "Family & Relationships" },
      { value: "church-community", label: "Church & Community" },
      { value: "global-concerns", label: "Global Concerns" },
    ].map((subcat) => {
      const count = PRAYER_POINTS.filter(
        (point) =>
          point.category === "general" && point.subcategory === subcat.value
      ).length;
      return {
        value: `general-${subcat.value}`,
        label: subcat.label,
        count,
      };
    });

    // Count special
    const specialCount = PRAYER_POINTS.filter(
      (point) => point.category === "special"
    ).length;

    return [
      {
        value: "all",
        label: "All Points",
        count: PRAYER_POINTS.length,
      },
      {
        value: "midnight",
        label: "Midnight Groups",
        count: midnightCount,
      },
      ...generalSubcategories,
      {
        value: "special",
        label: "Special",
        count: specialCount,
      },
    ];
  }, []);

  const filteredPoints = useMemo(() => {
    if (activeTab === "all") {
      return PRAYER_POINTS;
    }

    if (activeTab === "midnight") {
      return PRAYER_POINTS.filter((point) => point.category === "midnight");
    }

    if (activeTab.startsWith("general-")) {
      const subcategory = activeTab.replace("general-", "");
      return PRAYER_POINTS.filter(
        (point) =>
          point.category === "general" && point.subcategory === subcategory
      );
    }

    if (activeTab === "special") {
      return PRAYER_POINTS.filter((point) => point.category === "special");
    }

    return PRAYER_POINTS;
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/prayer${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="small-container">
        <SectionHeader
          title="Prayer Points"
          subtitle="Guided Prayer"
          description="Use these prayer points to guide your prayer time. We especially focus on our weekly midnight prayer groups that meet to intercede for breakthrough and victory."
        />

        <div className="mt-12">
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          >
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {filteredPoints.map((point) => (
                <Card
                  key={point.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg">{point.title}</h4>
                    <Badge variant="outline" className="ml-2">
                      {point.category === "midnight" && point.groupNumber
                        ? `Group ${point.groupNumber}`
                        : point.subcategory
                        ? point.subcategory
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        : point.category}
                    </Badge>
                  </div>
                  {point.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {point.description}
                    </p>
                  )}

                  {/* Display midnight group prayers (intercessions + personal thanksgiving) */}
                  {point.category === "midnight" && point.intercessions && (
                    <div className="space-y-6">
                      {/* Intercessions */}
                      <div>
                        <h5 className="text-sm font-semibold mb-3 text-primary">
                          Intercessions
                        </h5>
                        <div className="space-y-4">
                          {point.intercessions.map((intercession, index) => (
                            <div key={index} className="space-y-2 border-b ">
                              <p className="text-sm leading-relaxed">
                                <span className="font-bold mr-2">
                                  {index + 1}.
                                </span>
                                <span>{intercession.prayer}</span>
                              </p>
                              {intercession.scripture && (
                                <div className="p-2 bg-muted dark:bg-background/40 rounded-lg">
                                  <div className="flex items-start gap-2">
                                    <BookOpenIcon
                                      size={16}
                                      className="text-primary mt-0.5 shrink-0"
                                    />
                                    <p className="text-xs italic text-primary font-medium line-clamp-3">
                                      {intercession.scripture}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Thanksgiving */}
                      {point.personalThanksgiving && (
                        <div>
                          <h5 className="text-sm font-semibold mb-3 text-primary">
                            Personal Thanksgiving
                          </h5>
                          <div className="space-y-2">
                            <p className="text-sm leading-relaxed">
                              {point.personalThanksgiving.prayer}
                            </p>
                            {point.personalThanksgiving.scripture && (
                              <div className="p-2 bg-muted dark:bg-background/40 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <BookOpenIcon
                                    size={16}
                                    className="text-primary mt-0.5 shrink-0"
                                  />
                                  <p className="text-xs italic text-primary font-medium line-clamp-3">
                                    {point.personalThanksgiving.scripture}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Display general/special prayers as list */}
                  {point.category !== "midnight" && (
                    <ul className="space-y-2">
                      {point.points.map((prayerPoint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1 text-xs">
                            •
                          </span>
                          <span className="text-sm">{prayerPoint}</span>
                        </li>
                      ))}
                      {point.scripture && (
                        <li className="mt-3">
                          <div className="p-2 bg-muted dark:bg-background/40 rounded-lg">
                            <div className="flex items-start gap-2">
                              <BookOpenIcon
                                size={16}
                                className="text-primary mt-0.5 shrink-0"
                              />
                              <p className="text-xs italic text-primary font-medium line-clamp-3">
                                {point.scripture}
                              </p>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                  {point.date &&
                    (point.category === "midnight" && point.groupNumber ? (
                      <p className="text-xs text-muted-foreground mt-4">
                        {getMidnightWeekLabel(point.groupNumber)}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(point.date).toLocaleDateString()}
                      </p>
                    ))}
                </Card>
              ))}
            </div>
          </FilterTabs>
        </div>
      </div>
    </section>
  );
}
