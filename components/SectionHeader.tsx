import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  additionalText?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  additionalText,
}: SectionHeaderProps) => {
  return (
    <div className={cn("text-center mb-12 max-w-5xl mx-auto", className)}>
      {subtitle && (
        <div
          className={cn(
            "flex items-center justify-center text-sm text-muted-foreground uppercase tracking-[0.4em] mb-3 font-light gap-4",
            subtitleClassName
          )}
        >
          <Separator className="shrink sm:w-40!" />
          <p className="whitespace-nowrap">{subtitle}</p>
          <Separator className="shrink sm:w-40!" />
        </div>
      )}
      <h1 className={cn("mb-8 capitalize", titleClassName)}>{title}</h1>
      {description && (
        <p
          className={cn(
            "text-muted-foreground max-w-2xl mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {additionalText && (
        <p className="text-muted-foreground">{additionalText}</p>
      )}
    </div>
  );
};

export default SectionHeader;
