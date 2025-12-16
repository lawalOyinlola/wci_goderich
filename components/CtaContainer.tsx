import { AnimatedButton } from "./ui/animated-button";
import { cn } from "@/lib/utils";

interface GradientCtaSectionProps {
  title?: string;
  description?: string;
  buttons?: {
    text: string;
    href: string;
  }[];
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function CtaContainer({
  title,
  description,
  buttons,
  children,
  className,
  containerClassName,
}: GradientCtaSectionProps) {
  return (
    <div className={cn("text-center", className)}>
      <div
        className={cn(
          "text-primary-foreground bg-gradient-to-br from-[#f59e0b] via-primary to-accent rounded-xl p-8 mx-auto max-w-2xl relative overflow-hidden",
          containerClassName
        )}
      >
        {title && <h3 className="mb-4">{title}</h3>}
        {description && <p className="mb-6">{description}</p>}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {buttons &&
            buttons.map((button, index) => (
              <AnimatedButton
                key={button.href + index}
                size="lg"
                variant={`${index !== 0 ? "secondary" : "outline"}`}
                className={`${index !== 0 ? "bg-background!" : ""} `}
                href={button.href}
                text={button.text}
              />
            ))}
          {children}
        </div>
      </div>
    </div>
  );
}
