"use client";

import { useEffect, useState } from "react";

export function FooterCopyright() {
  const [year, setYear] = useState<number>(2026); // Default fallback year

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
      &copy; {year} WCI Goderich. All rights reserved.
    </span>
  );
}
