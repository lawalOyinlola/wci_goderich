import { CHURCH_INFO } from "./church";

/**
 * Central SEO / site configuration.
 *
 * Everything SEO-related (metadata, Open Graph, Twitter cards, structured data,
 * sitemap, robots, manifest) is derived from the values in this file so there is
 * a single source of truth. Update values here and they propagate everywhere.
 */

const DEFAULT_SITE_URL = "https://wcigoderich.org";

/**
 * Production base URL — override with NEXT_PUBLIC_SITE_URL in the environment.
 * Validated to be an absolute http(s) URL so downstream `new URL(SITE_URL)`
 * calls (e.g. metadataBase) can't throw on a malformed env value.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const { protocol } = new URL(raw);
    if (protocol !== "https:" && protocol !== "http:") return DEFAULT_SITE_URL;
    return raw.replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

/** The developer of this site (author attribution). */
export const AUTHOR = {
  name: "Lawal Oyinlola",
  shortName: "LAWAL",
  role: "Software Engineer",
  url: "https://lawaloyinlola.com",
  email: "oyinlolalawal1705@gmail.com",
  socials: {
    portfolio: "https://lawaloyinlola.com",
    github: "https://github.com/lawalOyinlola",
    linkedin: "https://www.linkedin.com/in/lawaloyinlola",
    x: "https://x.com/honeyzrich",
  },
} as const;

/** Author social profiles as a flat list (used for JSON-LD `sameAs`, links, etc.). */
export const AUTHOR_SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  href: string;
}> = [
  { label: "Portfolio", href: AUTHOR.socials.portfolio },
  { label: "GitHub", href: AUTHOR.socials.github },
  { label: "LinkedIn", href: AUTHOR.socials.linkedin },
  { label: "X", href: AUTHOR.socials.x },
];

/** Church social profiles (used for Organization JSON-LD `sameAs`). */
export const CHURCH_SOCIAL_LINKS: ReadonlyArray<string> =
  CHURCH_INFO.SOCIAL_LINKS.map((s) => s.href).filter(
    (href) => href && href !== "#"
  );

/** Resident & associate pastors surfaced in SEO keywords and structured data. */
export const SITE_PASTORS = [
  { name: "Pastor Abel Enun Ukweni", title: "Resident Pastor" },
  { name: "Pastor Lungay Sellu", title: "Associate Pastor" },
] as const;

export const SITE_CONFIG = {
  url: SITE_URL,
  name: "WCI Goderich",
  shortName: "WCI Goderich",
  legalName: CHURCH_INFO.NAME,
  /** Used as the default suffix in the title template, e.g. "About | WCI Goderich". */
  titleTemplate: "%s | WCI Goderich",
  defaultTitle: "WCI Goderich — Winners Chapel International, Goderich",
  description:
    "Winners Chapel International, Goderich (Living Faith Church Worldwide) — a Word of Faith church in Goderich, Freetown, Sierra Leone, led by Resident Pastor Abel Ukweni and Associate Pastor Lungay Sellu. Join our services, prayer, and community programs.",
  locale: "en_GB",
  /** 1200×630 recommended for social cards. Relative to the site root. */
  ogImage: "/images/church_welcome.jpeg",
  keywords: [
    "Winners Chapel International",
    "WCI Goderich",
    "Living Faith Church Worldwide",
    "church in Goderich",
    "church in Freetown",
    "church in Sierra Leone",
    "David Oyedepo",
    "Word of Faith",
    "Christian church",
    "Sunday service",
    "WOFBI",
    // Resident & associate pastors
    "Pastor Abel Ukweni",
    "Pastor Abel Enun Ukweni",
    "Resident Pastor WCI Goderich",
    "Pastor Lungay Sellu",
    "Pastor Lungi",
    "Associate Pastor WCI Goderich",
  ],
  twitter: {
    // Set the church's handle here if/when one exists, e.g. "@wcigoderich".
    site: undefined as string | undefined,
    creator: undefined as string | undefined,
  },
} as const;

export type PageSeoKey =
  | "home"
  | "about"
  | "contact-us"
  | "education"
  | "events"
  | "gallery"
  | "giving"
  | "library"
  | "location"
  | "media"
  | "ministries-businessmen"
  | "ministries-children"
  | "ministries-teens"
  | "ministries-youth"
  | "prayer"
  | "service-units"
  | "services"
  | "testimonies"
  | "wofbi"
  | "wsf";

export interface PageSeo {
  /** Page title (without the site-name suffix). Omit on `home` to use defaultTitle. */
  title?: string;
  description: string;
  /** Path used for the canonical URL, e.g. "/about". */
  path: string;
  /** Optional page-specific OG image (relative path). Falls back to SITE_CONFIG.ogImage. */
  image?: string;
  keywords?: string[];
}

