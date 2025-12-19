"use client";

import SectionHeader from "@/components/SectionHeader";
import { WOFBI } from "@/lib/constants";
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
  DollarSign,
  BookOpen,
  CheckCircle2,
  Award,
  Users,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import { Separator } from "@/components/ui/separator";

export default function WofbiPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary via-primary/90 to-accent text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative small-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{WOFBI.title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Raising a New Generation of Leaders Through Biblical Education
          </p>
          <p className="text-lg mt-4 max-w-2xl mx-auto opacity-80">
            {WOFBI.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card">
        <div className="small-container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{WOFBI.mission}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{WOFBI.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <SectionHeader
            title="Our Programs"
            subtitle="Training Programs"
            description="Choose the program that best fits your spiritual journey and ministry goals"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WOFBI.programs.map((program) => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-shadow flex flex-col grow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <Badge
                      variant={
                        program.level === "Beginner"
                          ? "default"
                          : program.level === "Intermediate"
                          ? "default"
                          : "outline"
                      }
                    >
                      {program.level}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {program.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grow flex flex-col">
                  <p className="text-foreground/70 mb-4">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Subjects:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {program.curriculum && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">
                        Curriculum Includes:
                      </h4>
                      <ul className="space-y-1 text-sm text-foreground/70">
                        {program.curriculum.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {program.curriculum.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{program.curriculum.length - 3} more topics
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {program.benefits && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                      <ul className="space-y-1 text-sm text-foreground/70">
                        {program.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2 mb-4 text-sm text-foreground/70 mt-auto">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span>{program.fee}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-auto"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Program Information */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="Program Details"
            subtitle="Learn More"
            description="Detailed information about each program to help you make the right choice"
          />

          <div className="space-y-12">
            {WOFBI.programs.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {program.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {program.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Subjects Covered
                      </h4>
                      <div className="space-y-2">
                        {program.subjects.map((subject, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {program.curriculum && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          Curriculum
                        </h4>
                        <ul className="space-y-2">
                          {program.curriculum.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {program.requirements && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {program.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground/70"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.benefits && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground/70"
                          >
                            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>
                          <strong>Duration:</strong> {program.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          <strong>Schedule:</strong> {program.schedule}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span>
                          <strong>Fee:</strong> {program.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Information */}
      <section className="py-20 bg-muted/30">
        <div className="small-container max-w-4xl">
          <SectionHeader
            title={WOFBI.admissionInfo.title}
            subtitle="Get Started"
            description={WOFBI.admissionInfo.description}
          />

          <Card>
            <CardHeader>
              <CardTitle>Admission Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {WOFBI.admissionInfo.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground/70 pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="font-semibold">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${WOFBI.admissionInfo.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {WOFBI.admissionInfo.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href={`tel:${WOFBI.admissionInfo.contact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {WOFBI.admissionInfo.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground/70">
                      {WOFBI.admissionInfo.contact.officeHours}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonies */}
      {WOFBI.testimonies && WOFBI.testimonies.length > 0 && (
        <section className="py-20 bg-card">
          <div className="small-container">
            <SectionHeader
              title="What Our Students Say"
              subtitle="Testimonies"
              description="Hear from graduates and current students about their WOFBI experience"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WOFBI.testimonies.map((testimony, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{testimony.name}</CardTitle>
                    <CardDescription>{testimony.program}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 italic">
                      &quot;{testimony.testimony}&quot;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <CtaSection
        title="Start Your Journey Today"
        description="Join WOFBI and begin your transformation"
        mainText="Take the first step towards becoming a well-equipped leader in ministry. Our programs are designed to help you grow in knowledge, faith, and practical ministry skills. Apply now or contact us for more information."
        buttons={[
          { text: "Apply Now", href: "/contact-us" },
          { text: "Learn More", href: "/education" },
        ]}
      />
    </div>
  );
}
