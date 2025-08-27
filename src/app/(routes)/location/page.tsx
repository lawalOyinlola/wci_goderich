"use client";

import { Button } from "@/components/ui/button";

export default function LocationPage() {
  const serviceTimes = [
    { day: "Sunday", times: ["7:00 AM", "9:00 AM", "11:00 AM"] },
    { day: "Monday", times: ["6:00 PM (90 Minutes with Jesus)"] },
    { day: "Tuesday", times: ["6:00 AM (Covenant Hour of Prayer)"] },
    {
      day: "Wednesday",
      times: [
        "6:00 AM (Covenant Hour of Prayer)",
        "6:00 PM (Communion Service)",
      ],
    },
    { day: "Thursday", times: ["6:00 AM (Covenant Hour of Prayer)"] },
    { day: "Friday", times: ["6:00 AM (Covenant Hour of Prayer)"] },
    {
      day: "Saturday",
      times: [
        "7:00 AM (Covenant Hour of Prayer)",
        "5:00 PM (Home Cell Groups)",
      ],
    },
  ];

  const facilities = [
    {
      title: "Main Auditorium",
      description: "1,500-seater sanctuary with modern audio-visual equipment",
      icon: "⛪",
    },
    {
      title: "Children's Church",
      description: "Dedicated space for children's ministry and Sunday School",
      icon: "👶",
    },
    {
      title: "Youth Center",
      description: "Modern facility for youth activities and Bible study",
      icon: "🧒",
    },
    {
      title: "Fellowship Hall",
      description: "Multi-purpose space for events, meetings, and fellowship",
      icon: "🤝",
    },
    {
      title: "Library",
      description:
        "Extensive collection of Christian books and study materials",
      icon: "📚",
    },
    {
      title: "Prayer Room",
      description: "Quiet space for personal prayer and meditation",
      icon: "🙏",
    },
  ];

  const nearbyLandmarks = [
    "Goderich Market (5 minutes walk)",
    "Goderich Bus Station (10 minutes walk)",
    "Goderich Police Station (15 minutes walk)",
    "Goderich Hospital (20 minutes walk)",
    "Goderich Beach (25 minutes walk)",
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Visit WCI Goderich and experience the love of God
          </p>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Address & Contact */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Church Location
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    📍 Address
                  </h3>
                  <p className="text-foreground/80 text-lg leading-relaxed">
                    WCI Goderich Auditorium
                    <br />
                    Main Street, Goderich
                    <br />
                    Western Area, Sierra Leone
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    📞 Contact
                  </h3>
                  <div className="space-y-2 text-foreground/80">
                    <p>Phone: +232 88 123 456</p>
                    <p>Email: info@wcigoderich.org</p>
                    <p>WhatsApp: +232 88 123 456</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    🚗 Parking
                  </h3>
                  <p className="text-foreground/80">
                    Free parking available on church premises and surrounding
                    streets
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    href="/contact"
                    className="mr-4"
                  >
                    Get Directions
                  </Button>
                  <Button variant="outline" size="lg" href="/contact">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🗺️
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Interactive Map
                </h3>
                <p className="text-foreground/70 mb-4">
                  Map integration coming soon! For now, use the address and
                  directions below.
                </p>
                <Button variant="outline" size="sm">
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Service Times
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Join us for worship and fellowship throughout the week
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceTimes.slice(0, 4).map((service, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {service.day}
                    </h3>
                    <div className="space-y-1">
                      {service.times.map((time, i) => (
                        <p key={i} className="text-foreground/70">
                          {time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceTimes.slice(4).map((service, index) => (
                  <div key={index + 4} className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">
                      {service.day}
                    </h4>
                    {service.times.map((time, i) => (
                      <p key={i} className="text-foreground/70 text-sm">
                        {time}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Our Facilities
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Modern, comfortable spaces designed for worship and fellowship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {facility.title}
                </h3>
                <p className="text-foreground/70">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions & Transportation */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How to Get Here
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Easy access from anywhere in Goderich and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                🚶 Walking
              </h3>
              <p className="text-foreground/70 mb-4">
                Located in the heart of Goderich, easily accessible on foot from
                most areas in town.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• From Goderich Market: 5 minutes</li>
                <li>• From Bus Station: 10 minutes</li>
                <li>• From Police Station: 15 minutes</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                🚌 Public Transport
              </h3>
              <p className="text-foreground/70 mb-4">
                Well-connected by public transportation from all parts of the
                city.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Bus routes: 1, 3, 5, 7</li>
                <li>• Taxi stands nearby</li>
                <li>• Motorcycle taxis available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Nearby Landmarks
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Easy to find with these recognizable locations nearby
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyLandmarks.map((landmark, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-foreground/80">{landmark}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visit Planning */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Plan Your Visit
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Make the most of your visit to WCI Goderich
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                ⏰
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Arrive Early
              </h3>
              <p className="text-foreground/70">
                Come 15-20 minutes before service to find parking and get
                settled
              </p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                👕
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Dress Code
              </h3>
              <p className="text-foreground/70">
                Come as you are - we welcome everyone regardless of attire
              </p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                🚗
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Parking
              </h3>
              <p className="text-foreground/70">
                Free parking available on church premises and surrounding areas
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" href="/services">
              View Service Schedule
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Ask Questions
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            We Can&apos;t Wait to Meet You
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us this Sunday and experience the love of God in our church
            family
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" href="/services">
              Service Times
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
