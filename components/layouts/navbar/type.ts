import type { Route } from "next";

export interface NavSubItem {
  label: string;
  href: Route;
  description?: string;
  ageRange?: string;
  activities?: string[];
}

export interface NavItemWithSubItems {
  label: string;
  items: NavSubItem[];
}

export interface NavItemWithoutSubItems {
  label: string;
  href: Route;
}

export type NavItem = NavItemWithSubItems | NavItemWithoutSubItems;

export function isNavItemWithSubItems(
  item: NavItem
): item is NavItemWithSubItems {
  return "items" in item;
}
