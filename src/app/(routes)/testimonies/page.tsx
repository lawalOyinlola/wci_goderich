"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TestimoniesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const testimonies = [
    {
      name: "Sarah Johnson",
      role: "Church Member",
      image: "/images/2025_theme.png",
      testimony:
        "When I first came to WCI Goderich, I was broken and lost. Through the love of this church family and the powerful teaching of God's Word, I found healing and purpose. Today, I'm serving in the children's ministry and seeing God transform young lives.",
      category: "Spiritual Growth",
      date: "December 2024",
    },
    {
      name: "Michael Chen",
      role: "Youth Leader",
      image: "/images/bg-covenant_exchange.jpg",
      testimony:
        "The youth ministry at WCI Goderich has been incredible. I've seen teenagers grow from shy, uncertain kids to confident young leaders. The mentorship and discipleship programs are truly life-changing.",
      category: "Youth Ministry",
      date: "November 2024",
    },
    {
      name: "Grace Williams",
      role: "Prayer Team Member",
      image: "/images/bg-2025_theme.jpg",
      testimony:
        "Being part of the prayer team has deepened my faith in ways I never imagined. I've witnessed countless miracles and answered prayers. God is faithful, and this church truly believes in the power of prayer.",
      category: "Prayer",
      date: "October 2024",
    },
    {
      name: "David Thompson",
      role: "Usher",
      image: "/images/2025_covenant_exchange.png",
      testimony:
        "Serving as an usher has taught me the importance of hospitality and making people feel welcome. Every Sunday, I get to be the first person to greet visitors and show them God's love through a warm smile.",
      category: "Service",
      date: "September 2024",
    },
    {
      name: "Maria Rodriguez",
      role: "Worship Team",
      image: "/images/bg-prophetic_focus_june.jpg",
      testimony:
        "The worship ministry here is anointed and powerful. I've experienced God's presence in ways that have transformed my life. Leading others in worship is not just about music—it's about ushering people into God's presence.",
      category: "Worship",
      date: "August 2024",
    },
    {
      name: "James Wilson",
      role: "Bible Study Leader",
      image: "/images/prophetic_focus_june.png",
      testimony:
        "The Bible study groups have been instrumental in my spiritual growth. We dive deep into God's Word, ask tough questions, and support each other in our faith journey. It's more than study—it's family.",
      category: "Bible Study",
      date: "July 2024",
    },
  ];

  const categories = [
    { name: "All", count: testimonies.length },
    { name: "Spiritual Growth", count: 1 },
    { name: "Youth Ministry", count: 1 },
    { name: "Prayer", count: 1 },
    { name: "Service", count: 1 },
    { name: "Worship", count: 1 },
    { name: "Bible Study", count: 1 },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonies.length) % testimonies.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch and drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(currentSlide);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    const newSlide = Math.round(scrollLeft - walk / 300);
    if (newSlide >= 0 && newSlide < testimonies.length) {
      setCurrentSlide(newSlide);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(currentSlide);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    const newSlide = Math.round(scrollLeft - walk / 300);
    if (newSlide >= 0 && newSlide < testimonies.length) {
      setCurrentSlide(newSlide);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isDragging]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Testimonies</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Stories of God&apos;s faithfulness and transformation in our church
            family
          </p>
        </div>
      </section>

      {/* Testimony Slider */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Stories of Faith
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Real stories from real people whose lives have been changed by God
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  index === 0
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
            >
              →
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="overflow-hidden rounded-2xl shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {testimonies.map((testimony, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                    style={{ minWidth: "100%" }}
                  >
                    <div className="bg-muted/30 p-8 md:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="text-center lg:text-left">
                          <div className="mb-6">
                            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                              {testimony.category}
                            </span>
                          </div>
                          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-relaxed">
                            &quot;{testimony.testimony}&quot;
                          </blockquote>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {testimony.name}
                            </h3>
                            <p className="text-primary font-medium">
                              {testimony.role}
                            </p>
                            <p className="text-sm text-foreground/70">
                              {testimony.date}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <Image
                            src={testimony.image}
                            alt={testimony.name}
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonies Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              More Stories
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover more testimonies of God&apos;s work in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonies.slice(0, 3).map((testimony, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    🙏
                  </div>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {testimony.category}
                  </span>
                </div>

                <blockquote className="text-foreground/80 mb-6 italic text-center">
                  &quot;{testimony.testimony.substring(0, 120)}...&quot;
                </blockquote>

                <div className="text-center">
                  <h3 className="font-semibold text-foreground">
                    {testimony.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {testimony.role}
                  </p>
                  <p className="text-xs text-foreground/70">{testimony.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Share Your Story
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Has God done something amazing in your life? We&apos;d love to hear
            about it and share it with our church family.
          </p>

          <div className="bg-muted/30 rounded-lg p-8">
            <p className="text-foreground/80 mb-6">
              Your testimony could inspire someone else and bring glory to God.
              Whether it&apos;s a story of healing, provision, salvation, or any
              other blessing, every testimony matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant=outline size="lg" href="/contact">
                Share Your Story
              </Button>
              <Button variant="outline" size="lg" href="/prayer">
                Prayer Request
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
            <Button variant="secondary" size="lg" href="/services">
              Join Us
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
