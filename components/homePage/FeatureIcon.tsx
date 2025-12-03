"use client";

import {
  ChurchIcon,
  HeartIcon,
  UsersThreeIcon,
  type Icon,
} from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  ChurchIcon,
  HeartIcon,
  UsersThreeIcon,
};

interface FeatureIconProps {
  iconName: string;
}

export function FeatureIcon({ iconName }: FeatureIconProps) {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent weight="duotone" size={54} className="text-accent" />;
}
