"use client";

import {
  ChurchIcon,
  HeartIcon,
  UserIcon,
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
  CreditCardIcon,
  TipJarIcon,
  HandHeartIcon,
  BuildingIcon,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, Icon> = {
  ChurchIcon,
  HeartIcon,
  UserIcon,
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
  CreditCardIcon,
  TipJarIcon,
  HandHeartIcon,
  BuildingIcon,
};

export type ValidIconName = keyof typeof iconMap;

interface IconComponentProps {
  iconName: ValidIconName;
  weight?: "duotone" | "fill" | "bold" | "light" | "regular" | "thin";
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
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${iconName}" not found in iconMap. Available icons:`, Object.keys(iconMap));
    }
    return null;
  }

  return (
    <Icon
      weight={weight}
      size={size || 54}
      className={cn("transition-all duration-300", className)}
    />
  );
}
