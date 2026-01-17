"use client";

import JoinPrayerGroup from "./JoinPrayerGroup";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, MapPinIcon, CalendarIcon } from "@phosphor-icons/react";
import { PRAYER_SESSIONS } from "@/lib/constants";

export default function PrayerSessions() {
  const regularSessions = PRAYER_SESSIONS.filter(
    (session) => !session.isSpecial
  );

  return (
    <section id="prayer-sessions" className="bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Prayer Sessions & Services"
          subtitle="Join Us in Prayer"
          description="Find a prayer session that fits your schedule. We have various prayer groups and services throughout the week, including special midnight prayer groups."
        />
        <JoinPrayerGroup />

        {/* Regular Prayer Sessions (including adapted services) */}
        <div className="mt-12">
          <h3 className="mb-6">All Prayer Sessions</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularSessions.map((session) => (
              <Card
                key={session.id}
                className="p-6 transition-all duration-300 shadow-sm hover:shadow-primary/20 hover:shadow-md overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-lg">{session.name}</h4>
                  <Badge variant="outline" className="capitalize">
                    {session.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary" />
                    <span className="text-sm">{session.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} className="text-primary" />
                    <div className="flex flex-wrap gap-1">
                      {session.times.map((time, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon size={16} className="text-primary" />
                    <span className="text-sm">{session.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
