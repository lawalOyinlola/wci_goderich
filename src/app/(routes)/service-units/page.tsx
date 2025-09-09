"use client";

// import Image from "next/image"; // Unused import removed
import { Button } from "@/components/ui/button";
import Link from "next/link";

const serviceUnits = [
  {
    title: "Ushering & Protocol",
    icon: "🤝",
    description:
      "Welcome and assist church members and visitors during services and events.",
    responsibilities: [
      "Greet and welcome attendees",
      "Assist with seating arrangements",
      "Maintain order during services",
      "Handle special needs and requests",
    ],
    requirements: "Friendly, organized, and available for Sunday services",
    meetingTime: "Sundays: 6:30 AM (Pre-service briefing)",
    currentOpenings: 8,
  },
  {
    title: "Music & Worship",
    icon: "🎵",
    description:
      "Lead the congregation in praise and worship through music and song.",
    responsibilities: [
      "Lead worship during services",
      "Practice and rehearse songs",
      "Maintain musical instruments",
      "Coordinate with other musicians",
    ],
    requirements: "Musical talent, commitment to practice, heart for worship",
    meetingTime: "Wednesdays: 6:00 PM (Practice)",
    currentOpenings: 5,
  },
  {
    title: "Children's Ministry",
    icon: "👶",
    description:
      "Nurture and teach children about God's love and biblical principles.",
    responsibilities: [
      "Teach Sunday School lessons",
      "Organize children's activities",
      "Ensure children's safety",
      "Build relationships with families",
    ],
    requirements: "Love for children, patience, basic teaching skills",
    meetingTime: "Saturdays: 3:00 PM (Planning)",
    currentOpenings: 12,
  },
  {
    title: "Technical & Media",
    icon: "🎥",
    description:
      "Handle audio, visual, and technical aspects of church services and events.",
    responsibilities: [
      "Operate sound equipment",
      "Manage video and lighting",
      "Record and stream services",
      "Maintain technical equipment",
    ],
    requirements: "Technical aptitude, attention to detail, reliability",
    meetingTime: "Sundays: 6:00 AM (Setup)",
    currentOpenings: 3,
  },
  {
    title: "Prayer & Intercession",
    icon: "🙏",
    description:
      "Lead prayer sessions and intercede for the church and community.",
    responsibilities: [
      "Lead prayer meetings",
      "Intercede for prayer requests",
      "Organize prayer chains",
      "Provide spiritual support",
    ],
    requirements: "Strong prayer life, spiritual maturity, compassion",
    meetingTime: "Daily: 6:00 AM (Covenant Hour)",
    currentOpenings: 15,
  },
  {
    title: "Outreach & Evangelism",
    icon: "🌍",
    description:
      "Share the Gospel and serve the community through various outreach programs.",
    responsibilities: [
      "Participate in evangelism",
      "Organize community service",
      "Visit and pray for people",
      "Coordinate outreach events",
    ],
    requirements: "Heart for evangelism, good communication skills",
    meetingTime: "Saturdays: 9:00 AM (Outreach)",
    currentOpenings: 20,
  },
];

const benefits = [
  {
    title: "Spiritual Growth",
    description:
      "Deepen your relationship with God through service and ministry",
    icon: "📈",
  },
  {
    title: "Skill Development",
    description: "Learn new skills and discover hidden talents",
    icon: "🎯",
  },
  {
    title: "Community Building",
    description: "Build meaningful relationships with fellow believers",
    icon: "🤝",
  },
  {
    title: "Leadership Experience",
    description: "Develop leadership and organizational skills",
    icon: "👑",
  },
  {
    title: "Fulfillment",
    description: "Experience the joy of serving God and others",
    icon: "😊",
  },
  {
    title: "Kingdom Impact",
    description: "Make a difference in people's lives and the community",
    icon: "🌟",
  },
];

export default function ServiceUnitsPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join a Service Unit
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Discover your calling and make a difference in God&apos;s kingdom
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Why Join a Service Unit?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Service units are the backbone of our church ministry. They provide
            opportunities for every member to contribute their time, talents,
            and resources to advance God&apos;s kingdom. Whether you&apos;re
            skilled in music, have a heart for children, or want to serve behind
            the scenes, there&apos;s a place for you.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            <strong>1 Corinthians 12:27</strong> - &quot;Now you are the body of
            Christ, and each one of you is a part of it.&quot;
          </p>
        </div>
      </section>

      {/* Service Units Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Available Service Units
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Find the perfect ministry opportunity that matches your gifts and
              passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceUnits.map((unit, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{unit.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {unit.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      {unit.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Responsibilities:
                      </h4>
                      <ul className="space-y-1 text-sm text-foreground/70">
                        {unit.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Requirements:
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {unit.requirements}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Meeting Time:
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {unit.meetingTime}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm text-primary font-medium">
                        {unit.currentOpenings} openings available
                      </span>
                      <Button variant="outline" size="sm">
                        Join Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Serving */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Benefits of Joining a Service Unit
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover how serving can transform your life and faith journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How to Join
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Simple steps to get started in your ministry journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Step-by-Step Process
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Pray & Reflect
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Ask God to guide you to the right service unit
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Choose a Unit
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Select a service unit that matches your gifts and
                      interests
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Contact Leader
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Reach out to the service unit leader or coordinator
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Start Serving
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Begin your ministry journey with training and support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Get Started Today
              </h3>
              <p className="text-foreground/70 mb-6">
                Ready to make a difference? Contact us to learn more about
                joining a service unit.
              </p>

              <div className="space-y-4">
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/prayer">Prayer Request</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/services">View Services</Link>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Need Help Choosing?
                </h4>
                <p className="text-sm text-foreground/70">
                  Our ministry leaders can help you find the perfect service
                  unit based on your gifts, interests, and availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Serve?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join a service unit and discover the joy of serving God and others
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