/** Per-page SEO content — the single source of truth for titles & descriptions. */
export const PAGE_SEO: Record<PageSeoKey, PageSeo> = {
  home: {
    path: "/",
    description: SITE_CONFIG.description,
    image: "/images/2026_theme.png",
  },
  about: {
    title: "About Us",
    path: "/about",
    description:
      "Learn about Winners Chapel International, Goderich — our vision, mission, leadership under Resident Pastor Abel Ukweni and Associate Pastor Lungay Sellu, and the 12 Pillars of our Commission within the Living Faith Church Worldwide.",
    image: "/images/about_us_hero.jpg",
  },
  "contact-us": {
    title: "Contact Us",
    path: "/contact-us",
    description:
      "Get in touch with Winners Chapel International, Goderich. Reach us by phone, email, or visit us in Goderich, Freetown, Sierra Leone.",
  },
  education: {
    title: "Education",
    path: "/education",
    description:
      "Discover the educational mission of Winners Chapel International — our schools across Sierra Leone and Nigeria, and the World of Faith Bible Institute (WOFBI).",
    image: "/images/education_school_hero.jpeg",
  },
  events: {
    title: "Events",
    path: "/events",
    description:
      "Stay up to date with upcoming services, programs, and special events at Winners Chapel International, Goderich.",
  },
  gallery: {
    title: "Gallery",
    path: "/gallery",
    description:
      "Browse photos from services, programs, and community moments at Winners Chapel International, Goderich.",
    image: "/images/gallery-hero.jpeg",
  },
  giving: {
    title: "Giving",
    path: "/giving",
    description:
      "Support the work of Winners Chapel International, Goderich through your tithes, offerings, and seeds. Give securely and partner with the vision.",
    image: "/images/giving-hero.jpeg",
  },
  library: {
    title: "Library",
    path: "/library",
    description:
      "Explore resources, books, and materials to grow in faith at Winners Chapel International, Goderich.",
  },
  location: {
    title: "Location & Directions",
    path: "/location",
    description:
      "Find Winners Chapel International, Goderich on Femi Turner Drive, Goderich, Freetown, Sierra Leone. Get directions and service times.",
    image: "/images/location_hero.jpeg",
  },
  media: {
    title: "Media & Sermons",
    path: "/media",
    description:
      "Watch live streams, listen to sermons, and access the latest messages from Winners Chapel International, Goderich.",
  },
  "ministries-businessmen": {
    title: "Businessmen's Fellowship",
    path: "/ministries/businessmen",
    description:
      "Join the Businessmen's Fellowship at Winners Chapel International, Goderich — raising kingdom-minded entrepreneurs and professionals.",
    image: "/images/businessmen_fellowship_hero.jpeg",
  },
  "ministries-children": {
    title: "Children's Church",
    path: "/ministries/children",
    description:
      "The Children's Church at Winners Chapel International, Goderich nurtures children in the Word in a fun, safe, and faith-filled environment.",
    image: "/images/children_ministry_hero.jpeg",
  },
  "ministries-teens": {
    title: "Teens Church",
    path: "/ministries/teens",
    description:
      "The Teens Church at Winners Chapel International, Goderich raises bold, godly teenagers grounded in the Word of Faith.",
    image: "/images/teens_church_hero.jpeg",
  },
  "ministries-youth": {
    title: "Youth Alive Fellowship",
    path: "/ministries/youth",
    description:
      "Youth Alive Fellowship at Winners Chapel International, Goderich empowers young people to live victoriously and impact their generation.",
    image: "/images/youth_alive_hero.jpeg",
  },
  prayer: {
    title: "Prayer",
    path: "/prayer",
    description:
      "Submit prayer requests, join prayer sessions, and read answered prayers at Winners Chapel International, Goderich.",
  },
  "service-units": {
    title: "Service Units",
    path: "/service-units",
    description:
      "Find your place of service at Winners Chapel International, Goderich. Explore our service units and get involved.",
  },
  services: {
    title: "Service Times",
    path: "/services",
    description:
      "View weekly service times and programs at Winners Chapel International, Goderich. Plan your visit and worship with us.",
  },
  testimonies: {
    title: "Testimonies",
    path: "/testimonies",
    description:
      "Read and share testimonies of God's goodness from members of Winners Chapel International, Goderich.",
    image: "/images/testimonies-hero.jpeg",
  },
  wofbi: {
    title: "WOFBI",
    path: "/wofbi",
    description:
      "Enroll in the World of Faith Bible Institute (WOFBI) at Winners Chapel International, Goderich and be grounded in the Word of Faith.",
  },
  wsf: {
    title: "Winners Satellite Fellowship",
    path: "/wsf",
    description:
      "Join a Winners Satellite Fellowship (WSF) near you — extending the reach of Winners Chapel International, Goderich into communities.",
    image: "/images/homecell_hero.jpeg",
  },
};
