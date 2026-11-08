import { CHURCH_INFO } from "@/lib/constants";
import { SERVICES } from "./services";

const { NAME, TAGLINE } = CHURCH_INFO;
const ADDRESS = CHURCH_INFO.CHURCH_LOCATION.address;

// "07:00AM", "09:00AM", "11:00AM" -> "7:00, 9:00 and 11:00 AM"
const SUNDAY_TIMES = (() => {
  const times = SERVICES[0].times.map((t) => t.replace(/^0/, "").slice(0, -2));
  const suffix = SERVICES[0].times[0].slice(-2);
  return `${times.slice(0, -1).join(", ")} and ${times.at(-1)} ${suffix}`;
})();

export const SLIDES = [
  {
    title: NAME,
    subtitle: "WELCOME",
    description: TAGLINE,
    background: "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
    backgroundImage: "/images/church_welcome.jpeg",
    // Darkens the photo so the heading and buttons stay readable.
    overlay: true,
    meta: `Sundays ${SUNDAY_TIMES} · ${ADDRESS.street}, ${ADDRESS.area}`,
    buttons: [
      {
        text: "Plan Your Visit",
        link: "/location",
        primary: true,
      },
      {
        text: "Our Story",
        link: "/about",
      },
    ],
  },
  // {
  //   title: "WORD OF FATE BIBLE INSTITUTE",
  //   subtitle: "FORTIETH ANNIVERSARY CELEBRATION",
  //   description: "WOFBI 40th Anniversary Celebration",
  //   background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
  //   backgroundImage: "/images/bg-WOFBI_40.jpg",
  //   image: "/images/WOFBI_40.png",
  //   buttons: [
  //     {
  //       text: "Share Your Testimony",
  //       link: "/testimonies#share-testimony",
  //     },
  //   ],
  // },
  {
    title: "SHILOH 2026: FAR ABOVE",
    subtitle: "28TH EDITION, 8 TO 13 DECEMBER 2026",
    description: "",
    background: "linear-gradient(135deg, #7f1d1d 0%, #ea580c 100%)",
    backgroundImage: "/images/bg-shiloh_2026.jpg",
    image: "/images/shiloh_2026.png",
  },
  {
    title: "I AM REDEEMED, A WONDER TO MY WORLD (ISAIAH 8:18)",
    subtitle: "PROPHETIC FOCUS - NOVEMBER 2026",
    description: "",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
    backgroundImage: "/images/bg-prophetic_focus_nov_2026.jpg",
    image: "/images/prophetic_focus_nov_2026.png",
  },
  // {
  //   title: "SHILOH 2025",
  //   subtitle: "BREAKING NEW GROUNDS",
  //   description: "The theme for shiloh 2025 is Breaking new grounds",
  //   background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
  //   backgroundImage: "/images/bg-shiloh_2025.png",
  //   image: "/images/shiloh_2025.png",
  // },
  {
    title: "MY YEAR OF OPEN DOORS",
    subtitle: "PROPHETIC THEME - 2026",
    description: "",
    background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    backgroundImage: "/images/bg-2026_theme.jpg",
    image: "/images/2026_theme.png",
    buttons: [
      {
        text: "Read More",
        link: "/about",
      },
    ],
  },
  {
    title: "MY YEAR OF OPEN DOORS",
    subtitle: "PRAISE GOD! 2026 IS MY YEAR OF OPEN DOORS",
    description: "supernatural doors shall be opening to me.",
    background: "linear-gradient(135deg, #2d3436 0%, #000428 100%)",
    backgroundImage: "/images/bg-covenant_greetings_2026.jpg",
    image: "/images/covenant_greetings_2026.png",
  },
];

export const FEATURES = [
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

export const SAMPLE_BIRTHDAYS = [
  {
    id: "sample-1",
    name: "Mary Johnson",
    month: 8,
    day: 12,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sample-2",
    name: "Samuel Ade",
    month: 7,
    day: 3,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sample-3",
    name: "Grace Kamara",
    month: 6,
    day: 25,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sample-4",
    name: "Daniel Mensah",
    month: 5,
    day: 18,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sample-5",
    name: "Esther Bangura",
    month: 4,
    day: 9,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sample-6",
    name: "Michael Thompson",
    month: 3,
    day: 30,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
    year: 2024,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
] as const;
