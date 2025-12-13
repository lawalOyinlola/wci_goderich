"use client";

import Link from "next/link";
import { Button } from "./button";
import { CaretDoubleRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface CaretButtonProps {
  href: string;
  text: string;
  className?: string;
}

const CaretButton = ({ href, text, className }: CaretButtonProps) => {
  return (
    <Button
      variant="link"
      size="sm"
      className={cn("group w-fit flex items-center gap-1", className)}
      asChild
    >
      <Link href={href}>
        {text}
        <CaretDoubleRightIcon className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-150 size-3" />
      </Link>
    </Button>
  );
};

export default CaretButton;
