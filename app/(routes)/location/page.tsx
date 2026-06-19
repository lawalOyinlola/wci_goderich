"use client";

import SectionHeader from "@/components/SectionHeader";
import HeroTemplate from "@/components/HeroTemplate";
import CtaSection from "@/components/CtaSection";
import ChurchLocationMap from "@/components/homePage/ChurchLocationMap";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SERVICES, CHURCH_INFO } from "@/lib/constants";
import { formatServiceSchedule } from "@/lib/utils";
import {
  ArrowDownIcon,
  NavigationArrowIcon,
  MapPinIcon,
  CarIcon,
  SignpostIcon,
  WheelchairIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@phosphor-icons/react";

const { CHURCH_LOCATION, CONTACT, NAME } = CHURCH_INFO;
const { address, coordinates, parking, description, directions, accessibility } =
  CHURCH_LOCATION;
const { lat, lng } = coordinates;

const FULL_ADDRESS = `${address.street}, ${address.city}, ${address.region}, ${address.country}`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export default function LocationPage() {
  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Visit Us"
        description={description}
        backgroundImage="/images/location_hero.jpeg"
        className="bg-linear-to-br from-slate-950 via-zinc-900 to-stone-900"
      >
        <AnimatedButton
          href="#map"
          text="View on Map"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href={DIRECTIONS_URL}
          text="Get Directions"
          icon={<NavigationArrowIcon weight="bold" className="rotate-90" />}
          size="lg"
        />
      </HeroTemplate>

      {/* Map */}
      <section id="map" className="scroll-mt-24 bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Map"
              title="Where to Find Us"
              description={`Located at ${FULL_ADDRESS}.`}
            />
          </Reveal>

          <Reveal variant="fade-up" className="overflow-hidden rounded-2xl shadow-lg">
            <ChurchLocationMap />
          </Reveal>
        </div>
      </section>

      {/* Getting Here */}
      <section className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Getting Here"
              title="Plan Your Journey"
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <StaggerItem>
              <div className="border-l-2 border-primary pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="h-4 w-4 text-primary" weight="duotone" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Address
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  {FULL_ADDRESS}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-primary/40 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <SignpostIcon
                    className="h-4 w-4 text-primary/70"
                    weight="duotone"
                  />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Directions
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  {directions}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-primary/40 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <CarIcon
                    className="h-4 w-4 text-primary/70"
                    weight="duotone"
                  />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Parking
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  {parking}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Service Times */}
      <section className="bg-card">
        <div className="small-container max-w-3xl">
          <Reveal>
            <SectionHeader
              subtitle="Service Times"
              title="When We Gather"
              description="Come and worship with us — there's a service for every day of the week."
            />
          </Reveal>

          <Stagger
            as="ul"
            className="divide-y border-t border-b"
          >
            {SERVICES.filter(
              (service) => service.title !== "Spiritual Week of Emphasis"
            ).map((service) => (
              <StaggerItem key={service.id} as="li">
                <div className="flex items-center gap-4 py-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                    <CalendarIcon
                      className="h-5 w-5 text-primary"
                      weight="duotone"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 flex-1 min-w-0">
                    <p className="font-semibold text-sm">{service.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {formatServiceSchedule(service)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Accessibility */}
      <section className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Accessibility"
              title="Welcoming to All"
              description="We're committed to making everyone feel at home. Our facilities include:"
            />
          </Reveal>

          <Stagger className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {accessibility.map((item, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors duration-200 cursor-default">
                  <WheelchairIcon
                    className="h-4 w-4 text-primary/60"
                    weight="duotone"
                  />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-card">
        <div className="small-container max-w-3xl">
          <Reveal>
            <SectionHeader
              subtitle="Contact"
              title="Reach Out Before You Visit"
              description="Have a question or need directions? We're glad to help."
            />
          </Reveal>

          <Stagger className="divide-y">
            <StaggerItem>
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-4 py-6 group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                  <PhoneIcon
                    className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Phone</p>
                  <p className="text-sm text-muted-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {CONTACT.phone}
                  </p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 py-6 group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                  <EnvelopeIcon
                    className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-sm text-muted-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {CONTACT.email}
                  </p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-4 py-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                  <ClockIcon
                    className="h-5 w-5 text-primary"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Office Hours</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {CONTACT.officeHours}
                  </p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="We'd Love to See You"
        description={`Plan a visit to ${NAME} and experience worship with our family.`}
        mainText="Whether it's your first time or you're returning, you're always welcome here. Come as you are — we've saved a seat for you."
        buttons={[
          { text: "Get Directions", href: DIRECTIONS_URL },
          { text: "View Our Services", href: "/services" },
        ]}
      />
    </div>
  );
}