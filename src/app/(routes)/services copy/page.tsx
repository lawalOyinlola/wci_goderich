"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Sunday Worship Services",
    times: ["7:00 AM", "9:00 AM", "11:00 AM"],
    description:
      "Join us for powerful worship, inspiring messages, and fellowship every Sunday. Our services are designed to uplift your spirit and strengthen your faith.",
    icon: "⛪",
    features: [
      "Live Worship",
      "Bible Teaching",
      "Children's Church",
      "Teens Ministry",
    ],
  },
  {
    title: "90 Minutes with Jesus",
    time: "Mondays: 6:00 PM",
    description:
      "A focused time of Bible study and spiritual growth where we dive deep into God's Word and apply it to our daily lives.",
    icon: "📖",
    features: ["Bible Study", "Group Discussion", "Prayer Time", "Q&A Session"],
  },
  {
    title: "Communion Service",
    time: "Wednesdays: 6:00 PM",
    description:
      "A sacred time of remembrance and reflection on Christ's sacrifice, strengthening our spiritual connection with God.",
    icon: "🍷",
    features: ["Communion", "Worship", "Prayer", "Fellowship"],
  },
  {
    title: "Covenant Hour of Prayer",
    time: "Weekdays: 6:00 AM | Saturdays: 7:00 AM",
    description:
      "Start your day with prayer and intercession. Join believers in seeking God's face and lifting up our community.",
    icon: "🙏",
    features: ["Morning Prayer", "Intercession", "Praise", "Spiritual Warfare"],
  },
  {
    title: "Spiritual Week of Emphasis",
    time: "First Week Monthly: Wed-Fri 6:00 PM",
    description:
      "Intensive spiritual focus with special teachings, extended prayer sessions, and spiritual renewal.",
    icon: "🔥",
    features: [
      "Special Teachings",
      "Extended Prayer",
      "Spiritual Renewal",
      "Community Building",
    ],
  },
  {
    title: "Home Cell Groups",
    time: "Saturdays: 5:00 PM",
    description:
      "Small group gatherings in homes for intimate fellowship, Bible study, and prayer support.",
    icon: "🏠",
    features: [
      "Small Groups",
      "Intimate Fellowship",
      "Bible Study",
      "Prayer Support",
    ],
  },
];

const ministries = [
  {
    title: "Children's Ministry",
    description:
      "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
    ageRange: "Ages 3-12",
    activities: [
      "Sunday School",
      "Vacation Bible School",
      "Children's Choir",
      "Bible Games",
    ],
  },
  {
    title: "Youth Ministry",
    description:
      "Empowering teenagers to grow in their faith through relevant teachings, activities, and peer support.",
    ageRange: "Ages 13-18",
    activities: [
      "Youth Bible Study",
      "Fellowship Events",
      "Mentorship",
      "Outreach Programs",
    ],
  },
  {
    title: "Women's Ministry",
    description:
      "Supporting and encouraging women in their spiritual journey through fellowship, prayer, and Bible study.",
    activities: [
      "Women's Bible Study",
      "Prayer Groups",
      "Fellowship Events",
      "Outreach Programs",
    ],
  },
  {
    title: "Men's Ministry",
    description:
      "Building strong men of God through accountability, mentorship, and spiritual development.",
    activities: [
      "Men's Bible Study",
      "Accountability Groups",
      "Leadership Training",
      "Community Service",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Join us in worship, fellowship, and spiritual growth
          </p>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Service Schedule
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Regular services and activities to strengthen your faith
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground text-center">
                  {service.title}
                </h3>
                <div className="text-center mb-4">
                  {service.times ? (
                    <div className="space-y-1">
                      {service.times.map((time, i) => (
                        <p key={i} className="text-primary font-semibold">
                          {time}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-primary font-semibold">{service.time}</p>
                  )}
                </div>
                <p className="text-foreground/70 mb-4 text-center">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-foreground/80"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Our Ministries
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Specialized programs for different age groups and interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ministries.map((ministry, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {ministry.title}
                </h3>
                {ministry.ageRange && (
                  <p className="text-primary font-medium mb-3">
                    {ministry.ageRange}
                  </p>
                )}
                <p className="text-foreground/70 mb-4">
                  {ministry.description}
                </p>
                <div className="space-y-2">
                  {ministry.activities.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-foreground/80"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Special Programs
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Additional opportunities for spiritual growth and community
              involvement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl font-bold flex-shrink-0">
                  🎵
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Music Ministry
                  </h3>
                  <p className="text-foreground/70">
                    Join our choir and worship team to lead the congregation in
                    praise and worship.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center text-xl font-bold flex-shrink-0">
                  📚
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Bible Study Groups
                  </h3>
                  <p className="text-foreground/70">
                    In-depth study of God's Word in small group settings for
                    deeper understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl font-bold flex-shrink-0">
                  🤝
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Outreach Programs
                  </h3>
                  <p className="text-foreground/70">
                    Community service and evangelism initiatives to share God's
                    love with others.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Get Involved
              </h3>
              <p className="text-foreground/70 mb-6">
                There's a place for everyone in our church family. Find your
                ministry and start serving today.
              </p>
              <div className="space-y-4">
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us This Week</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the love of God and the warmth of our church family
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/events">View Schedule</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/location">Get Directions</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
