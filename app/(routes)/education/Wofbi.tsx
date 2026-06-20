"use client";

import SectionHeader from "@/components/SectionHeader";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WOFBI } from "@/lib/constants";
import { ArrowUpRightIcon, CalendarIcon } from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";



export default function Wofbi() {
    return (<section id="wofbi" className="bg-muted/30">
        <div className="small-container">
            <Reveal>
                <SectionHeader
                    title={WOFBI.title}
                    subtitle={WOFBI.subtitle}
                    description={WOFBI.description}
                />
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {WOFBI.programs.map((program) => (
                    <StaggerItem key={program.id} className="flex">
                    <Card
                        className="relative hover:shadow-lg transition-shadow overflow-hidden w-full flex flex-col"
                    >
                        <div className="absolute flex-center top-0 translate-y-1/2 right-0 translate-x-1/4 w-1/2 text-background dark:text-foreground bg-foreground/80 dark:bg-background/80 px-2 py-1 rotate-35">{program.level}</div>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{program.title}</CardTitle>
                            </div>
                            <CardDescription>{program.duration}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <p className="text-foreground/70 mb-4">
                                {program.description}
                            </p>

                            <div className="mb-4">
                                <p className="font-semibold text-sm mb-2">Subjects:</p>
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
                    </StaggerItem>
                ))}
            </Stagger>
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