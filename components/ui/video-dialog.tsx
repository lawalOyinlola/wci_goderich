"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoModal } from "./video-modal";

interface VideoDialogProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgClassName?: string;
  animationStyle?: Parameters<typeof VideoModal>[0]["animationStyle"];
  videoTitle?: string;
}

export function VideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  imgWidth = 1920,
  imgHeight = 1080,
  imgClassName,
  animationStyle = "from-center",
  videoTitle = "Video player",
}: VideoDialogProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className={cn("relative", className)}>
        <button
          type="button"
          aria-label="Play video"
          className="group relative cursor-pointer border-0 bg-transparent p-0 w-full h-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsVideoOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              setIsVideoOpen(true);
            }
          }}
        >
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={imgWidth}
            height={imgHeight}
            className={cn(
              "w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8] pointer-events-none",
              imgClassName
            )}
          />
          <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
            <div className="bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md pointer-events-auto">
              <div className="from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
                <Play
                  className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105 pointer-events-none"
                  style={{
                    filter:
                      "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                  }}
                />
              </div>
            </div>
          </div>
        </button>
      </div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc={videoSrc}
        videoTitle={videoTitle}
        animationStyle={animationStyle}
      />
    </>
  );
}
