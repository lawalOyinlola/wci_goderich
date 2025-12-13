"use client";

import { cn } from "@/lib/utils";
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
  type Icon,
} from "@phosphor-icons/react";

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
};

interface IconComponentProps {
  iconName: string;
  size?: number;
  className?: string;
}

export function IconComponent({
  iconName,
  size,
  className,
}: IconComponentProps) {
  const Icon = iconMap[iconName];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      weight="duotone"
      size={size || 54}
      className={cn("text-accent transition-all duration-300", className)}
    />
  );
}
