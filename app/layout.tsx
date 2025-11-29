import type { Metadata } from "next";
import { Outfit, Lora, Great_Vibes, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layouts/navbar/NavBar";

const fontSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
