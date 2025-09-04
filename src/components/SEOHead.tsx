import { Metadata } from "next";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "event" | "organization";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/images/2025_theme.png",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "WCI Goderich",
  section,
  tags = [],
}: SEOHeadProps): Metadata {
  const fullTitle = title
    ? `${title} | WCI Goderich`
    : "WCI Goderich - Living Faith Church Worldwide";

  const fullDescription =
    description ||
    "Welcome to WCI Goderich, a vibrant church community in Sierra Leone. Join us for worship, fellowship, and spiritual growth.";

  const fullKeywords = [
    "WCI Goderich",
    "Living Faith Church",
    "Church Sierra Leone",
    "Christian Church",
    "Worship",
    "Prayer",
    "Bible Study",
    "Church Services",
    "Ministry",
    "Goderich Church",
    "Sierra Leone Church",
    "Christian Community",
    "Faith",
    "Spiritual Growth",
    "Church Events",
    "Sunday Service",
    "Christian Ministry",
    ...keywords,
    ...tags,
  ];

  const fullUrl = url
    ? `https://wcigoderich.org${url}`
    : "https://wcigoderich.org";

  // Only 'website' and 'article' are allowed by Next.js OpenGraph types
  const ogType: "website" | "article" =
    type === "article" ? "article" : "website";

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: author, url: "https://wcigoderich.org" }],
    creator: author,
    publisher: "WCI Goderich",
    metadataBase: new URL("https://wcigoderich.org"),
    alternates: {
      canonical: url || "/",
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: "WCI Goderich",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: "@wcigoderich",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:author": author,
      ...(publishedTime && { "article:published_time": publishedTime }),
      ...(modifiedTime && { "article:modified_time": modifiedTime }),
      ...(section && { "article:section": section }),
      ...(tags.length > 0 && { "article:tag": tags.join(", ") }),
    },
  };
}

// Helper function for church-specific structured data
export function generateChurchStructuredData(pageData?: {
  name?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: pageData?.name || "WCI Goderich",
    alternateName: "Living Faith Church Worldwide - Goderich",
    description:
      pageData?.description || "A vibrant church community in Sierra Leone",
    url: pageData?.url || "https://wcigoderich.org",
    logo: "https://wcigoderich.org/lfc_logo.png",
    image: pageData?.image || "https://wcigoderich.org/images/2025_theme.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Goderich",
      addressCountry: "SL",
      addressRegion: "Western Area",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "8.4606",
      longitude: "-13.2897",
    },
    telephone: "+232-XX-XXXXXXX",
    email: "info@wcigoderich.org",
    sameAs: [
      "https://facebook.com/wcigoderich",
      "https://instagram.com/wcigoderich",
    ],
    openingHours: "Mo-Su 06:00-22:00",
    serviceType: "Church Service",
    areaServed: "Goderich, Sierra Leone",
    ...(pageData?.type && { "@type": pageData.type }),
  };
}

// Helper function for event structured data
export function generateEventStructuredData(eventData: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  organizer: string;
  image?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.name,
    description: eventData.description,
    startDate: eventData.startDate,
    ...(eventData.endDate && { endDate: eventData.endDate }),
    location: {
      "@type": "Place",
      name: eventData.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Goderich",
        addressCountry: "SL",
        addressRegion: "Western Area",
      },
    },
    organizer: {
      "@type": "Organization",
      name: eventData.organizer,
      url: "https://wcigoderich.org",
    },
    image: eventData.image || "https://wcigoderich.org/images/2025_theme.png",
    url: eventData.url || "https://wcigoderich.org/events",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}
