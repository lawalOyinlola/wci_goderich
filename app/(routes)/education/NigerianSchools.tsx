"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, GlobeIcon, GraduationCapIcon, BookOpenIcon, BuildingsIcon } from "@phosphor-icons/react";
import { School } from "@/lib/types";


export default function NigerianSchools({ schools }: { schools: School[] }) {
    if (!schools || schools.length === 0) {
        return null;
    }

    const primarySchools = schools.filter(school => school.type === "primary");
    const secondarySchools = schools.filter(school => school.type === "secondary");
    const universities = schools.filter(school => school.type === "university");

    return (
        <section>
            <div className="small-container">
                <SectionHeader
                    subtitle="Nigeria"
                    title="Schools in Nigeria"
                    description="Our comprehensive educational institutions in Nigeria, from primary to university level, committed to raising a new generation of leaders who excel academically while maintaining strong Christian values and character."
                />
                {/* Primary Schools */}
                {primarySchools.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <BookOpenIcon className="h-6 w-6 text-primary" />
                            Primary Schools
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {primarySchools.map((school) => (
                                <Card
                                    key={school.id}
                                    className="shadow-sm hover:shadow-primary/20 hover:shadow-md transition-all duration-300"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            {school.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <MapPinIcon className="h-4 w-4" />
                                            {school.location}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {school.description && (
                                            <p className="text-foreground/70 mb-4">
                                                {school.description}
                                            </p>
                                        )}
                                        {(school.established || school.website) && <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground border-t pt-2">
                                            {school.established ? (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    <span>Est. {school.established}</span>
                                                </div>) : (<div />)
                                            }
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
                                        </div>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Secondary Schools */}
                {secondarySchools.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <GraduationCapIcon className="h-6 w-6 text-primary" />
                            Secondary Schools
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {secondarySchools.map((school) => (
                                <Card
                                    key={school.id}
                                    className="shadow-sm hover:shadow-primary/20 hover:shadow-md transition-all duration-300"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            {school.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <MapPinIcon className="h-4 w-4" />
                                            {school.location}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {school.description && (
                                            <p className="text-foreground/70 mb-4">
                                                {school.description}
                                            </p>
                                        )}
                                        {(school.established || school.website) && <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground border-t pt-2">
                                            {school.established ? (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    <span>Est. {school.established}</span>
                                                </div>
                                            ) : (<div />)
                                            }
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
                                        </div>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Universities */}
                {universities.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <BuildingsIcon className="h-6 w-6 text-primary" />
                            Universities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {universities.map((school) => (
                                <Card
                                    key={school.id}
                                    className="shadow-sm hover:shadow-primary/20 hover:shadow-md transition-all duration-300"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            {school.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <MapPinIcon className="h-4 w-4" />
                                            {school.location}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {school.description && (
                                            <p className="text-foreground/70 mb-4">
                                                {school.description}
                                            </p>
                                        )}
                                        {(school.established || school.website) && <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground border-t pt-2">
                                            {school.established ? (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    <span>Est. {school.established}</span>
                                                </div>
                                            ) : (<div />)
                                            }
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
                                        </div>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
