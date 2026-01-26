"use client";

import { useEffect, useState } from "react";

export function FooterCopyright() {
  const [year, setYear] = useState<number>(2026); // Default fallback year

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
      &copy; {year} WCI Goderich. All rights reserved. | Developed by{" "}
      <a
        href="https://lawaloyinlola.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold hover:underline transition-colors"
      >
        YERO
      </a>
    </span>
  );
}
