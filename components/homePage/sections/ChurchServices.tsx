import { formatServiceSchedule } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { IconComponent } from "@/components/IconComponent";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";

export default function ChurchServices() {
  return (
    <section className="small-container">
      <SectionHeader
        title="Church Services"
        subtitle="Services"
        description="Join us for worship, prayer, and fellowship throughout the week."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {SERVICES.map((service) => {
          return (
            <Card
              key={service.id}
              className="group py-6 backdrop-blur-sm border-0 hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
            >
              <BorderBeam
                size={200}
                colorFrom="var(--accent)"
                className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
              />
              <CardHeader className="flex flex-col gap-6 items-center justify-center">
                <div className="mb-2 text-accent">
                  <IconComponent iconName={service.icon} size={48} />
                </div>
                <CardTitle className="text-xl tracking-tight font-bold line-clamp-1">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 justify-center pb-2">
                <CardDescription className="text-center text-muted-foreground line-clamp-3">
                  {service.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="justify-center">
                <Badge
                  variant="primary"
                  size="xl"
                  className="uppercase line-clamp-2"
                >
                  {formatServiceSchedule(service)}
                </Badge>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
