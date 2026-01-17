import type { Metadata } from "next";
import { Outfit, Lora, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import "@/lib/utils/console"; // Suppress console in production
import "./globals.css";

const fontLora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const fontGreatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "WCI Goderich",
  description: "Winners Church International - Goderich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-outfit antialiased overflow-x-hidden",
          fontLora.variable,
          fontGreatVibes.variable,
          fontOutfit.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
