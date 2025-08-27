"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const latestSermons = [
  {
    title: "Walking in Faith and Victory",
    pastor: "Pastor Jerry Simon",
    date: "December 8, 2024",
    duration: "45:32",
    image: "/images/2025_theme.png",
    description:
      "Learn how to walk in faith and experience victory in every area of your life through God's promises.",
    category: "Faith",
    views: "1,247",
  },
  {
    title: "The Power of Prayer",
    pastor: "Pastor Jerry Simon",
    date: "December 1, 2024",
    duration: "52:18",
    image: "/images/bg-covenant_exchange.jpg",
    description:
      "Discover the transformative power of prayer and how it can change your circumstances and strengthen your relationship with God.",
    category: "Prayer",
    views: "1,156",
  },
  {
    title: "Living in God's Grace",
    pastor: "Pastor Jerry Simon",
    date: "November 24, 2024",
    duration: "48:45",
    image: "/images/bg-2025_theme.jpg",
    description:
      "Understanding and living in the abundant grace that God has provided for every believer.",
    category: "Grace",
    views: "1,089",
  },
];

const sermonSeries = [
  {
    title: "Foundations of Faith",
    episodes: 8,
    image: "/images/prophetic_focus_june.png",
    description:
      "A comprehensive series on building a strong foundation in your Christian walk.",
    progress: 3,
  },
  {
    title: "Walking in Victory",
    episodes: 6,
    image: "/images/2025_covenant_exchange.png",
    description:
      "Learn how to overcome challenges and walk in the victory that Christ has won for you.",
    progress: 2,
  },
  {
    title: "Prayer and Intercession",
    episodes: 5,
    image: "/images/bg-prophetic_focus_june.jpg",
    description: "Deepen your prayer life and learn the art of intercession.",
    progress: 1,
  },
];

const mediaCategories = [
  { name: "All", count: 15, active: true },
  { name: "Sermons", count: 8, active: false },
  { name: "Bible Study", count: 4, active: false },
  { name: "Testimonies", count: 3, active: false },
];

export default function MediaPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Media Library</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Watch, listen, and download spiritual content to grow your faith
          </p>
        </div>
      </section>

      {/* Media Categories */}
      <section className="py-12 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {mediaCategories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  category.active
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              Featured Sermon
            </span>
          </div>

          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={latestSermons[0].image}
                  alt={latestSermons[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-3xl">▶</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {latestSermons[0].category}
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  {latestSermons[0].title}
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-foreground/70">
                    <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                      👨‍💼
                    </span>
                    {latestSermons[0].pastor}
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                      📅
                    </span>
                    {latestSermons[0].date}
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                      ⏱️
                    </span>
                    {latestSermons[0].duration}
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                      👁️
                    </span>
                    {latestSermons[0].views} views
                  </div>
                </div>
                <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
                  {latestSermons[0].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" size="lg" className="flex-1">
                    Watch Now
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    Download Audio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Latest Sermons
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Stay updated with our most recent messages and teachings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestSermons.slice(1).map((sermon, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {sermon.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {sermon.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground line-clamp-2">
                    {sermon.title}
                  </h3>
                  <div className="space-y-2 mb-4 text-sm text-foreground/70">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                        👨‍💼
                      </span>
                      {sermon.pastor}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                        📅
                      </span>
                      {sermon.date}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                        👁️
                      </span>
                      {sermon.views} views
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {sermon.description}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Watch
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sermon Series */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Sermon Series
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Deep dive into specific topics with our comprehensive sermon
              series
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermonSeries.map((series, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={series.image}
                    alt={series.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {series.episodes} Episodes
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {series.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {series.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-foreground/70 mb-2">
                      <span>Progress</span>
                      <span>
                        {series.progress}/{series.episodes}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (series.progress / series.episodes) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Continue Series
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Resources */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Audio Resources
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Listen to sermons and teachings on the go
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/30 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🎧
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  Podcast
                </h3>
                <p className="text-foreground/70">
                  Subscribe to our podcast and never miss a message
                </p>
              </div>
              <div className="space-y-4">
                <Button variant="outline" size="lg" className="w-full">
                  Subscribe on Spotify
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Subscribe on Apple Podcasts
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  📱
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  Mobile App
                </h3>
                <p className="text-foreground/70">
                  Download our app for easy access to all media content
                </p>
              </div>
              <div className="space-y-4">
                <Button variant="outline" size="lg" className="w-full">
                  Download for iOS
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Get notified about new content and never miss an inspiring message
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" href="/contact">
              Contact Us
            </Button>
            <Button variant="outline" size="lg" href="/events">
              View Events
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
