"use client";

export function FooterCopyright() {
  return (
    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
      &copy; {new Date().getFullYear()} WCI Goderich. All rights reserved.
    </span>
  );
}
