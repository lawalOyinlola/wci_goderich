"use client";

import Link from "next/link";
import { Button } from "./button";
import { CaretDoubleRightIcon } from "@phosphor-icons/react";

const CaretButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Button variant="link" size="sm" className="group w-fit" asChild>
      <Link href={href}>
        {text}
        <CaretDoubleRightIcon className="opacity-0 group-hover:opacity-100 transition-all duration-150 size-3" />
      </Link>
    </Button>
  );
};

export default CaretButton;
