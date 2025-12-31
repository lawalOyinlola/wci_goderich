"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { LEADERSHIP } from "@/lib/constants";
import { LeadershipRole } from "@/lib/types/leadership";
import { cn } from "@/lib/utils";

const Leadership = () => {
  const { title, subtitle, description, PASTORS, DIRECTORS } = LEADERSHIP;
  const [activeLeaderId, setActiveLeaderId] = useState<string | null>(null);

  const filteredPastors = PASTORS.filter(
    (pastor) =>
      pastor.role === LeadershipRole.RESIDENT_PASTOR ||
      pastor.role === LeadershipRole.ASSOCIATE_PASTOR
  );

  const filteredDirectors = DIRECTORS.filter(
    (director) => director.role === LeadershipRole.CHAIRMAN
  );

  const leaders = [...filteredPastors, ...filteredDirectors];

  return (
    <section className="bg-muted/30">
      <div className="small-container">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <div className="mt-12 md:mt-24">
          <div className="max-w-4xl mx-auto grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, index) => {
              const leaderId = leader.id || `leader-${index}`;
              const isActive = activeLeaderId === leaderId;

              return (
                <div
                  key={leaderId}
                  className="group overflow-hidden"
                  onMouseEnter={() => setActiveLeaderId(leaderId)}
                  onMouseLeave={() => setActiveLeaderId(null)}
                  // onTouchStart={() => setActiveLeaderId(leaderId)}
                  // onTouchEnd={() => setActiveLeaderId(null)}
                  onTouchStart={() =>
                    setActiveLeaderId((prev) =>
                      prev === leaderId ? null : leaderId
                    )
                  }
                >
                  <Image
                    className={cn(
                      "h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500",
                      "hover:grayscale-0 group-hover:h-90 group-hover:rounded-xl",
                      isActive && "grayscale-0 h-90 rounded-xl"
                    )}
                    src={leader.image}
                    alt={`${leader.title} - ${leader.name}`}
                    width={826}
                    height={1239}
                  />
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between">
                      <h3
                        className={cn(
                          "text-base font-medium transition-all duration-500",
                          "group-hover:tracking-wider",
                          isActive && "tracking-wider"
                        )}
                      >
                        {leader.name}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span
                        className={cn(
                          "text-muted-foreground inline-block text-sm transition duration-300",
                          "translate-y-6 opacity-0",
                          "group-hover:translate-y-0 group-hover:opacity-100",
                          // Mobile touch states
                          isActive && "translate-y-0 opacity-100"
                        )}
                      >
                        {leader.title}
                      </span>
                      {"phone" in leader && leader.phone && (
                        <a
                          href={`tel:${leader.phone}`}
                          className={cn(
                            "inline-block text-sm tracking-wide transition-all duration-500",
                            "translate-y-8 opacity-0",
                            "group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-y-0 group-hover:opacity-100 hover:underline",
                            isActive &&
                              "text-primary-600 dark:text-primary-400 translate-y-0 opacity-100"
                          )}
                        >
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
