export const SERVICES = [
  {
    id: 1,
    icon: "ChurchIcon",
    title: "Sunday Worship",
    description:
      "Experience powerful worship, inspiring messages, and spiritual fellowship every Sunday morning.",
    day: "Sunday",
    times: ["07:00AM", "09:00AM", "11:00AM"],
    accentColor: "text-accent",
  },
  {
    id: 2,
    icon: "ClockCountdownIcon",
    iconClassName: "rotate-270",
    title: "90 Min with Jesus",
    description: "Deepen your faith through our weekly Bible study groups.",
    day: "Mondays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 3,
    icon: "BreadIcon",
    title: "Communion Service",
    description:
      "Participate in the sacred communion service, remembering Christ's sacrifice and sharing in fellowship.",
    day: "Wednesdays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 4,
    icon: "HandsPrayingIcon",
    title: "Covenant Hour of Prayer",
    description:
      "Join our daily prayer sessions to intercede for the church, community, and personal spiritual growth.",
    day: "Weekdays",
    times: ["06:00AM"],
    additionalSchedule: {
      day: "Saturday",
      times: ["07:00AM"],
    },
    accentColor: "text-accent",
  },
  {
    id: 5,
    icon: "CrossIcon",
    title: "Spiritual Week of Emphasis",
    description:
      "Intensive spiritual focus with special teachings, prayer, and fasting during the first week of each month.",
    day: "Wednesdays - Fridays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 6,
    icon: "HouseLineIcon",
    title: "Satellite Fellowship",
    description:
      "Join intimate home-based fellowship groups for Bible study, prayer, and building close-knit community relationships.",
    day: "Saturdays",
    times: ["05:00PM"],
    accentColor: "text-accent",
  },
] as const;

export const SERMONS = [
  {
    id: 1,
    title: "Let the Sunset Inspire You",
    date: "JULY 01, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    id: 2,
    title: "Developing Spiritual Mentality",
    date: "AUGUST 01, 2025",
    pastor: "Lungay Sellu",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    title: "Let the Bible Motivate You",
    date: "AUGUST 29, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=3",
  },
] as const;
