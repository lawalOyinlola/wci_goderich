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

// Services data
const servicesData = [
  {
    id: 1,
    icon: <ChurchIcon weight="duotone" size={48} className="text-accent" />,
    title: "Sunday Worship",
    description: "Join us every Sunday for inspiring worship and fellowship.",
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
    description: "Come together in prayer and support with our community.",
    schedule: "Wednesdays: 06:00PM",
    accentColor: "text-accent",
  },
  {
    id: 4,
    icon: <HandsPrayingIcon size={48} weight="duotone" />,
    title: "Covenant Hour of Prayer",
    description: "Join us every Sunday for inspiring worship and fellowship.",
    schedule: "Weekdays: 06:00AM | Saturday: 07:00AM",
    accentColor: "text-accent",
  },
  {
    id: 5,
    icon: <CrossIcon size={48} weight="duotone" />,
    title: "Spiritual Week of Emphasis",
    description:
      "Come together in prayer and support with our community every first week of the month.",
    schedule: "Wednesdays - Friday: 06:00PM",
    accentColor: "text-accent",
  },
  {
    id: 6,
    icon: <HouseLineIcon size={48} weight="duotone" />,
    title: "Home Cell",
    description:
      "Come together in prayer and support with our community every first week of the month.",
    schedule: "Saturdays: 05:00PM",
    accentColor: "text-accent",
  },
];

export default function ChurchServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeader title="Church Services" subtitle="Services" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {servicesData.map((service) => (
          <Card
            key={service.id}
            className="text-center hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-col items-center justify-center">
              <div
                className={`mb-2 ${
                  service.accentColor ? service.accentColor : "text-accent"
                }`}
              >
                {service.icon}
              </div>
              <CardTitle className="text-xl tracking-tight font-lora font-semibold">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="uppercase font-medium text-sm text-card-foreground">
                {service.schedule}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
