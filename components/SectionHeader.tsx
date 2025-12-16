import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  others?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  others,
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12 max-w-5xl mx-auto">
      {subtitle && (
        <div
          className={cn(
            "flex items-center justify-center text-sm text-muted-foreground uppercase tracking-[0.4em] mb-3 font-light gap-4",
            subtitleClassName
          )}
        >
          <Separator className="sm:w-40!" />
          <p>{subtitle}</p>
          <Separator className="sm:w-40!" />
        </div>
      )}
      <h1 className={cn("mb-8 capitalize", titleClassName)}>{title}</h1>
      {description && (
        <p className={cn("text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      )}
      {others && <p className="text-muted-foreground">{others}</p>}
    </div>
  );
};

export default SectionHeader;
