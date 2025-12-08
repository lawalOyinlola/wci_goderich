"use client";

import { AnimatedButton } from "../ui/animated-button";
import { PlayIcon, DownloadIcon } from "@phosphor-icons/react";

const SermonBtn = () => {
  return (
    <div className="flex gap-2 tracking-[0.2em]">
      <AnimatedButton
        variant="outline"
        className="bg-transparent hover:bg-accent/80 transition-all text-xs text-white border-none ring-white ring-[0.4px] hover:ring-accent uppercase rounded py-0! px-1.5!"
        text="Watch"
        icon={<PlayIcon weight="fill" />}
        iconPosition="left"
      />

      <AnimatedButton
        variant="outline"
        className="bg-transparent hover:bg-accent/80 transition-all text-xs text-white border-none ring-white ring-[0.4px] hover:ring-accent uppercase rounded py-0! px-1.5!"
        text="Download"
        icon={<DownloadIcon weight="fill" />}
        iconPosition="left"
      />
    </div>
  );
};

export default SermonBtn;
