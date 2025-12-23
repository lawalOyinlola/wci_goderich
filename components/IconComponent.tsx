"use client";

import {
  ChurchIcon,
  HeartIcon,
  UsersThreeIcon,
  ClockCountdownIcon,
  BreadIcon,
  HandsPrayingIcon,
  CrossIcon,
  HouseLineIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
  FileTextIcon,
  VideoCameraIcon,
  MusicNotesIcon,
  PlayCircleIcon,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, Icon> = {
  ChurchIcon,
  HeartIcon,
  UsersThreeIcon,
  ClockCountdownIcon,
  BreadIcon,
  HandsPrayingIcon,
  CrossIcon,
  HouseLineIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
  FileTextIcon,
  VideoCameraIcon,
  MusicNotesIcon,
  PlayCircleIcon,
};

interface IconComponentProps {
  iconName: string;
  weight?: "duotone" | "fill" | "light" | "regular" | "thin";
  size?: number;
  className?: string;
}

export function IconComponent({
  iconName,
  weight = "duotone",
  size,
  className,
}: IconComponentProps) {
  const Icon = iconMap[iconName];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      weight={weight}
      size={size || 54}
      className={cn("text-accent transition-all duration-300", className)}
    />
  );
}
