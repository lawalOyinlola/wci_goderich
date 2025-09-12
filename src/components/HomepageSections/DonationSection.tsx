"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

export default function DonationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544376664-80b17f09d399?w=1920&h=1080&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Give towards the{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Building Project
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Help us build a place of worship that will serve our community for
            generations to come. Your generous contribution will help us create
            a space where faith, fellowship, and hope can flourish in our
            community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="https://www.paypal.com/donate/?hosted_button_id=22480427">
                Give Now
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              asChild
            >
              <Link href="/giving">Learn More</Link>
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-12">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Progress</span>
              <span>75% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              $150,000 raised of $200,000 goal
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-500"></div>
    </section>
  );
}
