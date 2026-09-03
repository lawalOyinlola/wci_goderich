"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { VideoModal } from "@/components/ui/video-modal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CHURCH_VIDEOS } from "@/lib/constants";
import { PlayIcon } from "@phosphor-icons/react";

/** One shared queue, so the modal's next control moves between every video. */
const PLAYLIST = CHURCH_VIDEOS.map((video) => ({
  src: video.hls,
  fallbackSrc: video.mp4,
  poster: video.poster,
  title: video.title,
  orientation: video.orientation,
}));

export default function ChurchVideos() {
  const [openAt, setOpenAt] = useState<number | null>(null);

  if (CHURCH_VIDEOS.length === 0) return null;

  return (
    <section id="videos" className="scroll-mt-24 bg-muted/30">
      <div className="small-container">
        <Reveal>
          <SectionHeader
            subtitle="Watch"
            title="Church Videos"
            description="Moments from our services and the life of the church in Goderich."
          />
        </Reveal>

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {CHURCH_VIDEOS.map((video, index) => (
            <StaggerItem key={video.id}>
              <button
                type="button"
                onClick={() => setOpenAt(index)}
                aria-label={`Play ${video.title}`}
                className="group w-full text-left cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden rounded-lg border shadow-sm ${
                    video.orientation === "portrait"
                      ? "aspect-3/4"
                      : "aspect-video"
                  }`}
                >
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon weight="fill" size={26} />
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {video.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <VideoModal
        isOpen={openAt !== null}
        onClose={() => setOpenAt(null)}
        videoSrc={PLAYLIST[0].src}
        playlist={PLAYLIST}
        startIndex={openAt ?? 0}
        videoTitle="Church video"
      />
    </section>
  );
}
