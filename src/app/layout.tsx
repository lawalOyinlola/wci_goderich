import "./globals.css";
// import "./index.css";

import * as React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ChurchNavbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "WCI Goderich - Living Faith Church Worldwide",
    template: "%s | WCI Goderich",
  },
  description:
    "Welcome to WCI Goderich, a vibrant church community in Sierra Leone. Join us for worship, fellowship, and spiritual growth. Discover our services, events, and ministry opportunities.",
  keywords: [
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
    "Bible Study",
    "90 Minutes with Jesus",
    "Businessmen Fellowship",
    "Home Cell Groups",
    "Community Outreach",
    "Evangelism",
    "Prayer Meeting",
    "Praise & Worship",
    "Communion Service",
    "Covenant Hour of Prayer",
    "Prayer Requests",
  ],
  authors: [{ name: "WCI Goderich", url: "https://wcigoderich.org" }],
  creator: "WCI Goderich",
  publisher: "WCI Goderich",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // NOTE: Update this to your website domain
  metadataBase: new URL("https://wcigoderich.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wcigoderich.org",
    title: "WCI Goderich - Living Faith Church Worldwide",
    description:
      "Welcome to WCI Goderich, a vibrant church community in Sierra Leone. Join us for worship, fellowship, and spiritual growth.",
    siteName: "WCI Goderich",
    images: [
      {
        url: "/images/2025_theme.png",
        width: 1200,
        height: 630,
        alt: "WCI Goderich Church - Living Faith Church Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCI Goderich - Living Faith Church Worldwide",
    description:
      "Welcome to WCI Goderich, a vibrant church community in Sierra Leone.",
    images: ["/images/2025_theme.png"],
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
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  category: "religion",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "msapplication-TileColor": "#ef4444",
    "msapplication-config": "/favicon/browserconfig.xml",
    "theme-color": "#ef4444",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional favicon links for better browser support */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/favicon-16x16.png"
          color="#ef4444"
        />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="theme-color" content="#ef4444" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data for Church */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "WCI Goderich",
              alternateName: "Living Faith Church Worldwide - Goderich",
              description: "A vibrant church community in Sierra Leone",
              url: "https://wcigoderich.org",
              logo: "https://wcigoderich.org/lfc_logo.png",
              image: "https://wcigoderich.org/images/2025_theme.png",
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
            }),
          }}
        />
      </head>
      <body
        className={`${openSans.variable} font-sans antialiased min-h-dvh bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChurchNavbar />
          {children}
          <ThemeToggle />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
