import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { LEADERSHIP } from "@/lib/constants";
import { LeadershipRole } from "@/lib/types";

const Leadership = () => {
  const { title, subtitle, description, PASTORS, DIRECTORS } = LEADERSHIP;

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
            {leaders.map((leader, index) => (
              <div key={leader.id || index} className="group overflow-hidden">
                <Image
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={leader.image}
                  alt={`${leader.title} - ${leader.name}`}
                  width={826}
                  height={1239}
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {leader.name}
                    </h3>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {leader.title}
                    </span>
                    {"phone" in leader && leader.phone && (
                      <a
                        href={`tel:${leader.phone}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
