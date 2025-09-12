"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import { ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
import LogoTitle from "./LogoTitle";

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
            className
          )}
          {...props}
        >
          <div className="text-md font-semibold leading-none text-foreground">
            {title}
          </div>
          {children && (
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </div>
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
            <div className="relative w-10 h-10">
              <Image
                src="/lfc_logo.png"
                alt="Living Faith Church Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ListIcon weight="bold" color="#f8fafc" className="size-7" />

                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-[400px] p-0 bg-foreground/30 dark:bg-background/30 border-none dark:border-slate-700/20 rounded-l-2xl shadow-2xl backdrop-blur-sm"
            >
              <SheetHeader className="px-6 py-6 border-b border-border/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent">
                <SheetTitle
                  className="text-left text-[#f8fafc]!"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogoTitle />
                </SheetTitle>
                <p className="text-sm text-primary-foreground dark:text-muted-foreground mt-2">
                  Welcome to WCI Goderich
                </p>
              </SheetHeader>

              <div className="flex flex-col h-full">
                <nav className="flex-1 px-6 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                  >
                    {navItems.map((item) =>
                      "items" in item ? (
                        <AccordionItem
                          key={item.label}
                          value={item.label}
                          className="border border-border/30 rounded-xl overflow-hidden bg-card/60 hover:bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <AccordionTrigger className="px-5 py-4 text-base font-semibold hover:no-underline hover:bg-accent/15 transition-all duration-200 group">
                            <span className="flex items-center gap-3">
                              <span className="group-hover:text-accent transition-colors duration-200">
                                {item.label}
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-4 bg-gradient-to-b from-transparent to-accent/5">
                            <div className="space-y-1.5 pt-2">
                              {item.items.map((subItem, index) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href as Route}
                                  className="block px-4 py-2.5 text-sm text-foreground dark:text-muted-foreground hover:text-foreground hover:bg-accent/15 rounded-lg transition-all duration-200 group border border-transparent hover:border-accent/20"
                                  onClick={() => setIsMenuOpen(false)}
                                  style={{ animationDelay: `${index * 50}ms` }}
                                >
                                  <span className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-accent group-hover:scale-125 transition-all duration-200"></div>
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                                      {subItem.label}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center justify-between w-full px-5 py-4 text-base font-lora font-semibold border border-border/30 rounded-xl hover:border-accent/40 transition-all duration-300 group bg-card/60 hover:bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="group-hover:text-accent transition-colors duration-200">
                              {item.label}
                            </span>
                          </span>
                          <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent group-hover:scale-125 transition-all duration-200"></div>
                        </Link>
                      )
                    )}
                  </Accordion>
                </nav>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 px-6 py-6 border-t border-border/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border/30 text-[#fdfcfb] h-11"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/giving">Give Now</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="h-11"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/prayer">Prayer Request</Link>
                  </Button>

                  {/* Additional quick links */}
                  <div className="border-t border-border/20">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs text-[#f8fafc] hover:text-accent hover:bg-accent/10 rounded-lg py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/contact">Contact</Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs text-[#f8fafc] hover:text-accent hover:bg-accent/10 rounded-lg py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/location">Location</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left Section - Logo */}
          <div className="flex-1 flex justify-start ml-2">
            <Link href="/">
              <div className="relative w-10 h-10">
                <Image
                  src="/lfc_logo.png"
                  alt="Living Faith Church Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
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
