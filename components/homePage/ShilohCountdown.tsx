"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarBlankIcon,
  CaretUpIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RollingNumber } from "@/components/ui/rolling-number";
import { SHILOH_2026 } from "@/lib/constants";
import { cn } from "@/lib/utils";

const START_MS = Date.parse(SHILOH_2026.start);
const END_MS = Date.parse(SHILOH_2026.end);
const TITLE = `${SHILOH_2026.name}: ${SHILOH_2026.theme}`;

// One shared clock tick per second. The server has no "now", so it renders
// placeholders and the client fills in the real time after hydration.
function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const getNowSeconds = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

// Sierra Leone stays on UTC+0 all year (no daylight saving), so UTC getters
// give church-local time. Formatting by hand keeps server and browser output
// identical, where Intl can differ (for example the space before "PM").
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatStart(ms: number) {
  const d = new Date(ms);
  const h = d.getUTCHours();
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const meridiem = h < 12 ? "AM" : "PM";
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${hour12}:${m} ${meridiem} GMT`;
}

const START_LABEL = formatStart(START_MS);
const DATE_RANGE = `${new Date(START_MS).getUTCDate()} to ${new Date(END_MS).getUTCDate()} ${MONTHS[new Date(END_MS).getUTCMonth()]}`;

// "2026-12-08T16:00:00Z" -> "20261208T160000Z" (Google Calendar format)
const toCalendarStamp = (iso: string) =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

const GOOGLE_URL = `https://calendar.google.com/calendar/render?${new URLSearchParams(
  {
    action: "TEMPLATE",
    text: TITLE,
    dates: `${toCalendarStamp(SHILOH_2026.start)}/${toCalendarStamp(SHILOH_2026.end)}`,
    details: SHILOH_2026.description,
    location: SHILOH_2026.venue,
  },
)}`;

const OUTLOOK_WEB_URL = `https://outlook.live.com/calendar/0/deeplink/compose?${new URLSearchParams(
  {
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: TITLE,
    startdt: SHILOH_2026.start,
    enddt: SHILOH_2026.end,
    location: SHILOH_2026.venue,
    body: SHILOH_2026.description,
  },
)}`;

const CALENDAR_OPTIONS = [
  {
    label: "Google Calendar",
    hint: "Android phones, Gmail",
    href: GOOGLE_URL,
    external: true,
  },
  {
    label: "Apple Calendar",
    hint: "iPhone, iPad, Mac",
    href: SHILOH_2026.icsPath,
    external: false,
  },
  {
    label: "Outlook app",
    hint: "Windows, Mac",
    href: SHILOH_2026.icsPath,
    external: false,
  },
  {
    label: "Outlook.com",
    hint: "Hotmail, Live",
    href: OUTLOOK_WEB_URL,
    external: true,
  },
] as const;

function splitRemaining(seconds: number) {
  return [
    { unit: "Days", value: Math.floor(seconds / 86400) },
    { unit: "Hrs", value: Math.floor((seconds % 86400) / 3600) },
    { unit: "Mins", value: Math.floor((seconds % 3600) / 60) },
    { unit: "Secs", value: seconds % 60 },
  ];
}

const PLACEHOLDER_UNITS = ["Days", "Hrs", "Mins", "Secs"];

/**
 * Countdown band pinned to the bottom of the home hero. Counts down to the
 * start of Shiloh, says it is live while it runs, and removes itself once it
 * ends.
 */
export function ShilohCountdown({ className }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, getNowSeconds, getServerNow);
  const nowMs = now === null ? null : now * 1000;

  if (nowMs !== null && nowMs >= END_MS) return null;

  const isLive = nowMs !== null && nowMs >= START_MS;
  const units =
    nowMs === null
      ? null
      : splitRemaining(Math.max(0, Math.floor((START_MS - nowMs) / 1000)));

  return (
    <div
      data-slot="countdown-ribbon"
      role="region"
      aria-label={`Countdown to ${TITLE}`}
      className={cn(
        "pointer-events-auto relative w-full overflow-hidden border-t border-white/15 bg-linear-to-r from-red-950 via-red-800 to-orange-600 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {/* Light sweep across the band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-[120%] motion-safe:animate-ribbon-shine"
      />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2.5 px-4 py-3 sm:justify-center sm:py-3.5">
        <div className="order-1 min-w-0 leading-tight">
          <p className="text-lg font-bold uppercase tracking-wide sm:text-2xl">
            {SHILOH_2026.name}{" "}
            <span className="text-amber-300">· {SHILOH_2026.theme}</span>
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/85 sm:text-xs">
            {isLive
              ? `${SHILOH_2026.shortVenue} · ${DATE_RANGE}`
              : `Begins ${START_LABEL}`}
          </p>
        </div>

        {isLive ? (
          <div className="order-3 flex w-full items-center justify-center gap-4 sm:order-2 sm:w-auto">
            <p className="flex items-center gap-2.5 font-semibold uppercase tracking-wide">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full rounded-full bg-amber-300 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber-300" />
              </span>
              {SHILOH_2026.name} is live now
            </p>
            <Link
              href="/media#live-streams"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-800 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Watch live
            </Link>
          </div>
        ) : (
          <div
            role="timer"
            aria-label={`Time until ${SHILOH_2026.name} begins`}
            className="order-3 flex w-full justify-center gap-1.5 sm:order-2 sm:w-auto sm:gap-2"
          >
            {(
              units ?? PLACEHOLDER_UNITS.map((unit) => ({ unit, value: null }))
            ).map(({ unit, value }, index, all) => {
              const text =
                value === null ? "--" : String(value).padStart(2, "0");
              return (
                <div
                  key={unit}
                  className="flex min-w-17 items-baseline justify-center gap-1.5 rounded-lg bg-black/25 px-2.5 py-1.5 ring-1 ring-white/15 sm:min-w-20 sm:px-3"
                >
                  <RollingNumber
                    value={text}
                    groupIndex={all.length - 1 - index}
                    className="text-xl font-bold sm:text-3xl"
                  />
                  <span className="sr-only">
                    {value === null ? "" : `${value} ${unit}`}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[10px] font-medium uppercase tracking-widest text-white/80 sm:text-xs"
                  >
                    {unit}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {!isLive && (
          <Popover>
            <PopoverTrigger
              className="group order-2 inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-red-800 shadow-sm transition-[background-color,scale] duration-150 ease-out hover:bg-amber-100 active:scale-[0.97] data-[state=open]:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:order-3 sm:px-4"
              aria-label={`Add ${SHILOH_2026.name} to your calendar`}
            >
              <CalendarBlankIcon className="size-5" weight="bold" />
              <span className="max-sm:hidden">Add to calendar</span>
              <CaretUpIcon
                className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
                weight="bold"
              />
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="end"
              sideOffset={8}
              className="w-64 overflow-hidden p-1.5"
            >
              <ul className="flex flex-col gap-0.5">
                {CALENDAR_OPTIONS.map((option) => {
                  const Icon = option.external
                    ? ArrowUpRightIcon
                    : DownloadSimpleIcon;
                  return (
                    <li key={option.label}>
                      <a
                        href={option.href}
                        {...(option.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group/item flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150 hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none dark:hover:bg-red-500/10 dark:focus-visible:bg-red-500/10"
                      >
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-sm font-medium transition-colors duration-150 group-hover/item:text-red-700 group-focus-visible/item:text-red-700 dark:group-hover/item:text-red-300 dark:group-focus-visible/item:text-red-300">
                            {option.label}
                          </span>
                          <small className="text-xs text-muted-foreground">
                            {option.hint}
                          </small>
                        </span>
                        <Icon
                          aria-hidden="true"
                          weight="bold"
                          className={cn(
                            "size-4 shrink-0 text-muted-foreground/60 transition-[color,translate] duration-150 ease-out group-hover/item:text-red-600 group-focus-visible/item:text-red-600 dark:group-hover/item:text-red-300",
                            option.external
                              ? "group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                              : "group-hover/item:translate-y-0.5",
                          )}
                        />
                        <span className="sr-only">
                          {option.external
                            ? "(opens in a new tab)"
                            : "(downloads a calendar file)"}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default ShilohCountdown;
