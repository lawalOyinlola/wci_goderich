"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRAYER_POINTS } from "@/lib/constants/prayer";
import { ClockIcon, BookOpenIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function PrayerPoints() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Points" },
    { value: "midnight", label: "Midnight Prayer" },
    { value: "general", label: "General" },
    { value: "special", label: "Special" },
  ];

  const filteredPoints =
    selectedCategory === "all"
      ? PRAYER_POINTS
      : PRAYER_POINTS.filter((point) => point.category === selectedCategory);

  const midnightPoints = PRAYER_POINTS.filter(
    (point) => point.category === "midnight"
  );

  return (
    <section className="py-16 bg-background">
      <div className="small-container">
        <SectionHeader
          title="Prayer Points"
          subtitle="Guided Prayer"
          description="Use these prayer points to guide your prayer time. We especially focus on our weekly midnight prayer groups that meet to intercede for breakthrough and victory."
        />

        {/* Highlight Midnight Prayer Points */}
        {midnightPoints.length > 0 && (
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon size={24} weight="duotone" className="text-primary" />
              <h3 className="text-2xl font-semibold">Midnight Prayer Points</h3>
              <Badge variant="default" className="ml-2">
                Weekly
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Special prayer points for our midnight prayer groups that meet
              weekly at 12:00 AM.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {midnightPoints.map((point) => (
                <Card
                  key={point.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold">{point.title}</h4>
                    <Badge variant="outline" className="ml-2">
                      {point.category}
                    </Badge>
                  </div>
                  {point.description && (
                    <p className="text-muted-foreground mb-4">
                      {point.description}
                    </p>
                  )}
                  {point.scripture && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <BookOpenIcon
                          size={20}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <p className="text-sm italic text-primary font-medium">
                          {point.scripture}
                        </p>
                      </div>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {point.points.map((prayerPoint, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <span className="text-sm">{prayerPoint}</span>
                      </li>
                    ))}
                  </ul>
                  {point.date && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Updated: {new Date(point.date).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Prayer Points with Tabs */}
        <div className="mt-12">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.value}
                value={category.value}
                className="mt-6"
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPoints.map((point) => (
                    <Card
                      key={point.id}
                      className="p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold">{point.title}</h4>
                        <Badge variant="outline" className="ml-2">
                          {point.category}
                        </Badge>
                      </div>
                      {point.description && (
                        <p className="text-sm text-muted-foreground mb-4">
                          {point.description}
                        </p>
                      )}
                      {point.scripture && (
                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <div className="flex items-start gap-2">
                            <BookOpenIcon
                              size={18}
                              className="text-primary mt-0.5 shrink-0"
                            />
                            <p className="text-xs italic text-primary font-medium">
                              {point.scripture}
                            </p>
                          </div>
                        </div>
                      )}
                      <ul className="space-y-2">
                        {point.points.slice(0, 4).map((prayerPoint, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-1 text-xs">
                              •
                            </span>
                            <span className="text-sm">{prayerPoint}</span>
                          </li>
                        ))}
                        {point.points.length > 4 && (
                          <li className="text-xs text-muted-foreground">
                            +{point.points.length - 4} more points
                          </li>
                        )}
                      </ul>
                      {point.date && (
                        <p className="text-xs text-muted-foreground mt-4">
                          {new Date(point.date).toLocaleDateString()}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
