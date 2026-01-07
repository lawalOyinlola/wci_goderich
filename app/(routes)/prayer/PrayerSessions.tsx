"use client";

import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { PRAYER_SESSIONS } from "@/lib/constants";

export default function PrayerSessions() {
  const specialSessions = PRAYER_SESSIONS.filter(
    (session) => session.isSpecial
  );
  const regularSessions = PRAYER_SESSIONS.filter(
    (session) => !session.isSpecial
  );

  return (
    <section className="py-16 bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Prayer Sessions & Services"
          subtitle="Join Us in Prayer"
          description="Find a prayer session that fits your schedule. We have various prayer groups and services throughout the week, including special midnight prayer groups."
        />

        {/* Special Midnight Prayer Groups */}
        {specialSessions.length > 0 && (
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <ClockIcon size={24} weight="duotone" className="text-primary" />
              <h3 className="text-2xl font-semibold">
                Special Midnight Prayer Groups
              </h3>
              <Badge variant="default" className="ml-2">
                Weekly
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {specialSessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold">{session.name}</h4>
                    <Badge variant="default">Special</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {session.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={18} className="text-primary" />
                      <span className="text-sm font-medium">{session.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon size={18} className="text-primary" />
                      <div className="flex flex-wrap gap-2">
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
                      <MapPinIcon size={18} className="text-primary" />
                      <span className="text-sm">{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon size={18} className="text-primary" />
                      <span className="text-sm capitalize">{session.type}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Prayer Sessions (including adapted services) */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">All Prayer Sessions</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularSessions.map((session) => (
              <Card
                key={session.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold">{session.name}</h4>
                  <Badge variant="outline" className="capitalize">
                    {session.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
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
