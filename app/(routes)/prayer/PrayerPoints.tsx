"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { FilterTabs, type TabConfig } from "@/components/ui/filter-tabs";
import { BookOpenIcon } from "@phosphor-icons/react";
import { PRAYER_POINTS } from "@/lib/constants";
import { Reveal } from "@/components/motion";

interface PrayerPointsProps {
  initialCategory?: string;
}

export default function PrayerPoints({ initialCategory }: PrayerPointsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") || initialCategory;

  const tabs = useMemo<TabConfig[]>(() => {
    // Count general subcategories
    const generalSubcategories = [
      { value: "personal-growth", label: "Personal Growth" },
      { value: "family-relationships", label: "Family & Relationships" },
      { value: "church-community", label: "Church & Community" },
      { value: "global-concerns", label: "Global Concerns" },
    ].map((subcat) => {
      const count = PRAYER_POINTS.filter(
        (point) =>
          point.category === "general" && point.subcategory === subcat.value,
      ).length;
      return {
        value: `general-${subcat.value}`,
        label: subcat.label,
        count,
      };
    });

    // Count special
    const specialCount = PRAYER_POINTS.filter(
      (point) => point.category === "special",
    ).length;

    const allTabs: TabConfig[] = [
      {
        value: "all",
        label: "All Points",
        count: PRAYER_POINTS.length,
      },
      ...generalSubcategories,
      {
        value: "special",
        label: "Special",
        count: specialCount,
      },
    ];

    // Only render a tab when it actually has points (always keep "All Points"
    // as the home tab), so an empty category never shows as a dead tab.
    return allTabs.filter((tab) => tab.value === "all" || (tab.count ?? 0) > 0);
  }, []);

  // Fall back to "All Points" when the URL category has no visible tab.
  const activeTab =
    categoryParam && tabs.some((tab) => tab.value === categoryParam)
      ? categoryParam
      : "all";

  const filteredPoints = useMemo(() => {
    if (activeTab === "all") {
      return PRAYER_POINTS;
    }

    if (activeTab.startsWith("general-")) {
      const subcategory = activeTab.replace("general-", "");
      return PRAYER_POINTS.filter(
        (point) =>
          point.category === "general" && point.subcategory === subcategory,
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
    <section id="prayer-points" className="scroll-mt-24">
      <div className="small-container">
        <Reveal>
          <SectionHeader
            title="Prayer Points"
            subtitle="Guided Prayer"
            description="Use these prayer points to guide your prayer time, for yourself, your family, the church and the world."
          />
        </Reveal>

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
                    <h3 className="heading-4 text-lg">{point.title}</h3>
                  </div>
                  {point.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {point.description}
                    </p>
                  )}

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
                              className="text-red-700 dark:text-primary mt-0.5 shrink-0"
                            />
                            <p className="text-xs italic text-red-700 dark:text-primary font-medium line-clamp-3">
                              {point.scripture}
                            </p>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                  {point.date && (
                    <p className="text-xs text-muted-foreground text-end italic mt-auto">
                      {new Date(point.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </FilterTabs>
        </div>
      </div>
    </section>
  );
}
