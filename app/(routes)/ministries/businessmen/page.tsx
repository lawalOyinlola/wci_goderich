"use client";

import SectionHeader from "@/components/SectionHeader";
import { MINISTRY_DETAILS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Briefcase,
  Users,
  Target,
  TrendingUp,
  Award,
  Shield,
  Handshake,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";

export default function BusinessmenFellowshipPage() {
  const ministry = MINISTRY_DETAILS.businessmen;

  return (
    <div className="pt-20">
      {/* Hero Section - Professional and Strong */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ministry.colors.primary} 0%, ${ministry.colors.secondary} 100%)`,
        }}
      >
        {/* <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div> */}
        <div className="relative small-container text-center">
          <div className="flex justify-center mb-4">
            <Briefcase className="h-12 w-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {ministry.title}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-2">
            {ministry.subtitle}
          </p>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            {ministry.tagline}
          </p>
          <Badge variant="default" className="text-lg px-4 py-2">
            {ministry.ageRange}
          </Badge>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-card">
        <div className="small-container max-w-4xl text-center">
          <SectionHeader
            title="Building Strong Men of God"
            subtitle="About"
            description={ministry.description}
          />
          <div
            className="mt-8 p-6 rounded-lg border-2"
            style={{
              borderColor: ministry.colors.primary,
              backgroundColor: `${ministry.colors.primary}10`,
            }}
          >
            <p className="text-lg text-foreground/80 italic flex items-center justify-center gap-2">
              <Shield
                className="h-5 w-5"
                style={{ color: ministry.colors.primary }}
              />
              &quot;Be strong and courageous. Do not be afraid...&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">- Joshua 1:9</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="small-container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              className="border-2"
              style={{ borderColor: ministry.colors.primary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target
                    className="h-5 w-5"
                    style={{ color: ministry.colors.primary }}
                  />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{ministry.mission}</p>
              </CardContent>
            </Card>
            <Card
              className="border-2"
              style={{ borderColor: ministry.colors.secondary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp
                    className="h-5 w-5"
                    style={{ color: ministry.colors.secondary }}
                  />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{ministry.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="Our Programs"
            subtitle="What We Offer"
            description="Comprehensive programs designed to build strong men of God"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministry.programs.map((program) => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-all border-2"
                style={{ borderColor: ministry.colors.accent }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <Briefcase
                      className="h-5 w-5"
                      style={{ color: ministry.colors.primary }}
                    />
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Users className="h-4 w-4" />
                    {program.ageGroup}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{program.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <SectionHeader
            title="What We Do"
            subtitle="Activities"
            description="Activities designed for growth, accountability, and excellence"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ministry.activities.map((activity, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all border-2"
                style={{
                  borderColor: ministry.colors.primary,
                  borderWidth: "2px",
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    {index % 4 === 0 ? (
                      <Briefcase
                        className="h-8 w-8"
                        style={{ color: ministry.colors.primary }}
                      />
                    ) : index % 4 === 1 ? (
                      <Handshake
                        className="h-8 w-8"
                        style={{ color: ministry.colors.secondary }}
                      />
                    ) : index % 4 === 2 ? (
                      <Award
                        className="h-8 w-8"
                        style={{ color: ministry.colors.accent }}
                      />
                    ) : (
                      <Shield
                        className="h-8 w-8"
                        style={{ color: ministry.colors.primary }}
                      />
                    )}
                  </div>
                  <p className="font-medium">{activity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="Our Core Principles"
            subtitle="Principles"
            description="Biblical principles that guide our fellowship"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {ministry.principles.map((principle, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center font-semibold border-2 flex items-center justify-center gap-2"
                style={{
                  borderColor: ministry.colors.primary,
                  backgroundColor: `${ministry.colors.primary}10`,
                }}
              >
                <CheckCircle2
                  className="h-5 w-5"
                  style={{ color: ministry.colors.accent }}
                />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-muted/30">
        <div className="small-container max-w-4xl">
          <SectionHeader
            title="When We Meet"
            subtitle="Schedule"
            description="Join us for fellowship, prayer, and growth"
          />

          <Card>
            <CardHeader>
              <CardTitle>Regular Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar
                  className="h-5 w-5"
                  style={{ color: ministry.colors.primary }}
                />
                <div>
                  <p className="font-semibold">Sunday Service</p>
                  <p className="text-sm text-muted-foreground">
                    {ministry.schedule.sunday}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar
                  className="h-5 w-5"
                  style={{ color: ministry.colors.secondary }}
                />
                <div>
                  <p className="font-semibold">Monthly Fellowship</p>
                  <p className="text-sm text-muted-foreground">
                    {ministry.schedule.fellowship}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar
                  className="h-5 w-5"
                  style={{ color: ministry.colors.accent }}
                />
                <div>
                  <p className="font-semibold">Prayer Meeting</p>
                  <p className="text-sm text-muted-foreground">
                    {ministry.schedule.prayer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar
                  className="h-5 w-5"
                  style={{ color: ministry.colors.primary }}
                />
                <div>
                  <p className="font-semibold">Business Seminars</p>
                  <p className="text-sm text-muted-foreground">
                    {ministry.schedule.specialEvents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-card">
        <div className="small-container max-w-4xl">
          <SectionHeader
            title="Get in Touch"
            subtitle="Contact"
            description="Interested in joining? Have questions? Contact us!"
          />

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <Mail
                  className="h-5 w-5"
                  style={{ color: ministry.colors.primary }}
                />
                <a
                  href={`mailto:${ministry.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {ministry.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone
                  className="h-5 w-5"
                  style={{ color: ministry.colors.secondary }}
                />
                <a
                  href={`tel:${ministry.contact.phone}`}
                  className="text-primary hover:underline"
                >
                  {ministry.contact.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <CtaSection
        title="Join Businessmen Fellowship"
        description="Connect with men who are committed to excellence in business and faith"
        mainText="Whether you're an entrepreneur, professional, or business owner, Businessmen Fellowship provides the support, accountability, and spiritual foundation you need to excel. Join us and be part of a community of men committed to building strong businesses and strong faith."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "View All Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}
