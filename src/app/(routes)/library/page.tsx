"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LibraryPage() {
  const bookCategories = [
    {
      title: "Bible Study",
      count: 45,
      icon: "📖",
      description: "Comprehensive Bible study materials and commentaries",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Christian Living",
      count: 32,
      icon: "❤️",
      description: "Books on practical Christian living and discipleship",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Theology",
      count: 28,
      icon: "✝️",
      description: "Deep theological works and doctrinal studies",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Prayer & Worship",
      count: 18,
      icon: "🙏",
      description: "Resources for prayer, worship, and spiritual growth",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Family & Marriage",
      count: 22,
      icon: "👨‍👩‍👧‍👦",
      description: "Christian family life and marriage guidance",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Youth & Children",
      count: 15,
      icon: "🧒",
      description: "Age-appropriate materials for young believers",
      color: "bg-accent/10 text-accent",
    },
  ];

  const featuredBooks = [
    {
      title: "The Purpose Driven Life",
      author: "Rick Warren",
      image: "/images/2025_theme.png",
      category: "Christian Living",
      description:
        "A groundbreaking manifesto for Christian living in the 21st century.",
      available: true,
      rating: 4.8,
    },
    {
      title: "Mere Christianity",
      author: "C.S. Lewis",
      image: "/images/bg-covenant_exchange.jpg",
      category: "Theology",
      description:
        "A classic defense of the Christian faith by one of the most influential Christian writers.",
      available: true,
      rating: 4.9,
    },
    {
      title: "The Power of a Praying Parent",
      author: "Stormie Omartian",
      image: "/images/bg-2025_theme.jpg",
      category: "Prayer & Worship",
      description:
        "Learn how to pray effectively for your children and see God's power at work.",
      available: false,
      rating: 4.7,
    },
    {
      title: "Boundaries in Marriage",
      author: "Henry Cloud & John Townsend",
      image: "/images/2025_covenant_exchange.png",
      category: "Family & Marriage",
      description:
        "Essential principles for building a healthy, loving marriage relationship.",
      available: true,
      rating: 4.6,
    },
  ];

  const studyMaterials = [
    {
      title: "Bible Study Guide - Genesis",
      type: "Study Guide",
      pages: 45,
      format: "PDF",
      description:
        "Comprehensive study guide for the book of Genesis with discussion questions and applications.",
    },
    {
      title: "Prayer Journal Template",
      type: "Template",
      pages: 12,
      format: "PDF",
      description:
        "Printable prayer journal to help you organize and track your prayer life.",
    },
    {
      title: "Family Devotional Guide",
      type: "Devotional",
      pages: 30,
      format: "PDF",
      description:
        "Daily devotional readings perfect for family worship and discussion.",
    },
    {
      title: "Bible Memory Verses",
      type: "Reference",
      pages: 8,
      format: "PDF",
      description:
        "Key Bible verses organized by topic for memorization and meditation.",
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Church Library
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Discover spiritual resources to deepen your faith and knowledge
          </p>
        </div>
      </section>

      {/* Library Stats */}
      <section className="py-16 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                160+
              </div>
              <div className="text-foreground/70">Books Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                45
              </div>
              <div className="text-foreground/70">Bible Study Materials</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                6
              </div>
              <div className="text-foreground/70">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                24/7
              </div>
              <div className="text-foreground/70">Digital Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Browse by Category
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Find the perfect resource for your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookCategories.map((category, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {category.count} books available
                  </p>
                </div>
                <p className="text-foreground/70 text-center mb-4">
                  {category.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Category
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Featured Books
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Highly recommended reads from our collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {book.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    ⭐ {book.rating}
                  </div>
                  {!book.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                        Currently Borrowed
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-primary font-medium mb-2">{book.author}</p>
                  <p className="text-foreground/70 mb-4 text-sm line-clamp-3">
                    {book.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="accent"
                      size="sm"
                      className="flex-1"
                      disabled={!book.available}
                    >
                      {book.available ? "Borrow Now" : "Join Waitlist"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Materials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Study Materials
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Downloadable resources to enhance your Bible study and spiritual
              growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studyMaterials.map((material, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    📄
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {material.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-foreground/70 mb-3">
                      <span className="bg-muted px-2 py-1 rounded">
                        {material.type}
                      </span>
                      <span>{material.pages} pages</span>
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded">
                        {material.format}
                      </span>
                    </div>
                    <p className="text-foreground/70 mb-4">
                      {material.description}
                    </p>
                    <Button variant="accent" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Services */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Library Services
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              How we can help you access and use our resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📚
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Book Borrowing
              </h3>
              <p className="text-foreground/70 mb-4">
                Borrow physical books for up to 3 weeks with the option to renew
              </p>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                💻
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Digital Access
              </h3>
              <p className="text-foreground/70 mb-4">
                Access e-books and digital resources from anywhere, anytime
              </p>
              <Button variant="outline" size="sm">
                Access Now
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Study Groups
              </h3>
              <p className="text-foreground/70 mb-4">
                Join study groups to discuss books and materials with other
                members
              </p>
              <Button variant="outline" size="sm">
                Join Group
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Library Hours & Location */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Visit Our Library
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Come explore our collection in person
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                📅 Opening Hours
              </h3>
              <div className="space-y-2 text-foreground/70">
                <p>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                </p>
                <p>
                  <strong>Saturday:</strong> 9:00 AM - 4:00 PM
                </p>
                <p>
                  <strong>Sunday:</strong> 12:00 PM - 4:00 PM
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                📍 Location
              </h3>
              <div className="space-y-2 text-foreground/70">
                <p>WCI Goderich Auditorium</p>
                <p>Second Floor, Room 205</p>
                <p>Goderich, Sierra Leone</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" href="/location">
              Get Directions
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Librarian
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Reading Journey
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover the wealth of spiritual knowledge available in our library
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" href="/contact">
              Get Library Card
            </Button>
            <Button variant="outline" size="lg" href="/media">
              Browse Online
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
