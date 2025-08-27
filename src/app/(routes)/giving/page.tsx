"use client";

import { Button } from "@/components/ui/button";

const givingMethods = [
  {
    title: "Sunday Service",
    description: "Give during our Sunday worship services",
    icon: "⛪",
    instructions: "Place your offering in the collection basket during service",
  },
  {
    title: "Online Giving",
    description: "Give securely through our online platform",
    icon: "💻",
    instructions: "Use our secure online giving portal",
  },
  {
    title: "Mobile Money",
    description: "Give via mobile money services",
    icon: "📱",
    instructions: "Send to our registered mobile money numbers",
  },
  {
    title: "Bank Transfer",
    description: "Direct bank transfer to our account",
    icon: "🏦",
    instructions: "Transfer to our church bank account",
  },
];

const givingCategories = [
  {
    title: "Tithe",
    description: "10% of your income as commanded in Malachi 3:10",
    percentage: "10%",
    purpose: "Supporting the church's general operations and ministry",
    verse: "Malachi 3:10",
  },
  {
    title: "Offering",
    description: "Voluntary gifts beyond the tithe",
    percentage: "As Led",
    purpose: "Special projects, missions, and outreach programs",
    verse: "2 Corinthians 9:7",
  },
  {
    title: "First Fruits",
    description: "Giving the first and best of your increase",
    percentage: "As Led",
    purpose: "Honoring God with your first fruits",
    verse: "Proverbs 3:9",
  },
  {
    title: "Special Projects",
    description: "Designated giving for specific needs",
    percentage: "As Led",
    purpose: "Building projects, missions, and special initiatives",
    verse: "Exodus 35:5",
  },
];

const impactAreas = [
  {
    title: "Church Operations",
    description:
      "Maintaining our facilities and supporting daily ministry activities",
    icon: "⛪",
    percentage: "40%",
  },
  {
    title: "Missions & Outreach",
    description: "Supporting local and international mission work",
    icon: "🌍",
    percentage: "25%",
  },
  {
    title: "Youth & Children",
    description: "Funding youth programs, children's ministry, and education",
    icon: "👶",
    percentage: "20%",
  },
  {
    title: "Community Service",
    description: "Helping those in need in our community",
    icon: "🤝",
    percentage: "15%",
  },
];

const testimonies = [
  {
    name: "John M.",
    testimony:
      "When I started tithing faithfully, God opened doors I never imagined. My business grew, and I found myself able to give even more.",
    category: "Tithing",
  },
  {
    name: "Sarah K.",
    testimony:
      "Giving to missions has been one of the most rewarding experiences. Knowing that my offering helps spread the Gospel brings me great joy.",
    category: "Missions",
  },
  {
    name: "David L.",
    testimony:
      "I was hesitant about tithing at first, but when I obeyed God's command, He proved faithful. My financial situation improved significantly.",
    category: "Tithing",
  },
];

export default function GivingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Give & Support
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Partner with us in advancing God's kingdom through faithful giving
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Why Give?</h2>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Giving is not just about money—it's about worship, obedience, and
            partnership in God's work. When we give, we acknowledge that
            everything we have comes from God and we trust Him to provide.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            <strong>2 Corinthians 9:7</strong> - "Each of you must give as you
            have made up your mind, not reluctantly or under compulsion, for God
            loves a cheerful giver."
          </p>
        </div>
      </section>

      {/* Giving Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Ways to Give
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Understanding the different types of giving and their biblical
              foundation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {givingCategories.map((category, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">
                    {category.title}
                  </h3>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-lg font-bold inline-block">
                    {category.percentage}
                  </div>
                </div>

                <p className="text-foreground/70 mb-4 text-center">
                  {category.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Purpose:
                    </h4>
                    <p className="text-sm text-foreground/70">
                      {category.purpose}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Biblical Reference:
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      {category.verse}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How to Give
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Multiple convenient ways to support our ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {givingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {method.title}
                </h3>
                <p className="text-foreground/70 mb-4">{method.description}</p>
                <p className="text-sm text-foreground/80">
                  {method.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact of Giving */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Your Giving Makes a Difference
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              See how your faithful giving impacts our church and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 text-center shadow-lg"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {area.title}
                </h3>
                <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-lg font-bold mb-4 inline-block">
                  {area.percentage}
                </div>
                <p className="text-foreground/70">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Stories of Faithful Giving
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Hear from members who have experienced God's faithfulness through
              giving
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((testimony, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-lg p-6 text-center"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    🙏
                  </div>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {testimony.category}
                  </span>
                </div>

                <blockquote className="text-foreground/80 mb-4 italic">
                  "{testimony.testimony}"
                </blockquote>

                <p className="font-semibold text-foreground">
                  {testimony.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Giving */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Give Online Today
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Secure, convenient online giving available 24/7
          </p>

          <div className="bg-card rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Online Giving Benefits
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Secure and encrypted
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Available 24/7
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Automatic receipts
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Recurring giving options
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Payment Methods
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Credit/Debit Cards
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Bank Transfer
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Mobile Money
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Digital Wallets
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="px-12">
                Give Now
              </Button>
              <Button variant="outline" size="lg">
                Set Up Recurring Giving
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Financial Transparency
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            We believe in being transparent about how your giving is used
          </p>

          <div className="bg-muted/30 rounded-lg p-8">
            <p className="text-foreground/80 mb-6">
              WCI Goderich is committed to financial transparency and
              accountability. We provide regular financial reports and ensure
              that all funds are used responsibly for ministry purposes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  📊
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Regular Reports
                </h4>
                <p className="text-sm text-foreground/70">
                  Monthly and annual financial reports available to members
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🔒
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Accountability
                </h4>
                <p className="text-sm text-foreground/70">
                  Independent audits and oversight by church council
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  💬
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Questions?
                </h4>
                <p className="text-sm text-foreground/70">
                  Contact our finance team for any questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Giving Journey</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the joy and blessing of faithful giving
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="px-12">
              Give Online
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
