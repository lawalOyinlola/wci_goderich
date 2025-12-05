const CHURCH_INFO = {
  NAME: "WINNERS CHAPEL INT'L GODERICH",
  ADDRESS: "123 Main St, Goderich, ON N7A 1A1",
  PHONE: "519-555-1234",
  EMAIL: "info@wcigoderich.org",
  WEBSITE: "https://www.wcigoderich.org",
  TAGLINE:
    "Making a difference in our community through acts of service and love.",
  ABOUT_US: [
    "Winners Chapel International, Goderich is a branch of the Living Faith Church Worldwide, founded under the leadership of Bishop Dr. David Oyedepo. Our mandate is to preach the Word of Faith and set people free from every oppression of the devil. We are committed to carrying out this vision across Goderich and Sierra Leone at large.",
    "Since our official inauguration in 2013, God has blessed us with countless testimonies. We currently worship in a 1,500-seater auditorium, with a combined Children and Teens Church that seats up to 300. Here, the Word is taught with power, raising strong and victorious believers. We are glad you are here. Take time to explore this platform, and join us in any of our services, you will encounter God in a life-changing way.",
  ],
  MISSION:
    "To make a difference in our community through acts of service and love.",
  VISION:
    "To be a church that is known for its love and service to the community.",
  VALUES: ["Love", "Service", "Community"] as const,
};

const FEATURES = [
  {
    icon: "ChurchIcon",
    title: "Worship",
    subtitle: "Honoring God in Spirit and Truth",
    description:
      "We gather to worship God with reverence and joy, acknowledging His holiness and grace in our lives.",
    bible: "John 4:24",
  },
  {
    icon: "UsersThreeIcon",
    title: "Connect",
    subtitle: "Building Community & Fellowship",
    description:
      "We foster meaningful relationships among believers to build spiritual growth and mutual support.",
    bible: "Hebrews 10:24-25",
  },
  {
    icon: "HeartIcon",
    title: "God's Love",
    subtitle: "Experiencing Grace and Mercy",
    description:
      "We embrace the unconditional love of God that transforms lives and brings hope to all.",
    bible: "Romans 5:8",
  },
] as const;

const SERVICES = [
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
    title: "Home Cell",
    description:
      "Join intimate home-based fellowship groups for Bible study, prayer, and building close-knit community relationships.",
    day: "Saturdays",
    times: ["05:00PM"],
    accentColor: "text-accent",
  },
] as const;

const SERMONS = [
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
    pastor: "Lungi xxx",
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

const UPCOMING_EVENTS = [
  {
    id: 1,
    title:
      "Sharing Our Faith & Gospel through Christ the teacher of all things",
    date: "2025-10-15",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Pastor Abel Ukweni",
    address: "WCI Goderich Church, Sierra Leone",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Empowering the Next Generation",
    date: "2025-10-25",
    startTime: "10:00am",
    by: "Youth Alive Fellowship",
    address: "WCI Goderich Church, Sierra Leone",
    image: "/images/events/youth-alive-event.jpg",
  },
  {
    id: 3,
    title: "BREAKING NEW GROUNDS",
    date: "2025-12-10",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Shiloh 2025",
    address: "Church Premises",
    image: "/images/shiloh-2025.jpg",
  },
] as const;

const DONATIONS = [
  "Building Project",
  "Church Beautification",
  "Worshippers Transportation",
  "Church Welfare",
  "Media/Tech Equipments",
];

export { CHURCH_INFO, FEATURES, SERVICES, SERMONS, UPCOMING_EVENTS, DONATIONS };
