import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12">
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
      <h1 className={cn("mb-8", titleClassName)}>{title}</h1>
      {description && (
        <p className={cn("text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
