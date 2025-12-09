import type { Route } from "next";

export interface FooterLinkItem {
  title: string;
  href: Route;
}

export interface FooterLinkGroup {
  group: string;
  items: FooterLinkItem[];
}

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    group: "About Us",
    items: [
      { title: "Our Story", href: "/about" },
      { title: "Mission & Vision", href: "/about" },
      { title: "Leadership", href: "/about" },
      { title: "Core Values", href: "/about" },
      { title: "Services", href: "/services" },
    ],
  },
  {
    group: "Ministries",
    items: [
      { title: "WOFBI", href: "/wofbi" },
      { title: "Homecell", href: "/homecell" },
      { title: "Businessmen Fellowship", href: "/services" },
      { title: "Women's Fellowship", href: "/services" },
      { title: "Youth Alive", href: "/service-units" },
      { title: "Teens Church", href: "/service-units" },
      { title: "Children's Ministry", href: "/service-units" },
      { title: "Education", href: "/education" },
    ],
  },
  {
    group: "Resources",
    items: [
      { title: "Media Library", href: "/media" },
      { title: "Book Library", href: "/library" },
      { title: "Photo Gallery", href: "/gallery" },
      { title: "Testimonies", href: "/testimonies" },
      { title: "Prayer Requests", href: "/prayer" },
    ],
  },
  {
    group: "Get Involved",
    items: [
      { title: "Join a Service Unit", href: "/service-units" },
      { title: "Give Online", href: "/giving" },
      { title: "Prayer Team", href: "/prayer" },
      { title: "Volunteer", href: "/service-units" },
      { title: "Contact Us", href: "/contact" },
      { title: "Church Location", href: "/location" },
    ],
  },
];
