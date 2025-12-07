import Image from "next/image";
import { UPCOMING_EVENTS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import CaretButton from "@/components/ui/caret-button";

export default function UpcomingEvents() {
  return (
    <section
      className="py-24 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bg-covenant_exchange.jpg')" }}
    >
      <div className="max-w-500 w-full mx-auto px-4">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Events"
          description="Stay connected and join us for our upcoming church events."
          titleClassName="text-primary-foreground"
          subtitleClassName="text-primary-foreground"
          descriptionClassName="text-primary-foreground"
        />

        <div className="flex flex-wrap justify-center gap-8">
          {UPCOMING_EVENTS.map((event) => {
            // Format date and time for display
            const formatDateTime = () => {
              const eventDate = new Date(event.date);
              const formattedDate = eventDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              if ("endTime" in event && event.endTime) {
                return `${formattedDate} | ${event.startTime} - ${event.endTime}`;
              }
              return `${formattedDate} | ${event.startTime}`;
            };

            return (
              <div
                key={event.id}
                className="cursor-pointer flex h-[300px] w-full flex-row items-stretch sm:w-[calc(50%-theme(spacing.8)/2)] lg:w-[calc(33.333%-theme(spacing.8)/1.5)] max-w-[560px]"
              >
                <div className="relative h-15/16 w-3/7 self-end">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover bg-muted-foreground"
                  />
                </div>
                <div className="relative h-full w-3/5 bg-card p-6 pt-18 text-card-foreground flex flex-col gap-3 justify-start">
                  <div className="max-w-full truncate absolute top-6 -left-5 bg-accent text-primary-foreground px-3 pl-5 py-1 font-semibold text-sm whitespace-nowrap">
                    {formatDateTime()}
                  </div>
                  <p className="text-lg font-normal line-clamp-2 min-h-12 leading-6">
                    {event.title}
                  </p>
                  <p className="text-sm italic text-gray-500 font-lora font-normal line-clamp-1">
                    by: <i className="text-accent">{event.by}</i>
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 min-h-10 grow">
                    {event.address}
                  </p>
                  <CaretButton href="/events" text="Read More" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
