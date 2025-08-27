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
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "WCI Goderich - Living Faith Church Worldwide",
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
  ],
  authors: [{ name: "WCI Goderich" }],
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
        alt: "WCI Goderich Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCI Goderich - Living Faith Church Worldwide",
    description:
      "Welcome to WCI Goderich, a vibrant church community in Sierra Leone.",
    images: ["/images/2025_theme.png"],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/lfc_logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/lfc_logo.png",
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  category: "religion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
