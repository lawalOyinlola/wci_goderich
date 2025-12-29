"use client";

import Link from "next/link";
import { HeartIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AnimatedButton } from "../ui/animated-button";

export function TestimoniesEmpty() {
  return (
    <Empty className="border border-dashed small-container max-w-2xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartIcon weight="duotone" size={24} />
        </EmptyMedia>
        <EmptyTitle>No Testimonies Shared Yet</EmptyTitle>
        <EmptyDescription>
          Be the first to share God&apos;s wonders in your life, thereby
          motivating and inspiring others in our community.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AnimatedButton
          size="lg"
          text="Share Your Testimony"
          href="/contact-us"
        />
      </EmptyContent>
    </Empty>
  );
}
