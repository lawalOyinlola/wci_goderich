"use client";

import Link from "next/link"
import { Highlighter } from "@/components/ui/highlighter";
import { CalendarIcon, MapPinIcon, GlobeIcon, GraduationCapIcon, } from "@phosphor-icons/react";
import { School } from "@/lib/types"

export default function SierraSchools({ schools }: { schools: School[] }) {
    if (!schools || schools.length === 0) {
        return null;
    }

    return (
        <div id="sierra-schools" className="small-container py-0">
            <div className="grid gap-12 md:grid-cols-4">
                <div className="md:col-span-2">
                    <h2 className="text-foreground text-balance text-4xl font-semibold">Enroll your child in one of our schools in
                        <Highlighter
                            action="underline"
                            iterations={4}
                            color="var(--accent)"
                            className="ml-2"
                            isView
                        >
                            Sierra Leone.
                        </Highlighter>
                    </h2>
                    <p className="text-muted-foreground mt-2 text-balance">
                        We are committed to providing quality Christian education that nurtures academic excellence, character development, and spiritual growth. Our schools in Sierra Leone offer a comprehensive educational experience from primary through secondary levels.
                    </p>
                    <ul className="text-muted-foreground mt-4 space-y-2 text-md">
                        <li><span className="font-bold">Biblical Foundation:</span> All our programs are rooted in Christian values and principles.</li>
                        <li><span className="font-bold">Academic Excellence:</span> We maintain high standards of education to prepare students for future success.</li>
                        <li><span className="font-bold">Holistic Development:</span> We focus on nurturing the mind, body, and spirit of every student.</li>
                    </ul>

                </div>

                <div className="space-y-6 md:col-span-2 md:space-y-12">
                    {schools.map(school => (
                        <div key={school.id} className="flex flex-col gap-2">
                            <div className="flex items-center  gap-2">
                                <GraduationCapIcon size={24} />
                                <h3 className="text-foreground text-lg font-semibold">{school.name}</h3>
                            </div>
                            <p className="text-muted-foreground mt-2 text-balance">{school.description}</p>
                            <div className="flex flex-col flex-wrap gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon size={16} />
                                    <span>{school.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon size={16} />
                                    <span>Est. {school.established}</span>
                                </div>
                                {school.website &&
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon size={16} />
                                        <Link href={school.website} target="_blank">
                                            <span>Visit Website</span>
                                        </Link>
                                    </div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}