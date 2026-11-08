"use client";

import { useSyncExternalStore } from "react";

// The date never needs to tick while the page is open, so there is nothing
// to subscribe to. The server has no "today": it renders nothing and the
// client fills the tag in after hydration.
const subscribe = () => () => {};

// Sierra Leone stays on UTC+0 all year, so UTC getters give church-local
// time whatever the visitor's own time zone.
function getToday() {
  const now = new Date();
  return `${now.getUTCDay()}:${now.getUTCDate()}:${new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  ).getUTCDay()}`;
}
const getServerToday = () => null;

function isOnToday(
  today: string,
  weekdays: readonly number[],
  firstWeekOfMonth: boolean,
) {
  const [day, date, firstOfMonthDay] = today.split(":").map(Number);
  if (!weekdays.includes(day)) return false;
  if (!firstWeekOfMonth) return true;
  // First Wednesday of the month, then the two days after it.
  const firstWednesday = ((3 - firstOfMonthDay + 7) % 7) + 1;
  return date >= firstWednesday && date <= firstWednesday + 2;
}

interface TodayTagProps {
  weekdays: readonly number[];
  firstWeekOfMonth?: boolean;
}

/** Small "Today" pill shown when a service runs today in Freetown. */
export function TodayTag({
  weekdays,
  firstWeekOfMonth = false,
}: TodayTagProps) {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  if (!today || !isOnToday(today, weekdays, firstWeekOfMonth)) return null;

  return (
    <span
      data-today=""
      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground"
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      Today
    </span>
  );
}

export default TodayTag;
