"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CalendarIcon,
    MapPinIcon,
    GlobeIcon,
    GraduationCapIcon,
    BuildingsIcon,
    type Icon,
} from "@phosphor-icons/react";
import { School } from "@/lib/types";

const MAX_TEXT_LENGTH = 150;

function getDisplayText(school: School): string | null {
    const text = school.summary || school.description;
    if (!text) return null;
    return text.length > MAX_TEXT_LENGTH
        ? `${text.slice(0, MAX_TEXT_LENGTH).trim()}...`
        : text;
}

function SchoolCard({ school }: { school: School }) {
    const displayText = getDisplayText(school);
    return (
        <Card className="shadow-sm hover:shadow-primary/20 hover:shadow-md transition-all duration-300 flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">{school.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {school.location}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {displayText && (
                    <p className="text-foreground/70">
                        {displayText}
                    </p>
                )}
            </CardContent>
            {(school.established || school.website) && (
                <CardFooter className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground border-t mt-auto">
                    {school.established ? (
                        <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>Est. {school.established}</span>
                        </div>
                    ) : (
                        <div />
                    )}
                    {school.website && (
                        <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="h-auto p-0"
                        >
                            <Link
                                href={school.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                            >
                                <GlobeIcon className="h-3 w-3" />
                                <span>Visit Website</span>
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}

function SchoolSection({
    title,
    icon: Icon,
    schools,
    className = "",
}: {
    title: string;
    icon: Icon;
    schools: School[];
    className?: string;
}) {
    if (schools.length === 0) return null;

    return (
        <div className={`mb-12 ${className}`}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Icon className="h-6 w-6 text-primary" />
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                ))}
            </div>
        </div>
    );
}

export default function NigerianSchools({
    schools,
}: {
    schools: School[];
}) {
    if (!schools || schools.length === 0) {
        return null;
    }

    const primarySecondary = schools.filter(
        (s) => s.type === "primary_secondary"
    );
    const universities = schools.filter((s) => s.type === "university");

    return (
        <section>
            <div className="small-container">
                <SectionHeader
                    subtitle="Nigeria"
                    title="Schools in Nigeria"
                    description="Our comprehensive educational institutions in Nigeria, from primary to university level, committed to raising a new generation of leaders who excel academically while maintaining strong Christian values and character."
                />

                <SchoolSection
                    title="Primary & Secondary Schools"
                    icon={GraduationCapIcon}
                    schools={primarySecondary}
                />
                <SchoolSection
                    title="Universities"
                    icon={BuildingsIcon}
                    schools={universities}
                    className="mb-0"
                />
            </div>
        </section>
    );
}
