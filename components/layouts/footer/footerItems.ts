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
      { title: "Our Story", href: "/about#hero" },
      { title: "Mission & Vision", href: "/about#mission-vision" },
      { title: "Leadership", href: "/about#leadership" },
      { title: "Services", href: "/services#hero" },
    ],
  },
  {
    group: "Ministries",
    items: [
      { title: "WOFBI", href: "/wofbi#hero" },
      { title: "Satellite Fellowship", href: "/wsf#hero" },
      { title: "Businessmen Fellowship", href: "/ministries/businessmen#hero" },
      // { title: "Women's Fellowship", href: "/services" },
      { title: "Youth Alive", href: "/ministries/youth#hero" },
      { title: "Teens Church", href: "/ministries/teens#hero" },
      { title: "Children's Ministry", href: "/ministries/children#hero" },
      { title: "Education", href: "/education#hero" },
    ],
  },
  {
    group: "Resources",
    items: [
      { title: "Media Library", href: "/media#hero" },
      { title: "Book Library", href: "/library#hero" },
      { title: "Photo Gallery", href: "/gallery#hero" },
      { title: "Testimonies", href: "/testimonies#hero" },
      { title: "Prayer Requests", href: "/prayer#prayer-request" },
    ],
  },
  {
    group: "Get Involved",
    items: [
      { title: "Join a Service Unit", href: "/service-units" },
      { title: "Give Online", href: "/giving#hero" },
      { title: "Prayer Team", href: "/prayer#prayer-sessions" },
      { title: "Volunteer", href: "/service-units#hero" },
      { title: "Contact Us", href: "/contact-us#hero" },
      { title: "Church Location", href: "/location#hero" },
    ],
  },
];
