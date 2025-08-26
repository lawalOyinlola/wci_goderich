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

export const metadata: Metadata = {
  title: "WCI Goderich",
  description: "Living Faith Church Worldwide",
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
