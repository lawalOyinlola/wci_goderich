import type { Metadata } from "next";
import { CHURCH_INFO } from "@/lib/constants/church";
import {
  AUTHOR,
  AUTHOR_SOCIAL_LINKS,
  CHURCH_SOCIAL_LINKS,
  PAGE_SEO,
  SITE_CONFIG,
  SITE_PASTORS,
  SITE_URL,
  type PageSeoKey,
} from "@/lib/constants/site";

/** Resolve a (possibly relative) path against the production site URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Build a fully-formed Next.js `Metadata` object for a page from the central
 * `PAGE_SEO` map. Pass the page key; everything else is derived from config.
 */
export function createMetadata(key: PageSeoKey): Metadata {
  const page = PAGE_SEO[key];
  const title = page.title ?? SITE_CONFIG.defaultTitle;
  const image = absoluteUrl(page.image ?? SITE_CONFIG.ogImage);
  const canonical = page.path;
  const isHome = key === "home";

  return {
    title: isHome ? SITE_CONFIG.defaultTitle : title,
    description: page.description,
    keywords: [...SITE_CONFIG.keywords, ...(page.keywords ?? [])],
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      url: absoluteUrl(canonical),
      title: isHome ? SITE_CONFIG.defaultTitle : title,
      description: page.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? SITE_CONFIG.defaultTitle : title,
      description: page.description,
      images: [image],
      site: SITE_CONFIG.twitter.site,
      creator: SITE_CONFIG.twitter.creator,
    },
  };
}

/**
 * Root metadata shared across every route. Sets the title template, base URL,
 * author/creator attribution, default OG/Twitter cards, robots, and icons.
 */
export function buildRootMetadata(): Metadata {
  const home = createMetadata("home");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_CONFIG.defaultTitle,
      template: SITE_CONFIG.titleTemplate,
    },
    description: SITE_CONFIG.description,
    applicationName: SITE_CONFIG.name,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    creator: AUTHOR.name,
    publisher: SITE_CONFIG.legalName,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: "/" },
    openGraph: home.openGraph,
    twitter: home.twitter,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/images/2026_theme.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

const { CONTACT, CHURCH_LOCATION } = CHURCH_INFO;

/**
 * JSON-LD structured data describing the church as an Organization, including
 * the developer (`author`) attribution and the resident/associate pastors.
 */
export function getOrganizationJsonLd() {
  const { address, coordinates } = CHURCH_LOCATION;

  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.name,
    url: SITE_URL,
    logo: absoluteUrl(CHURCH_INFO.LOGO),
    image: absoluteUrl(SITE_CONFIG.ogImage),
    description: SITE_CONFIG.description,
    foundingDate: CHURCH_INFO.FOUNDED,
    parentOrganization: {
      "@type": "Organization",
      name: CHURCH_INFO.DENOMINATION,
    },
    founder: {
      "@type": "Person",
      name: "Bishop Dr. David Oyedepo",
    },
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: "SL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    // Resident & associate pastors.
    employee: SITE_PASTORS.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.title,
    })),
    sameAs: CHURCH_SOCIAL_LINKS,
    // Developer / author attribution.
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.role,
      sameAs: AUTHOR_SOCIAL_LINKS.map((s) => s.href),
    },
  };
}

/** JSON-LD describing the website itself (enables sitelinks search box, etc.). */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-GB",
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
  };
}
