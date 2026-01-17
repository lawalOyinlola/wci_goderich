import SectionHeader from "@/components/SectionHeader";
import CtaContainer from "./CtaContainer";
import { cn } from "@/lib/utils";
import { SmoothScrollOptions } from "@/lib/utils/smoothScroll";

interface CtaButton {
  text: string;
  href: string;
  smoothScrollOptions?: SmoothScrollOptions;
}

interface CtaSectionProps {
  title: string;
  description: string;
  mainText: string;
  buttons: CtaButton[];
  className?: string;
  containerClassName?: string;
}

export default function CtaSection({
  title,
  description,
  mainText,
  buttons,
  className,
  containerClassName,
}: CtaSectionProps) {
  return (
    <div className={cn("small-container max-w-4xl text-center", className)}>
      <SectionHeader title={title} description={description} />

      <CtaContainer
        description={mainText}
        containerClassName={containerClassName}
        buttons={buttons}
      />
    </div>
  );
}
