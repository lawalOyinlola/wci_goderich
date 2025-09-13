"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Play, Volume2, FileText, Video, Music } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { BorderBeam } from "@/components/magicui/border-beam";

// Define testimony type
type Testimony = {
  id: number;
  name: string;
  role: string;
  image: string;
  testimony: string;
  category: string;
  date: string;
  type: "text" | "video" | "audio";
  videoUrl?: string;
  audioUrl?: string;
};

// Separate component for testimonies content to handle search params
function TestimoniesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "all");

  // Tab configuration
  const tabConfig = [
    { value: "all", label: "All", icon: null },
    { value: "text", label: "Text", icon: FileText },
    { value: "audio", label: "Audio", icon: Music },
    { value: "video", label: "Video", icon: Video },
  ];

  const testimonies: Testimony[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Church Member",
      image: "/images/2025_theme.png",
      testimony:
        "When I first came to WCI Goderich, I was broken and lost. Through the love of this church family and the powerful teaching of God's Word, I found healing and purpose. Today, I'm serving in the children's ministry and seeing God transform young lives.",
      category: "Spiritual Growth",
      date: "December 2024",
      type: "text",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Youth Leader",
      image: "/images/bg-covenant_exchange.jpg",
      testimony:
        "The youth ministry at WCI Goderich has been incredible. I've seen teenagers grow from shy, uncertain kids to confident young leaders. The mentorship and discipleship programs are truly life-changing.",
      category: "Youth Ministry",
      date: "November 2024",
      type: "video",
      videoUrl: "https://example.com/video1",
    },
    {
      id: 3,
      name: "Grace Williams",
      role: "Prayer Team Member",
      image: "/images/bg-2025_theme.jpg",
      testimony:
        "Being part of the prayer team has deepened my faith in ways I never imagined. I've witnessed countless miracles and answered prayers. God is faithful, and this church truly believes in the power of prayer.",
      category: "Prayer",
      date: "October 2024",
      type: "audio",
      audioUrl: "https://example.com/audio1",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Usher",
      image: "/images/2025_covenant_exchange.png",
      testimony:
        "Serving as an usher has taught me the importance of hospitality and making people feel welcome. Every Sunday, I get to be the first person to greet visitors and show them God's love through a warm smile.",
      category: "Service",
      date: "September 2024",
      type: "text",
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      role: "Worship Team",
      image: "/images/bg-prophetic_focus_june.jpg",
      testimony:
        "The worship ministry here is anointed and powerful. I've experienced God's presence in ways that have transformed my life. Leading others in worship is not just about music—it's about ushering people into God's presence.",
      category: "Worship",
      date: "August 2024",
      type: "video",
      videoUrl: "https://example.com/video2",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Bible Study Leader",
      image: "/images/prophetic_focus_june.png",
      testimony:
        "The Bible study groups have been instrumental in my spiritual growth. We dive deep into God's Word, ask tough questions, and support each other in our faith journey. It's more than study—it's family.",
      category: "Bible Study",
      date: "July 2024",
      type: "audio",
      audioUrl: "https://example.com/audio2",
    },
    {
      id: 7,
      name: "Lisa Anderson",
      role: "Children's Ministry",
      image: "/images/2025_theme.png",
      testimony:
        "Working with children has shown me the pure faith that Jesus spoke about. These little ones teach me more about God's love than I could ever teach them.",
      category: "Children's Ministry",
      date: "June 2024",
      type: "text",
    },
    {
      id: 8,
      name: "Robert Kim",
      role: "Men's Fellowship",
      image: "/images/bg-covenant_exchange.jpg",
      testimony:
        "The men's fellowship has been a source of strength and accountability. We support each other through life's challenges and celebrate victories together.",
      category: "Men's Ministry",
      date: "May 2024",
      type: "video",
      videoUrl: "https://example.com/video3",
    },
  ];

  // Filter testimonies based on active tab
  const filteredTestimonies = testimonies.filter((testimony) => {
    if (activeTab === "all") return true;
    return testimony.type === activeTab;
  });

  // Count testimonies by type
  const testimonyCounts = {
    all: testimonies.length,
    text: testimonies.filter((t) => t.type === "text").length,
    audio: testimonies.filter((t) => t.type === "audio").length,
    video: testimonies.filter((t) => t.type === "video").length,
  };

  // Handle tab change - use local state for seamless switching
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without causing page re-render
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    // Use replaceState to update URL without navigation
    window.history.replaceState({}, "", `/testimonies?${params.toString()}`);
  };

  // Render testimony content based on type
  const renderTestimonyContent = (testimony: Testimony) => {
    switch (testimony.type) {
      case "video":
        return (
          <div className="relative group">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="w-6 h-6 text-white" />
                </Button>
              </div>
              <Image
                src={testimony.image}
                alt={testimony.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4" />
              <span>Video Testimony</span>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="relative group">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary backdrop-blur-sm"
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </Button>
              </div>
              <Image
                src={testimony.image}
                alt={testimony.name}
                fill
                className="object-cover opacity-60"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Music className="w-4 h-4" />
              <span>Audio Testimony</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative">
            <Image
              src={testimony.image}
              alt={testimony.name}
              width={400}
              height={300}
              className="rounded-lg shadow-lg mx-auto"
            />
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Text Testimony</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Testimonies
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300">
            Stories of God&apos;s faithfulness and transformation in our church
            family
          </p>
        </div>
      </section>

      {/* Testimonies with Tabs */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="small-container">
          <SectionHeader
            title="Stories of Faith"
            description="Real stories from real people whose lives have been changed by God"
          />

          {/* Tabs Filter */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="justify-center mb-12 bg-slate-100 dark:bg-slate-800 p-1 rounded-none border border-slate-200 dark:border-slate-700">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-md text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary dark:data-[state=active]:bg-primary/30 dark:data-[state=active]:text-primary dark:data-[state=active]:border-primary transition-all duration-200 hover:text-primary hover:border-primary group"
                >
                  {tab.icon && (
                    <tab.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  )}
                  <span className="group-hover:text-primary transition-colors">
                    {tab.label}
                  </span>
                  <span
                    className={`ml-2 rounded-md px-2.5 py-1.5 text-xs font-medium ${
                      activeTab === tab.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {testimonyCounts[tab.value as keyof typeof testimonyCounts]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Testimonies Grid */}
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="primary" size="sm">
                        {testimony.category}
                      </Badge>
                    </div>

                    <BorderBeam
                      size={250}
                      colorFrom="var(--accent)"
                      className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                    />

                    {/* Type Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="primary" size="lg" className="px-1.5">
                        {testimony.type === "video" ? (
                          <Video className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : testimony.type === "audio" ? (
                          <Music className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : (
                          <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                      </Badge>

                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                        {testimony.type} Testimony
                      </span>
                    </div>

                    {/* Testimony Content */}
                    <div className="mb-6">
                      {renderTestimonyContent(testimony)}
                    </div>

                    {/* Testimony Text */}
                    <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                      &quot;{testimony.testimony.substring(0, 120)}...&quot;
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {testimony.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          {testimony.name}
                        </h3>
                        <p className="text-red-600 dark:text-red-400 font-medium text-xs">
                          {testimony.role}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      {testimony.date}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-500/50 dark:hover:text-red-400 transition-all duration-200 group-hover:shadow-sm"
                    >
                      {testimony.type === "video" ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Testimony
                        </>
                      ) : testimony.type === "audio" ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Listen
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Read More
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredTestimonies.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No {activeTab} testimonies found
                  </h3>
                  <p className="text-muted-foreground">
                    Check back later for new testimonies in this category.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Testimonies Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Recent Testimonies
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Latest stories of God&apos;s work in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonies.slice(0, 3).map((testimony) => (
              <div
                key={testimony.id}
                className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 dark:hover:border-red-500/50"
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {testimony.category}
                  </span>
                </div>

                {/* Type Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    {testimony.type === "video" ? (
                      <Video className="w-4 h-4 text-red-600 dark:text-red-400" />
                    ) : testimony.type === "audio" ? (
                      <Music className="w-4 h-4 text-red-600 dark:text-red-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
                    {testimony.type} Testimony
                  </span>
                </div>

                {/* Testimony Text */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                  &quot;{testimony.testimony.substring(0, 120)}...&quot;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimony.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      {testimony.name}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-medium text-xs">
                      {testimony.role}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {testimony.date}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-500/50 dark:hover:text-red-400 transition-all duration-200 group-hover:shadow-sm"
                >
                  {testimony.type === "video" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </>
                  ) : testimony.type === "audio" ? (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Read
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">
            Share Your Story
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Has God done something amazing in your life? We&apos;d love to hear
            about it and share it with our church family.
          </p>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 border border-slate-200 dark:border-slate-600">
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Your testimony could inspire someone else and bring glory to God.
              Whether it&apos;s a story of healing, provision, salvation, or any
              other blessing, every testimony matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-500/50 dark:hover:text-red-400 transition-all duration-200"
              >
                <Link href="/contact">Share Your Story</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-500/50 dark:hover:text-red-400 transition-all duration-200"
              >
                <Link href="/prayer">Prayer Request</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Be Part of the Story</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our church family and create your own testimony of God&apos;s
            faithfulness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="bg-white text-red-600 hover:bg-slate-50 hover:text-red-700 transition-all duration-200"
            >
              <Link href="/services">Join Us</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main page component with Suspense boundary
export default function TestimoniesPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      }
    >
      <TestimoniesContent />
    </Suspense>
  );
}
