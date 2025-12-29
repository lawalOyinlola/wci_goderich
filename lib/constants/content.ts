import { CHURCH_INFO } from "@/lib/constants";

const { NAME, TAGLINE } = CHURCH_INFO;

export const SLIDES = [
  {
    title: NAME,
    subtitle: "WELCOME",
    description: TAGLINE,
    background: "linear-gradient(135deg, #004e92 0%, #1a1a1a 100%)",
    buttons: [
      {
        text: "Read More",
        link: "/prophetic-focus-sept",
      },
      {
        text: "Services",
        link: "/services",
      },
      {
        text: "Listen",
        link: "/sermons",
      },
    ],
  },
  //   {
  //     title: "MY DEPENDABLE DESTINY HELPER",
  //     subtitle: "PROPHETIC FOCUS - OCT",
  //     description: "is here.",
  //     background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
  //     backgroundImage: "./images/bg-prophetic_focus_oct.jpg",
  //     image: "/images/prophetic_focus_oct.png",
  //   },
  {
    title: "SHILOH 2025",
    subtitle: "BREAKING NEW GROUNDS",
    description: "The theme for shiloh 2025 is Breaking new grounds",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
    backgroundImage: "/images/bg-shiloh_2025.png",
    image: "/images/shiloh_2025.png",
  },
  {
    title: "MY NEW ERA",
    subtitle: "PROPHETIC THEME - 2025",
    description: "",
    background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    backgroundImage: "/images/bg-2025_theme.jpg",
    image: "/images/2025_theme.png",
    buttons: [
      {
        text: "Read More",
        link: "/about",
      },
    ],
  },
  {
    title: "GREAT THINGS SHALL CONTINUE TO HAPPEN",
    subtitle: "PRAISE GOD 2025 IS MY NEW ERA",
    description: "on their own accord in my life this year.",
    background: "linear-gradient(135deg, #2d3436 0%, #000428 100%)",
    backgroundImage: "/images/bg-covenant_exchange.jpg",
    image: "/images/2025_covenant_exchange.png",
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
    name: "Mary Johnson",
    month: 8,
    day: 12,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
  {
    name: "Samuel Ade",
    month: 7,
    day: 3,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
  {
    name: "Grace Kamara",
    month: 6,
    day: 25,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
  {
    name: "Daniel Mensah",
    month: 5,
    day: 18,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
  {
    name: "Esther Bangura",
    month: 4,
    day: 9,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
  {
    name: "Michael Thompson",
    month: 3,
    day: 30,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    verified: true,
    featured: true,
  },
] as const;
