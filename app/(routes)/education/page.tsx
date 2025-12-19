"use client";

import SectionHeader from "@/components/SectionHeader";
import { SCHOOLS, WOFBI } from "@/lib/constants";
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
  MapPin,
  Globe,
  Calendar,
  GraduationCap,
  School,
  University,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";

const getSchoolTypeIcon = (type: string) => {
  switch (type) {
    case "primary":
      return <School className="h-5 w-5" />;
    case "secondary":
      return <GraduationCap className="h-5 w-5" />;
    case "university":
      return <University className="h-5 w-5" />;
    default:
      return <School className="h-5 w-5" />;
  }
};

const getSchoolTypeLabel = (type: string) => {
  switch (type) {
    case "primary":
      return "Primary School";
    case "secondary":
      return "Secondary School";
    case "university":
      return "University";
    default:
      return "School";
  }
};

export default function EducationPage() {
  const sierraLeoneSchools = [
    ...SCHOOLS.sierraLeone.primary,
    ...SCHOOLS.sierraLeone.secondary,
    ...SCHOOLS.sierraLeone.university,
  ];

  const nigeriaSchools = [
    ...SCHOOLS.nigeria.primary,
    ...SCHOOLS.nigeria.secondary,
    ...SCHOOLS.nigeria.university,
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary via-primary/90 to-accent text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative small-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Education & Schools
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Excellence in Education, Rooted in Faith
          </p>
          <p className="text-lg mt-4 max-w-2xl mx-auto opacity-80">
            Winners Chapel International is committed to providing quality
            education from primary to university level, nurturing future leaders
            with Christian values and academic excellence.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-card">
        <div className="small-container max-w-4xl text-center">
          <SectionHeader
            title="Our Educational Mission"
            subtitle="Education"
            description="At Winners Chapel International, we believe that education is a vital tool for transformation. Our schools and educational institutions are dedicated to raising a new generation of leaders who excel academically while maintaining strong Christian values and character."
          />
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <p className="text-lg text-foreground/80 italic">
              &quot;Train up a child in the way he should go: and when he is
              old, he will not depart from it.&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              - Proverbs 22:6
            </p>
          </div>
        </div>
      </section>

      {/* Sierra Leone Schools */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <SectionHeader
            title="Schools in Sierra Leone"
            subtitle="Sierra Leone"
            description="Our educational institutions in Sierra Leone, providing quality Christian education to the community."
          />

          {/* Primary Schools - Sierra Leone */}
          {SCHOOLS.sierraLeone.primary.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                Primary Schools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SCHOOLS.sierraLeone.primary.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getSchoolTypeIcon(school.type)}
                          <CardTitle className="text-xl">
                            {school.name}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {getSchoolTypeLabel(school.type)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {school.description && (
                        <p className="text-foreground/70 mb-4">
                          {school.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {"established" in school && school.established && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {school.established}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Schools - Sierra Leone */}
          {SCHOOLS.sierraLeone.secondary.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Secondary Schools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SCHOOLS.sierraLeone.secondary.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getSchoolTypeIcon(school.type)}
                          <CardTitle className="text-xl">
                            {school.name}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {getSchoolTypeLabel(school.type)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {school.description && (
                        <p className="text-foreground/70 mb-4">
                          {school.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {"established" in school && school.established && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {school.established}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nigeria Schools */}
      <section className="py-20 bg-card">
        <div className="small-container">
          <SectionHeader
            title="Schools in Nigeria"
            subtitle="Nigeria"
            description="Our comprehensive educational institutions in Nigeria, from primary to university level."
          />

          {/* Primary Schools - Nigeria */}
          {SCHOOLS.nigeria.primary.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                Primary Schools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SCHOOLS.nigeria.primary.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getSchoolTypeIcon(school.type)}
                          <CardTitle className="text-xl">
                            {school.name}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {getSchoolTypeLabel(school.type)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {school.description && (
                        <p className="text-foreground/70 mb-4">
                          {school.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {"established" in school &&
                          typeof school.established === "string" &&
                          school.established && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Est. {school.established}</span>
                            </div>
                          )}
                        {"website" in school &&
                          typeof school.website === "string" &&
                          school.website && (
                            <Button
                              variant="link"
                              size="sm"
                              asChild
                              className="h-auto p-0"
                            >
                              <Link
                                href={school.website}
                                target="_blank"
                                className="flex items-center gap-1"
                              >
                                <Globe className="h-3 w-3" />
                                <span>Visit Website</span>
                              </Link>
                            </Button>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Schools - Nigeria */}
          {SCHOOLS.nigeria.secondary.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Secondary Schools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SCHOOLS.nigeria.secondary.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getSchoolTypeIcon(school.type)}
                          <CardTitle className="text-xl">
                            {school.name}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {getSchoolTypeLabel(school.type)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {school.description && (
                        <p className="text-foreground/70 mb-4">
                          {school.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {"established" in school && school.established && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {school.established}</span>
                          </div>
                        )}
                        {"website" in school && school.website && (
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="h-auto p-0"
                          >
                            <Link
                              href={school.website}
                              target="_blank"
                              className="flex items-center gap-1"
                            >
                              <Globe className="h-3 w-3" />
                              <span>Visit Website</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Universities - Nigeria */}
          {SCHOOLS.nigeria.university.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <University className="h-6 w-6 text-primary" />
                Universities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SCHOOLS.nigeria.university.map((school) => (
                  <Card
                    key={school.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getSchoolTypeIcon(school.type)}
                          <CardTitle className="text-xl">
                            {school.name}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {getSchoolTypeLabel(school.type)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {school.description && (
                        <p className="text-foreground/70 mb-4">
                          {school.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {"established" in school && school.established && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {school.established}</span>
                          </div>
                        )}
                        {"website" in school && school.website && (
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="h-auto p-0"
                          >
                            <Link
                              href={school.website}
                              target="_blank"
                              className="flex items-center gap-1"
                            >
                              <Globe className="h-3 w-3" />
                              <span>Visit Website</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WOFBI Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <SectionHeader
            title={WOFBI.title}
            subtitle={WOFBI.subtitle}
            description={WOFBI.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WOFBI.programs.map((program) => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <Badge variant="outline">{program.level}</Badge>
                  </div>
                  <CardDescription>{program.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">💰</span>
                      <span>{program.fee}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/wofbi">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/wofbi">View All WOFBI Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CtaSection
        title="Join Our Educational Community"
        description="Be part of our commitment to excellence in education"
        mainText="Whether you're looking for primary, secondary, or university education, or interested in our Bible training programs, we invite you to explore our educational institutions and programs. Contact us to learn more about admissions, programs, and how you can be part of our educational mission."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "Learn More", href: "/about" },
        ]}
      />
    </div>
  );
}
