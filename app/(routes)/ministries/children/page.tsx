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
  Heart,
  Music,
  BookOpen,
  Sparkles,
  Smile,
  Star,
  Users,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";

export default function ChildrenMinistryPage() {
  const ministry = MINISTRY_DETAILS.children;

  return (
    <div className="pt-20">
      {/* Hero Section - Playful and Colorful */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ministry.colors.primary} 0%, ${ministry.colors.secondary} 50%, ${ministry.colors.accent} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
        <div className="relative small-container text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 animate-pulse" />
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
            title="Welcome to Our Fun-Filled Ministry!"
            subtitle="About"
            description={ministry.description}
          />
          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${ministry.colors.accent}20` }}>
            <p className="text-lg text-foreground/80 italic flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" style={{ color: ministry.colors.primary }} />
              &quot;Let the little children come to me...&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">- Matthew 19:14</p>
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
                  <Star className="h-5 w-5" style={{ color: ministry.colors.primary }} />
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
                  <Smile className="h-5 w-5" style={{ color: ministry.colors.secondary }} />
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
            title="Our Fun Programs"
            subtitle="Programs"
            description="Exciting programs designed to make learning about God fun and engaging!"
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
                    <Sparkles className="h-5 w-5" style={{ color: ministry.colors.primary }} />
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
            description="Fun activities that help children learn and grow in their faith"
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
                    {index % 4 === 0 ? (
                      <BookOpen className="h-8 w-8" style={{ color: ministry.colors.primary }} />
                    ) : index % 4 === 1 ? (
                      <Music className="h-8 w-8" style={{ color: ministry.colors.secondary }} />
                    ) : index % 4 === 2 ? (
                      <Sparkles className="h-8 w-8" style={{ color: ministry.colors.accent }} />
                    ) : (
                      <Heart className="h-8 w-8" style={{ color: ministry.colors.primary }} />
                    )}
                  </div>
                  <p className="font-medium">{activity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="What We Teach"
            subtitle="Values"
            description="Important values we instill in our children"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ministry.values.map((value, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center font-semibold"
                style={{
                  backgroundColor: `${ministry.colors.accent}30`,
                  color: ministry.colors.primary,
                }}
              >
                {value}
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
            description="Join us for fun-filled activities and learning!"
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
            description="Have questions? We'd love to hear from you!"
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
        title="Join the Fun!"
        description="Bring your children and let them experience God's love in a fun and safe environment"
        mainText="We welcome all children to join us for exciting activities, Bible stories, songs, and lots of fun! Parents are always welcome to visit and see what we're all about."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "View All Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}

