import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.legalName,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/lfc_logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
