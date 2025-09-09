"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

const navItems = [
  { label: "About", href: "/about" },
  {
    label: "Ministries",
    items: [
      {
        label: "Children's Ministry",
        description:
          "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
        href: "/ministries",
        ageRange: "Ages 3-12",
        activities: [
          "Sunday School",
          "Vacation Bible School",
          "Children's Choir",
          "Bible Games",
        ],
      },
      {
        label: "Teens Church",
        description:
          "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
        href: "/ministries",
        ageRange: "Ages 3-12",
        activities: [
          "Sunday School",
          "Vacation Bible School",
          "Children's Choir",
          "Bible Games",
        ],
      },
      {
        label: "Youth Alive",
        description:
          "Empowering teenagers to grow in their faith through relevant teachings, activities, and peer support.",
        href: "/ministries",
        ageRange: "Ages 13-18",
        activities: [
          "Youth Bible Study",
          "Fellowship Events",
          "Mentorship",
          "Outreach Programs",
        ],
      },
      {
        label: "Women's Ministry",
        description:
          "Supporting and encouraging women in their spiritual journey through fellowship, prayer, and Bible study.",
        href: "/ministries",
        activities: [
          "Women's Bible Study",
          "Prayer Groups",
          "Fellowship Events",
          "Outreach Programs",
        ],
      },
      {
        label: "Businessmen Fellowship",
        description:
          "Building strong men of God through accountability, mentorship, and spiritual development.",
        href: "/ministries",
        activities: [
          "Men's Bible Study",
          "Accountability Groups",
          "Leadership Training",
          "Community Service",
        ],
      },
      {
        label: "Pastors",
        href: "/pastors",
        description: "Meet our dedicated pastoral team and leadership.",
      },
    ],
  },
  {
    label: "Events & Activities",
    items: [
      {
        label: "Services",
        href: "/services",
        description: "Join our weekly services and worship with us.",
      },
      {
        label: "Service Units",
        href: "/service-units",
        description: "Find a unit to serve and grow your faith.",
      },
      {
        label: "Homecell",
        href: "/homecell",
        description:
          "Connect with a small group near you for fellowship and Bible study.",
      },
      {
        label: "WOFBI",
        href: "/wofbi",
        description:
          "Enroll in our Word of Faith Bible Institute for theological education.",
      },
      {
        label: "Location",
        href: "/location",
        description: "Find our church location and get directions.",
      },
      {
        label: "Events",
        href: "/events",
        description:
          "Discover upcoming events, conferences, and special programs.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Media",
        href: "/media",
        description:
          "Watch recent sermons, live streams, and multimedia content.",
      },
      {
        label: "Library",
        href: "/library",
        description:
          "Access our digital library of books, teachings, and resources.",
      },
      {
        label: "Gallery",
        href: "/gallery",
        description:
          "View photos from our recent events, services, and community activities.",
      },
      {
        label: "Testimonies",
        href: "/testimonies",
        description:
          "Read and share testimonies of God's faithfulness in our lives.",
      },
      {
        label: "Prayer",
        href: "/prayer",
        description: "Submit prayer requests and join our prayer ministry.",
      },
      {
        label: "Education",
        href: "/education",
        description:
          "Explore our educational programs, Bible studies, and learning resources.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

const ListItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-transparent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground",
            // "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-semibold leading-none text-foreground">
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default function ChurchNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 z-50 px-4">
      <div className="container mt-5 p-2 bg-foreground/30 dark:bg-background/30 border-none dark:border-slate-700/20 rounded-2xl shadow-2xl backdrop-blur-sm">
        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/">
            <Image
              src="/lfc_logo.png"
              alt="Living Faith Church Logo"
              width={40}
              height={40}
            />
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[320px]">
              <SheetHeader>
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">WCI</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg tracking-wide text-foreground">
                      WCI Goderich
                    </p>
                    <p className="text-xs text-foreground/60">
                      Living Faith Church
                    </p>
                  </div>
                </Link>
              </SheetHeader>
              <nav className="mt-8">
                <Accordion type="multiple" className="w-full">
                  {navItems.map((item) =>
                    "items" in item ? (
                      <AccordionItem key={item.label} value={item.label}>
                        <AccordionTrigger className="text-base font-medium">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 flex flex-col gap-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href as Route}
                                className="text-muted-foreground hover:text-foreground transition-colors py-1"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between w-full py-4 text-base font-medium border-b"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </Accordion>
                <Button
                  asChild
                  className="w-full mt-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/giving">Give Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav - Three equal sections */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left Section - Logo */}
          <div className="flex-1 flex justify-start ml-2">
            <Link href="/">
              <Image
                src="/lfc_logo.png"
                alt="Living Faith Church Logo"
                width={40}
                height={40}
              />
            </Link>
          </div>

          {/* Center Section - Navigation Menu */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {"items" in item ? (
                      <>
                        <NavigationMenuTrigger>
                          {item.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <AnimatedBackground
                              className="bg-accent/15 rounded-sm"
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                              enableHover
                            >
                              {item.items.map((subItem, index) => (
                                <ListItem
                                  key={subItem.label}
                                  href={subItem.href as Route}
                                  title={subItem.label}
                                  data-id={`card-${index}`}
                                >
                                  {subItem.description}
                                </ListItem>
                              ))}
                            </AnimatedBackground>
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "hover:bg-accent/80!"
                        )}
                        asChild
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex-1 flex justify-end items-center gap-1.5">
            <Button
              variant="outline"
              size="lg"
              className="border-border/30 text-[#fdfcfb]"
              asChild
            >
              <Link href="/giving">Give Now</Link>
            </Button>
            <Button variant="destructive" size="lg" asChild>
              <Link href="/prayer">Prayer Request</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
