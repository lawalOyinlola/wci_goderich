"use client";

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import HeroTemplate from "@/components/HeroTemplate";
import CtaSection from "@/components/CtaSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  ArrowDownIcon,
  HandHeartIcon,
  HandWavingIcon,
  MusicNotesIcon,
  HandshakeIcon,
  VideoCameraIcon,
  BroomIcon,
  MegaphoneIcon,
  HandsPrayingIcon,
  MaskHappyIcon,
  FlowerLotusIcon,
  ShieldCheckIcon,
  FirstAidIcon,
  TrafficConeIcon,
  BusIcon,
  BalloonIcon,
  type Icon,
} from "@phosphor-icons/react";

interface ServiceUnit {
  name: string;
  description: string;
  icon: Icon;
}

// The departments members can serve in across the church.
const SERVICE_UNITS: ServiceUnit[] = [
  {
    name: "Ushering",
    description:
      "Welcome and seat the congregation, keep order, and offer every guest a warm first impression of the house.",
    icon: HandWavingIcon,
  },
  {
    name: "Choir & Music",
    description:
      "Lead the church into worship through song, ministering in praise and the presence of God.",
    icon: MusicNotesIcon,
  },
  {
    name: "Protocol",
    description:
      "Receive ministers, guests, and dignitaries, ensuring they are honoured and cared for throughout each service.",
    icon: HandshakeIcon,
  },
  {
    name: "Technical & Media",
    description:
      "Run sound, lighting, projection, and the live stream so every service is seen and heard clearly.",
    icon: VideoCameraIcon,
  },
  {
    name: "Sanctuary Keepers",
    description:
      "Keep the auditorium spotless and service-ready, maintaining a clean and welcoming house of worship.",
    icon: BroomIcon,
  },
  {
    name: "Evangelism",
    description:
      "Reach the community with the gospel and follow new converts into the family of faith.",
    icon: MegaphoneIcon,
  },
  {
    name: "Intercessory",
    description:
      "Stand in the gap in prayer for the church, its leadership, and every service and program.",
    icon: HandsPrayingIcon,
  },
  {
    name: "Welfare & Hospitality",
    description:
      "Care for the practical needs of members and make first-time guests feel right at home.",
    icon: HandHeartIcon,
  },
  {
    name: "Children's Church",
    description:
      "Teach, care for, and create a safe, joyful space for children during services so faith takes root early.",
    icon: BalloonIcon,
  },
  {
    name: "Drama",
    description:
      "Present the message of Christ through creative drama, skits, and stage productions.",
    icon: MaskHappyIcon,
  },
  {
    name: "Decoration",
    description:
      "Beautify the sanctuary for services, celebrations, and special programs throughout the year.",
    icon: FlowerLotusIcon,
  },
  {
    name: "Security",
    description:
      "Safeguard the premises and congregation so worship can happen in peace and safety.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Medical",
    description:
      "Provide first aid and on-site health support to members during services and events.",
    icon: FirstAidIcon,
  },
  {
    name: "Traffic & Parking",
    description:
      "Direct vehicles and manage parking so arrivals and departures flow smoothly and safely.",
    icon: TrafficConeIcon,
  },
  {
    name: "Transportation",
    description:
      "Move members, teams, and equipment to and from services, outreaches, and church programs.",
    icon: BusIcon,
  },
];

export default function ServiceUnitsPage() {
  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Service Units"
        description="There's a place for everyone to serve. Discover the departments that keep our church running and find where your gifts belong."
        backgroundImage="/images/ministries.jpeg"
      >
        <AnimatedButton
          href="#units"
          text="Explore Units"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href="/contact-us?subject=service-unit#contact-form"
          text="Join a Unit"
          icon={<HandHeartIcon weight="bold" />}
          size="lg"
        />
      </HeroTemplate>

      {/* Intro */}
      <section className="bg-card">
        <div className="small-container max-w-4xl">
          <Reveal>
            <SectionHeader
              subtitle="Serve With Us"
              title="Every Hand Has a Place"
              description="Service units are the teams that make worship happen — from the welcome at the door to the sound in your ears. Serving is how we grow, build community, and put our faith to work. Whatever your gift, there's a unit ready for you."
            />
          </Reveal>
        </div>
      </section>

      {/* Units */}
      <section id="units" className="scroll-mt-24 bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Departments"
              title="Our Service Units"
              description="Each unit plays a vital part in the life of the church."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {SERVICE_UNITS.map((unit) => {
              const Icon = unit.icon;
              return (
                <StaggerItem key={unit.name}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                    <div className="h-11 w-11 rounded-full bg-primary/10 flex-center mb-4">
                      <Icon className="h-5 w-5 text-primary" weight="duotone" />
                    </div>
                    <h3 className="font-semibold tracking-tight mb-2">
                      {unit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {unit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Feature band */}
      <section className="bg-card">
        <div className="small-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <Reveal variant="slide-right" className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/church-welcome.jpeg"
                alt="Members serving and worshipping together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal variant="slide-left">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                Find Your Place
              </p>
              <h2 className="text-3xl md:text-4xl tracking-tight mb-5">
                Serving is where faith comes alive
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you serve, you become part of something bigger than a Sunday
                service. You build friendships, sharpen your gifts, and help
                create a place where lives are changed week after week.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                No experience needed — just a willing heart. Our unit leaders
                will guide you every step of the way.
              </p>
              <AnimatedButton
                href="/contact-us?subject=service-unit#contact-form"
                text="Talk to a Unit Leader"
                icon={<HandshakeIcon weight="bold" />}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Ready to Serve?"
        description="Join a service unit and put your gifts to work in the house of God."
        mainText="Tell us a little about yourself and the kind of work you enjoy, and we'll help you find the unit where you'll thrive. There's a place here with your name on it."
        buttons={[
          { text: "Join a Unit", href: "/contact-us?subject=service-unit#contact-form" },
          { text: "Explore Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}