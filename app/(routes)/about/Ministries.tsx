import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { MINISTRIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export default function Ministries() {
  const { title, subtitle, description, ministries } = MINISTRIES;

  const filteredMinistries = ministries.filter(
    (ministry) => ministry.title !== "Pastors"
  );

  return (
    <section>
      <div className="small-container space-y-8 md:space-y-12">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <img
          className="rounded-(--radius) grayscale"
          src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="team image"
          height=""
          width=""
          loading="lazy"
        />

        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {filteredMinistries.map((ministry, index) => (
            <div key={ministry?.id} className="space-y-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Zap className="size-4" />
                <h3 className="text-sm font-medium">{ministry.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {ministry.description}
              </p>
              <Badge variant="primary">
                {ministry?.ageRange ?? "All Ages"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
