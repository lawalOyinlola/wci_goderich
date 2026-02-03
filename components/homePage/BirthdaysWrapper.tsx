import MonthlyBirthdays from "./sections/Birthdays";
import { getBirthdaysForCurrentMonth } from "@/lib/data/birthdays.server";
import { SAMPLE_BIRTHDAYS } from "@/lib/constants";
import type { Birthday } from "@/lib/types";

// Server component wrapper that fetches data
export default async function BirthdaysWrapper() {
  // Fetch birthdays for current month, filling with previous months if needed
  const dbBirthdays = await getBirthdaysForCurrentMonth({
    minCount: 6,
    featured: true,
  });

  // Transform database birthdays to component format, with fallback to sample birthdays
  const featuredBirthdays: Birthday[] =
    dbBirthdays.length > 0
      ? dbBirthdays
      : SAMPLE_BIRTHDAYS.map((bday, idx) => ({
          id: bday.id || `sample-${idx}`,
          name: bday.name,
          month: bday.month,
          day: bday.day,
          image: bday.image,
          verified: bday.verified ?? true,
          featured: bday.featured ?? true,
          created_at: bday.created_at || new Date().toISOString(),
          updated_at: bday.updated_at || new Date().toISOString(),
        }));

  return <MonthlyBirthdays initialBirthdays={featuredBirthdays} />;
}
