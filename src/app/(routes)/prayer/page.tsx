"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function PrayerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    prayerRequest: "",
    isAnonymous: false,
    allowSharing: false,
  });

  const prayerPoints = [
    {
      title: "Personal Growth",
      points: [
        "Spiritual maturity and deeper relationship with God",
        "Wisdom and discernment in decision making",
        "Strength to overcome personal challenges",
        "Growth in faith and trust in God",
      ],
    },
    {
      title: "Family & Relationships",
      points: [
        "Unity and harmony in family relationships",
        "Healing of broken relationships",
        "Godly wisdom in parenting",
        "Marriage strengthening and restoration",
      ],
    },
    {
      title: "Church & Community",
      points: [
        "Church growth and spiritual revival",
        "Unity among believers",
        "Outreach and evangelism effectiveness",
        "Leadership wisdom and guidance",
      ],
    },
    {
      title: "Global Concerns",
      points: [
        "Peace in troubled regions",
        "End to poverty and suffering",
        "Spread of the Gospel worldwide",
        "Protection of persecuted Christians",
      ],
    },
  ];

  const testimonies = [
    {
      name: "Sarah M.",
      testimony:
        "God answered my prayer for healing after months of illness. I'm so grateful for the prayer support from our church family.",
      date: "December 2024",
    },
    {
      name: "John D.",
      testimony:
        "Through prayer, God provided a job when I was unemployed for 6 months. His timing is always perfect.",
      date: "November 2024",
    },
    {
      name: "Maria L.",
      testimony:
        "Prayer helped restore my broken relationship with my daughter. God is faithful to answer our prayers.",
      date: "October 2024",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Prayer request submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      prayerRequest: "",
      isAnonymous: false,
      allowSharing: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main className="pt-20">
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Prayer Requests
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Submit your prayer requests and join us in intercession
          </p>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Submit Your Prayer Request
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our prayer team is committed to lifting your needs before God
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-muted/30 rounded-lg p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="prayerRequest"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Prayer Request *
              </label>
              <textarea
                id="prayerRequest"
                name="prayerRequest"
                value={formData.prayerRequest}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Please share your prayer request in detail..."
              />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label
                  htmlFor="isAnonymous"
                  className="ml-2 text-sm text-foreground/70"
                >
                  Submit anonymously (your name will not be shared)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowSharing"
                  name="allowSharing"
                  checked={formData.allowSharing}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label
                  htmlFor="allowSharing"
                  className="ml-2 text-sm text-foreground/70"
                >
                  Allow sharing this request with the prayer team (for better
                  prayer support)
                </label>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="px-12"
              >
                Submit Prayer Request
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Prayer Points */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Prayer Points
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Join us in praying for these important areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prayerPoints.map((category, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-foreground text-center">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.points.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <p className="text-foreground/70">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Resources */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Prayer Resources
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Tools and materials to help strengthen your prayer life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📖
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Daily Prayer Guide
              </h3>
              <p className="text-foreground/70 mb-4">
                A structured guide to help you develop a consistent prayer
                routine
              </p>
              <Button variant="outline" size="sm">
                Download Guide
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎧
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Prayer Podcast
              </h3>
              <p className="text-foreground/70 mb-4">
                Listen to guided prayers and teachings on prayer
              </p>
              <Button variant="outline" size="sm">
                Listen Now
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Prayer App
              </h3>
              <p className="text-foreground/70 mb-4">
                Get prayer reminders and track answered prayers
              </p>
              <Button variant="outline" size="sm">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Testimonies */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Answered Prayers
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Testimonies of God's faithfulness in answering prayers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((testimony, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto">
                    🙏
                  </div>
                </div>
                <p className="text-foreground/80 mb-4 italic">
                  "{testimony.testimony}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-foreground">
                    {testimony.name}
                  </p>
                  <p className="text-sm text-foreground/70">{testimony.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Meeting Times */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Join Our Prayer Meetings
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Come together with other believers to pray and intercede
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Covenant Hour of Prayer
              </h3>
              <p className="text-primary font-semibold mb-2">
                Weekdays: 6:00 AM
              </p>
              <p className="text-primary font-semibold mb-4">
                Saturdays: 7:00 AM
              </p>
              <p className="text-foreground/70">
                Start your day with prayer and intercession
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Wednesday Prayer Service
              </h3>
              <p className="text-primary font-semibold mb-2">
                Wednesdays: 6:00 PM
              </p>
              <p className="text-foreground/70">
                Evening prayer service with communion
              </p>
            </div>
          </div>

          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View Full Schedule</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Pray Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Prayer is powerful and effective. Join us in lifting up our needs to
            God
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Join Prayer Meetings</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
