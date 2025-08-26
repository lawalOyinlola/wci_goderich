"use client";

import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const footerSections = [
    {
      title: "About Us",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Mission & Vision", href: "/about" },
        { label: "Leadership", href: "/about" },
        { label: "Core Values", href: "/about" },
      ],
    },
    {
      title: "Ministries",
      links: [
        { label: "Services", href: "/services" },
        { label: "Service Units", href: "/service-units" },
        { label: "WOFBI", href: "/wofbi" },
        { label: "Education", href: "/education" },
        { label: "Homecell", href: "/homecell" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Media Library", href: "/media" },
        { label: "Book Library", href: "/library" },
        { label: "Photo Gallery", href: "/gallery" },
        { label: "Testimonies", href: "/testimonies" },
        { label: "Prayer Requests", href: "/prayer" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { label: "Join Service Unit", href: "/service-units" },
        { label: "Give Online", href: "/giving" },
        { label: "Prayer Team", href: "/prayer" },
        { label: "Volunteer", href: "/service-units" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const quickLinks = [
    { label: "Service Times", href: "/services" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Location & Directions", href: "/location" },
    { label: "Pastors", href: "/pastors" },
  ];

  return (
    <footer className="bg-secondary-foreground text-primary-foreground py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">WCI</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">WCI Goderich</h3>
                <p className="text-sm text-primary-foreground/70">
                  Living Faith Church
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Spreading the Gospel and transforming lives in Sierra Leone and
              beyond. Join us in our mission to share God&apos;s love with
              everyone.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>📍 Main Street, Goderich, Western Area</p>
              <p>📞 +232 88 123 456</p>
              <p>✉️ info@wcigoderich.org</p>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href as Route}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary rounded-lg p-6 mb-8">
          <div className="text-center">
            <h4 className="font-semibold text-white mb-2">Stay Connected</h4>
            <p className="text-primary-foreground/70 mb-4">
              Get updates about services, events, and ministry opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-secondary-600 bg-secondary-700 text-white placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="accent" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Links & Social */}
        <div className="border-t border-secondary-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="flex flex-wrap gap-4">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href as Route}
                    className="bg-secondary-800 hover:bg-secondary-700 text-primary-foreground/80 hover:text-accent px-3 py-2 rounded-md text-sm transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Button
                  href="https://facebook.com"
                  aria-label="Facebook"
                  variant="link"
                  className="text-primary-foreground hover:text-accent"
                >
                  Facebook
                </Button>
                <Button
                  href="https://twitter.com"
                  aria-label="Twitter"
                  variant="link"
                  className="text-primary-foreground hover:text-accent"
                >
                  Twitter
                </Button>
                <Button
                  href="https://instagram.com"
                  aria-label="Instagram"
                  variant="link"
                  className="text-primary-foreground hover:text-accent"
                >
                  Instagram
                </Button>
                <Button
                  href="https://youtube.com"
                  aria-label="YouTube"
                  variant="link"
                  className="text-primary-foreground hover:text-accent"
                >
                  YouTube
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm">
              &copy; {new Date().getFullYear()} WCI Goderich. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm text-primary-foreground/70">
              <Link
                // fix route
                href="/about"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                // fix route
                href="/about"
                className="hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
