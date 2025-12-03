import { CHURCH_INFO } from "@/lib/constants";

const { NAME, TAGLINE } = CHURCH_INFO;

const slides = [
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
        link: "/giving",
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
    backgroundImage: "./images/bg-shiloh_2025.png",
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

export { slides };
