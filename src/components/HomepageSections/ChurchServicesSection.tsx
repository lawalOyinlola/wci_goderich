"use client";

import {
  BreadIcon,
  ChurchIcon,
  ClockCountdownIcon,
  CrossIcon,
  HandsPrayingIcon,
  HouseLineIcon,
} from "@phosphor-icons/react";
import SectionHeader from "../SectionHeader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
// import { MagicCard } from "@/components/magicui/magic-card";
// import { useTheme } from "next-themes";
import { BorderTrail } from "@/components/motion-primitives/border-trail";

// Services data
const servicesData = [
  {
    id: 1,
    icon: <ChurchIcon weight="duotone" size={48} className="text-accent" />,
    title: "Sunday Worship",
    description:
      "Experience powerful worship, inspiring messages, and spiritual fellowship every Sunday morning.",
    schedule: "07:00AM | 09:00AM | 11:00AM",
    accentColor: "text-accent",
  },
  {
    id: 2,
    icon: (
      <ClockCountdownIcon size={48} weight="duotone" className="rotate-270" />
    ),
    title: "90 Min with Jesus",
    description: "Deepen your faith through our weekly Bible study groups.",
    schedule: "Mondays: 06:00PM",
    accentColor: "text-accent",
  },
  {
    id: 3,
    icon: <BreadIcon size={48} weight="duotone" />,
    title: "Communion Service",
    description:
      "Participate in the sacred communion service, remembering Christ's sacrifice and sharing in fellowship.",
    schedule: "Wednesdays: 06:00PM",
    accentColor: "text-accent",
  },
  {
    id: 4,
    icon: <HandsPrayingIcon size={48} weight="duotone" />,
    title: "Covenant Hour of Prayer",
    description:
      "Join our daily prayer sessions to intercede for the church, community, and personal spiritual growth.",
    schedule: "Weekdays: 06:00AM | Saturday: 07:00AM",
    accentColor: "text-accent",
  },
  {
    id: 5,
    icon: <CrossIcon size={48} weight="duotone" />,
    title: "Spiritual Week of Emphasis",
    description:
      "Intensive spiritual focus with special teachings, prayer, and fasting during the first week of each month.",
    schedule: "Wednesdays - Friday: 06:00PM",
    accentColor: "text-accent",
  },
  {
    id: 6,
    icon: <HouseLineIcon size={48} weight="duotone" />,
    title: "Home Cell",
    description:
      "Join intimate home-based fellowship groups for Bible study, prayer, and building close-knit community relationships.",
    schedule: "Saturdays: 05:00PM",
    accentColor: "text-accent",
  },
];

export default function ChurchServicesSection() {
  // const { theme } = useTheme();

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeader title="Church Services" subtitle="Services" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {servicesData.map((service) => (
          <Card
            key={service.id}
            className="group py-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm border-0 rounded-none"
          >
            {/* <MagicCard
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              gradientSize={150}
              className="h-full py-6 text-center"
            > */}
            <BorderTrail
              className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-linear-to-l from-secondary-foreground via-accent to-chart-5 "
              size={250}
            />
            <CardHeader className="flex flex-col gap-6 items-center justify-center">
              <div
                className={`mb-2 ${
                  service.accentColor ? service.accentColor : "text-accent"
                }`}
              >
                {service.icon}
              </div>
              <CardTitle className="text-xl tracking-tight font-bold line-clamp-1">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 justify-center pb-2">
              <CardDescription className="text-center text-muted-foreground line-clamp-3">
                {service.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="justify-center">
              <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold uppercase line-clamp-2">
                {service.schedule}
              </div>
            </CardFooter>
            {/* </MagicCard> */}
          </Card>
        ))}
      </div>
    </section>
  );
}
