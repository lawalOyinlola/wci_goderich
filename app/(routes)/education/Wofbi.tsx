"use client";

import SectionHeader from "@/components/SectionHeader";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WOFBI } from "@/lib/constants";
import { ArrowUpRightIcon, CalendarIcon } from "@phosphor-icons/react";



export default function Wofbi() {
    return (<section id="wofbi" className="bg-muted/30">
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
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{program.title}</CardTitle>
                                <Badge variant="outline">{program.level}</Badge>
                            </div>
                            <CardDescription>{program.duration}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
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
                                    <CalendarIcon className="h-4 w-4 text-primary" />
                                    <span>{program.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent">💰</span>
                                    <span>{program.fee}</span>
                                </div>
                            </div>

                            <AnimatedButton
                                href="/wofbi"
                                text="Learn More"
                                variant="outline"
                                icon={<ArrowUpRightIcon />}
                                iconPosition="right"
                                size="sm"
                                className="w-full mt-auto"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-12 text-center">
                <AnimatedButton
                    href="/wofbi"
                    text="View All WOFBI Programs"
                    size="lg"
                />
            </div>
        </div>
    </section>)
}