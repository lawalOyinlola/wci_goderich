import type { MetadataRoute } from "next";
import { PAGE_SEO, SITE_URL } from "@/lib/constants/site";

/**
 * Dynamically generated sitemap. Driven by the central `PAGE_SEO` map so adding
 * a page there automatically includes it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(PAGE_SEO).map((page) => {
    const isHome = page.path === "/";
    return {
      url: `${SITE_URL}${page.path}`,
      lastModified,
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1 : 0.7,
    };
  });
}
