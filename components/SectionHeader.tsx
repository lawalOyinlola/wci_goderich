import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  additionalText?: string;
  /** Heading level for the title. Defaults to "h2" — use "h1" only for page heroes. */
  as?: HeadingLevel;
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
  as: Heading = "h2",
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

      {typeof title === "string" ? (
        <Heading className={cn("mb-8 capitalize heading-1", titleClassName)}>
          {title}
        </Heading>
      ) : (
        title
      )}

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
