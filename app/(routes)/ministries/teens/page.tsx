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
  Zap,
  Users,
  Target,
  TrendingUp,
  Heart,
  BookOpen,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";

export default function TeensChurchPage() {
  const ministry = MINISTRY_DETAILS.teens;

  return (
    <div className="pt-20">
      {/* Hero Section - Energetic and Modern */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ministry.colors.primary} 0%, ${ministry.colors.secondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative small-container text-center">
          <div className="flex justify-center mb-4">
            <Zap className="h-12 w-12 animate-pulse" />
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
            title="A Place Where Teens Thrive"
            subtitle="About"
            description={ministry.description}
          />
          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${ministry.colors.accent}20` }}>
            <p className="text-lg text-foreground/80 italic flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" style={{ color: ministry.colors.primary }} />
              &quot;Don't let anyone look down on you because you are young...&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">- 1 Timothy 4:12</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="small-container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2" style={{ borderColor: ministry.colors.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" style={{ color: ministry.colors.primary }} />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{ministry.mission}</p>
              </CardContent>
            </Card>
            <Card className="border-2" style={{ borderColor: ministry.colors.secondary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" style={{ color: ministry.colors.secondary }} />
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
            description="Dynamic programs designed specifically for teenagers"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministry.programs.map((program) => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-all hover:scale-105 border-2"
                style={{ borderColor: ministry.colors.accent }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <Zap className="h-5 w-5" style={{ color: ministry.colors.primary }} />
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Users className="h-4 w-4" />
                    {program.ageGroup}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">{program.description}</p>
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
            description="Engaging activities that help teens grow in faith and friendship"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ministry.activities.map((activity, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all hover:scale-105"
                style={{
                  borderColor: index % 2 === 0 ? ministry.colors.primary : ministry.colors.secondary,
                  borderWidth: "2px",
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <Zap className="h-8 w-8" style={{ color: ministry.colors.primary }} />
                  </div>
                  <p className="font-medium">{activity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="Topics We Cover"
            subtitle="Relevant Topics"
            description="Real topics for real teens facing real challenges"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {ministry.topics.map((topic, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center font-semibold border-2"
                style={{
                  borderColor: ministry.colors.accent,
                  backgroundColor: `${ministry.colors.accent}10`,
                }}
              >
                {topic}
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
            description="Join us for dynamic worship and relevant teachings"
          />

          <Card>
            <CardHeader>
              <CardTitle>Regular Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5" style={{ color: ministry.colors.primary }} />
                <div>
                  <p className="font-semibold">Sunday Service</p>
                  <p className="text-sm text-muted-foreground">{ministry.schedule.sunday}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5" style={{ color: ministry.colors.secondary }} />
                <div>
                  <p className="font-semibold">Midweek Connect</p>
                  <p className="text-sm text-muted-foreground">{ministry.schedule.midweek}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5" style={{ color: ministry.colors.accent }} />
                <div>
                  <p className="font-semibold">Special Events</p>
                  <p className="text-sm text-muted-foreground">{ministry.schedule.specialEvents}</p>
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
            description="Questions? Want to get involved? Reach out to us!"
          />

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5" style={{ color: ministry.colors.primary }} />
                <a
                  href={`mailto:${ministry.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {ministry.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5" style={{ color: ministry.colors.secondary }} />
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
        title="Join Us Today!"
        description="Be part of a community where you can be yourself and grow in your faith"
        mainText="Whether you're new to faith or looking to grow deeper, Teens Church is the place for you. Come as you are and experience authentic community, relevant teaching, and real relationships."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "View All Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}

