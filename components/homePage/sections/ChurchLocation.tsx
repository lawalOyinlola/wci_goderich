import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import ChurchLocationMap from "../ChurchLocationMap";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CHURCH_INFO, SERVICES } from "@/lib/constants";
import { getDirectionsUrl } from "@/lib/utils";

const { CHURCH_LOCATION, CONTACT } = CHURCH_INFO;
const { lat, lng } = CHURCH_LOCATION.coordinates;
const DIRECTIONS_URL = getDirectionsUrl(lat, lng);
const SUNDAY = SERVICES[0];

// "07:00AM" -> "7:00 AM"
const formatTime = (time: string) =>
  time.replace(/^0/, "").replace(/(AM|PM)$/, " $1");

// Cards float over the map; a soft, wide shadow lifts them off the tiles.
const FLOAT =
  "border border-border bg-background shadow-[0_12px_40px_-12px_rgba(15,23,42,0.22)]";

export default function ChurchLocation() {
  return (
    <section className="bg-background">
      <Reveal className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 pt-24 md:grid-cols-2 md:items-end md:pt-32">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Find Our Location
        </h2>
        <p className="max-w-md text-muted-foreground md:justify-self-end">
          {CHURCH_LOCATION.description}
        </p>
      </Reveal>

      <div className="relative">
        <div className="h-105 sm:h-130 lg:h-170">
          {/* The floating column is 22rem wide, so shifting the pin right by
              half of it keeps the church visible beside the cards. */}
          <ChurchLocationMap variant="bare" pinOffsetX={176} />
        </div>

        {/* Phones: the cards follow the map and overlap its bottom edge.
            lg and up: they float over the left side of the map. */}
        <div className="relative z-1000 -mt-14 px-4 pb-16 lg:pointer-events-none lg:absolute lg:inset-0 lg:m-0 lg:p-0">
          <div className="mx-auto flex h-full max-w-6xl items-center lg:px-4">
            <Stagger className="pointer-events-auto flex w-full flex-col gap-3 sm:max-w-sm lg:w-88">
              <StaggerItem className={`rounded-xl p-6 ${FLOAT}`}>
                <div className="flex items-start gap-3">
                  <MapPinIcon
                    aria-hidden="true"
                    weight="fill"
                    className="mt-0.5 size-5 shrink-0 text-primary"
                  />
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      Church address
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {CHURCH_LOCATION.address.full}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[background-color,scale] duration-150 ease-out hover:bg-primary/90 active:scale-[0.97]"
                  >
                    Get directions
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      weight="bold"
                      className="size-4"
                    />
                    <span className="sr-only">
                      (opens Google Maps in a new tab)
                    </span>
                  </a>
                  <Link
                    href="/location"
                    className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
                  >
                    Visitor guide
                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                      className="size-3.5 text-primary transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </StaggerItem>

              <StaggerItem className={`rounded-xl p-6 ${FLOAT}`}>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Sunday services
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {SUNDAY.times.map((time) => (
                    <li
                      key={time}
                      className="rounded-md bg-primary/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-primary"
                    >
                      {formatTime(time)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#services"
                  className="mt-4 inline-block text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-primary"
                >
                  Weekday services and prayer times
                </a>
              </StaggerItem>

              <StaggerItem>
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-primary ${FLOAT}`}
                    >
                      <PhoneIcon
                        aria-hidden="true"
                        weight="fill"
                        className="size-4 text-primary"
                      />
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-primary ${FLOAT}`}
                    >
                      <EnvelopeSimpleIcon
                        aria-hidden="true"
                        weight="fill"
                        className="size-4 text-primary"
                      />
                      {CONTACT.email}
                    </a>
                  </li>
                  <li
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground ${FLOAT}`}
                  >
                    <ClockIcon
                      aria-hidden="true"
                      weight="fill"
                      className="size-4 text-primary"
                    />
                    <span>
                      <span className="sr-only">Office hours: </span>
                      {CONTACT.officeHours.replace(": ", ", ")}
                    </span>
                  </li>
                </ul>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
