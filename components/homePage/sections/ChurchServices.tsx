import { SERVICES } from "@/lib/constants";
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

export default function ChurchServices() {
  return (
    <section className="small-container py-20">
      <SectionHeader title="Church Services" subtitle="Services" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {SERVICES.map((service) => {
          // Format schedule from day and times
          const formatSchedule = () => {
            const mainSchedule = `${service.day}: ${service.times.join(" | ")}`;
            if ("additionalSchedule" in service && service.additionalSchedule) {
              const additional = `${
                service.additionalSchedule.day
              }: ${service.additionalSchedule.times.join(" | ")}`;
              return `${mainSchedule} | ${additional}`;
            }
            return mainSchedule;
          };

          return (
            <Card
              key={service.id}
              className="group py-6 backdrop-blur-sm border-0 rounded-none hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
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
                  className="rounded-none uppercase line-clamp-2"
                >
                  {formatSchedule()}
                </Badge>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
