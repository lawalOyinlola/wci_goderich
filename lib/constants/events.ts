export const UPCOMING_EVENTS = [
  {
    id: "1",
    title:
      "Sharing Our Faith & Gospel through Christ the teacher of all things",
    date: "2025-10-15",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Pastor Abejirin Femi Miracle",
    address: "WCI Goderich Church, Sierra Leone",
    image: "/images/church_welcome.jpeg",
  },
  {
    id: "2",
    title: "Empowering the Next Generation",
    date: "2025-10-25",
    startTime: "10:00am",
    by: "Youth Alive Fellowship",
    address: "WCI Goderich Church, Sierra Leone",
    image: "/images/ministries.jpeg",
  },
  {
    id: "3",
    title: "BREAKING NEW GROUNDS",
    date: "2025-12-10",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Shiloh 2025",
    address: "Church Premises",
    image: "/images/shiloh-2025.jpg",
  },
] as const;

/**
 * Shiloh 2026 drives the countdown ribbon on the home hero. Times are UTC
 * ISO strings; the ribbon formats them in the church's own time zone. The
 * ribbon hides itself once `end` passes, so this can stay until the next
 * Shiloh is announced. Keep `public/shiloh-2026.ics` in step with any change.
 */
export const SHILOH_2026 = {
  name: "Shiloh 2026",
  theme: "Far Above",
  edition: "28th edition",
  start: "2026-12-08T17:00:00Z", // 6:00 PM WAT, 5:00 PM in Freetown
  end: "2026-12-13T21:00:00Z",
  venue: "Canaanland, Km 10 Idiroko Road, Ota, Ogun State, Nigeria",
  shortVenue: "Canaanland, Ota",
  timeZone: "Africa/Freetown",
  description:
    "28th edition of Shiloh. Ministering: Bishop David Oyedepo and other anointed ministers of God. Join live on YouTube and Domi Radio.",
  icsPath: "/shiloh-2026.ics",
} as const;
