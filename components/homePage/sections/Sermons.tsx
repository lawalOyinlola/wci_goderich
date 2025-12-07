import Image from "next/image";
import { SERMONS } from "@/lib/constants";
import SermonBtn from "../SermonBtn";
import SectionHeader from "@/components/SectionHeader";

export default function Sermons() {
  return (
    <section className="py-24">
      <div className="small-container">
        <SectionHeader
          title="Church Sermons"
          subtitle="Sermons"
          description="Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia"
        />

        <div className="flex flex-wrap justify-center gap-8">
          {SERMONS.map((sermon, index) => (
            <div
              key={sermon.id}
              className="group relative overflow-hidden text-center flex flex-col basis-full sm:basis-[calc(50%-theme(space.8)/2)] lg:basis-[calc(33.333%-theme(space.8)/1.5)] max-w-[420px]"
            >
              {/* Image Container */}
              <div className="relative aspect-[1] shadow-lg overflow-hidden">
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/60" />
                <div className="absolute inset-0 border border-[rgba(253,252,251,0.3)] m-4" />

                {/* Pastor Name */}
                <div className="absolute top-1/2 left-1/2 -translate-1/2 text-white flex flex-col items-center gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]">
                      BY PASTOR:
                    </p>
                    <p className="font-outfit italic text-2xl -tracking-tight font-medium my-1">
                      {sermon.pastor}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <SermonBtn />
                </div>
              </div>

              {/* Sermon Info */}
              <div className="p-6">
                <h3 className="text-2xl font-normal mb-1">{sermon.title}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  {sermon.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
