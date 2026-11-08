import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { IconComponent } from "@/components/IconComponent";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { TodayTag } from "@/components/homePage/TodayTag";
import { SERVICES } from "@/lib/constants";

// Friendlier day names for the timetable. Anything not listed shows as is.
const DAY_LABELS: Record<string, string> = {
  Sunday: "Sundays",
  Weekdays: "Mon to Fri",
  Saturday: "Saturdays",
  "First Wednesdays - Fridays": "First Wed to Fri of the month",
};

// "06:00AM" -> "6:00 AM"
function formatTime(time: string) {
  const match = /^0?(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time);
  return match ? `${match[1]}:${match[2]} ${match[3].toUpperCase()}` : time;
}

type Service = (typeof SERVICES)[number];

function schedulesOf(service: Service) {
  const schedules: { day: string; times: readonly string[] }[] = [
    { day: service.day, times: service.times },
  ];
  if ("additionalSchedule" in service && service.additionalSchedule) {
    schedules.push(service.additionalSchedule);
  }
  return schedules;
}

export default function ChurchServices() {
  return (
    <section id="services" className="small-container scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Pinned on wide screens while the timetable scrolls past. */}
        <Reveal className="lg:sticky lg:top-32 lg:col-span-4">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Church Services
          </h2>
          <p className="mt-5 max-w-sm text-lg text-muted-foreground">
            Join us for worship, prayer, and fellowship throughout the week.
          </p>
          <div className="mt-8">
            <p className="text-muted-foreground">
              First time with us?{" "}
              <Link
                href="/location"
                className="group inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
              >
                Plan your visit
                <ArrowRightIcon
                  aria-hidden="true"
                  weight="bold"
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </p>
          </div>
        </Reveal>
        <Stagger as="ul" className="flex flex-col gap-3 lg:col-span-8">
          {SERVICES.map((service) => (
            <StaggerItem
              as="li"
              key={service.id}
              className="grid gap-x-8 gap-y-4 rounded-2xl bg-muted/50 px-5 py-5 transition-colors duration-200 has-[[data-today]]:bg-primary/[0.07] has-[[data-today]]:ring-1 has-[[data-today]]:ring-primary/25 sm:px-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center dark:bg-muted/40"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <IconComponent iconName={service.icon} size={24} />
                </span>
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold tracking-tight">
                    {service.title}
                    <TodayTag
                      weekdays={service.weekdays}
                      firstWeekOfMonth={
                        "firstWeekOfMonth" in service &&
                        service.firstWeekOfMonth
                      }
                    />
                  </h3>
                  <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>

              <dl className="flex flex-col gap-2 pl-15 md:items-end md:pl-0">
                {schedulesOf(service).map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1.5 md:justify-end"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">
                      {DAY_LABELS[schedule.day] ?? schedule.day}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {schedule.times.map((time) => (
                        <span
                          key={time}
                          className="rounded-full bg-background px-3 py-1 text-sm font-semibold tabular-nums text-primary shadow-xs dark:bg-primary/15"
                        >
                          {formatTime(time)}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
